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
    })
  )
}

const convert = (amount, asset) => {
  api.convert({from: 'LKK2Y', amount: amount, to: asset}).then(res => {
    document.querySelector('#totalAmount').textContent = `${res.amount} ${
      res.asset
    }`
  })
}

window.onload = () => {
  document.querySelector('body').classList.add('loaded')

  const frmWhitelist = document.querySelector('#frmWhitelist')
  frmWhitelist && attachValidateHandler(frmWhitelist)
  const frmSubscribe = document.querySelector('#frmSubscribe')
  frmSubscribe && attachValidateHandler(frmSubscribe)

  if (frmWhitelist) {
    document.querySelector('#amount').addEventListener('change', e => {
      const amount = Number(e.currentTarget.value) || 0
      const asset = document.querySelector('#currency').value
      convert(amount, asset)
    })

    document.querySelector('#currency').addEventListener('change', e => {
      const amount = document.querySelector('#amount').value
      const asset = e.currentTarget.value
      convert(amount, asset)
    })

    document.querySelector('#btnWhitelist').addEventListener('click', e => {
      e.preventDefault()

      if (validate(frmWhitelist)) {
        const json = form2Json(frmWhitelist)
        api
          .order(json)
          .then(() =>
            location.replace(
              `thankyou.html?${location.search}&a=${btoa(JSON.stringify(json))}`
            )
          )
          .catch(error => console.error(error))
      }
    })
  }

  if (frmSubscribe) {
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
}
