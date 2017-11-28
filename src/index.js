import './styles/index'

import './scripts/countdown'
import * as api from './scripts/api'

const form2Json = form =>
  Array.from(form.querySelectorAll('[name]')).reduce((acc, {name, value}) => {
    acc[name] = value
    return acc
  }, {})

const validate = form => {
  const inputs = form.querySelectorAll('[name]')
  const invalidFields = Array.from(inputs).filter(x => !x.value)
  invalidFields.forEach(x => {
    x.classList.add('error')
  })
  return invalidFields.length === 0
}

const attachValidateHandler = form => {
  form.querySelectorAll('[name]').forEach(x =>
    x.addEventListener('change', e => {
      if (e.currentTarget.value) {
        x.classList.remove('error')
      }
    }))
}

window.onload = () => {
  document.querySelector('body').classList.add('loaded')

  const frmWhitelist = document.querySelector('#frmWhitelist')
  attachValidateHandler(frmWhitelist)
  const frmSubscribe = document.querySelector('#frmSubscribe')
  attachValidateHandler(frmSubscribe)

  document.querySelector('#btnWhitelist').addEventListener('click', e => {
    e.preventDefault()

    if (validate(frmWhitelist)) {
      const json = form2Json(frmWhitelist)
      api
        .order(json)
        .then(() => window.OHTracking.lead(json))
        .then(() => location.replace('thankyou.html'))
        .catch(error => console.error(error))
    }
  })

  document.querySelector('#btnSubscribe').addEventListener('click', e => {
    e.preventDefault()
    if (validate(frmSubscribe)) {
      api
      .subscribe(form2Json(frmSubscribe))
      .then(resp => console.log(resp))
      .catch(error => console.error(error))
    }
  })
}
