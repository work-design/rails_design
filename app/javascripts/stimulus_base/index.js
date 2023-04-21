import { Application } from '@hotwired/stimulus'
import './request'

window.application = Application.start()

HTMLElement.prototype.controller = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
