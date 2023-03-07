import { Application } from '@hotwired/stimulus'
import './request'

export const application = Application.start()
window.application = application

HTMLElement.prototype.controller = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
