import { Application, Controller } from 'stimulus'

window.application = Application.start()

Controller.prototype.submit = function(form) {
  let evt = document.createEvent('Event')
  evt.initEvent('submit', true, true)
  form.dispatchEvent(evt)
}

Controller.prototype.csrfToken = function() {
  let meta = document.querySelector('meta[name=csrf-token]')
  return meta && meta.content
}

// el.dataset.add('controller', 'xx')
// el.dataset.add('', 'xx')
DOMStringMap.prototype.add = function(name, value) {
  if (typeof this[name] === 'string') {
    let values = this[name].split(' ')
    if (!values.includes(value)) {
      values.push(value)
    }
    this[name] = values.join(' ')
  } else {
    this[name] = value
  }
}

// el.dataset.remove('controller', 'xx')
DOMStringMap.prototype.remove = function(name, value) {
  if (typeof this[name] === 'string') {
    let values = this[name].split(' ')
    let index = values.indexOf(value)
    if (index > -1) {
      values.splice(index, 1)
    }
    this[name] = values.join(' ')
  }
}
