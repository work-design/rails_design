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

// el.dataset.add_controller('xx')
DOMStringMap.prototype.add_controller = function(controller_name) {
  if (typeof this.controller === 'string' && this.controller.length > 0) {
    this.controller = this.controller.concat(' ').concat(controller_name)
  } else {
    this.controller = controller_name
  }
}

// el.dataset.add_target('xx')
DOMStringMap.prototype.add_target = function(target_name) {
  if (typeof this.target === 'string') {
    let targets = this.target.split(' ')
    if (!targets.includes(target_name)) {
      targets.push(target_name)
    }
    this.target = targets.join(' ')
  } else {
    this.target = target_name
  }
}

// el.dataset.remove_target('xx')
DOMStringMap.prototype.remove_target = function(target_name) {
  if (typeof this.target === 'string') {
    let targets = this.target.split(' ')
    let index = targets.indexOf(target_name)
    if (index > -1) {
      targets.splice(index, 1)
    }
    this.target = targets.join(' ')
  }
}
