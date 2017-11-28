import './styles/index'

import './scripts/countdown'
import * as api from './scripts/api'

const form2Json = form =>
  Array.from(form.querySelectorAll('[name]')).reduce((acc, {name, value}) => {
    acc[name] = value
    return acc
  }, {})

const validate = form => {
  const inputs = document.querySelector('#frmWhitelist').querySelectorAll('[name]')
  const invalidFields = Array.from(inputs).filter(x => !x.value)
  invalidFields.forEach(x => {
    x.classList += ' error'
  })
  return invalidFields.length > 0
}

window.onload = () => {
  document.querySelector('body').classList.add('loaded')

  document.querySelector('#btnWhitelist').addEventListener('click', e => {
    e.preventDefault()
    const form = document.querySelector('#frmWhitelist')

    const isValid = validate(form)

    if (!isValid) {
      const json = form2Json(form)
      api
      .order(json)
      .then(() => window.OHTracking.lead(json))
      .then(() => location.replace('thankyou.html'))
      .catch(error => console.error(error))
    }
  })

  document.querySelector('#btnSubscribe').addEventListener('click', e => {
    e.preventDefault()
    api
      .subscribe(form2Json(document.querySelector('#frmSubscribe')))
      .then(resp => console.log(resp))
      .catch(error => console.error(error))
  })
}
