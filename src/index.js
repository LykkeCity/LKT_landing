import './styles/index'

import './scripts/countdown'
import * as api from './scripts/api'

const form2Json = form =>
  Array.from(form.querySelectorAll('[name]')).reduce((acc, {name, value}) => {
    acc[name] = value
    return acc
  }, {})

window.onload = () => {
  document.querySelector('body').classList.add('loaded')

  document.querySelector('#btnWhitelist').addEventListener('click', e => {
    e.preventDefault()
    const json = form2Json(document.querySelector('#frmWhitelist'))
    api
      .order(json)
      .then(() => window.OHTracking.lead(json))
      .then(() => location.replace('thankyou.html'))
      .catch(error => console.error(error))
  })

  document.querySelector('#btnSubscribe').addEventListener('click', e => {
    e.preventDefault()
    api
      .subscribe(form2Json(document.querySelector('#frmSubscribe')))
      .then(resp => console.log(resp))
      .catch(error => console.error(error))
  })
}
