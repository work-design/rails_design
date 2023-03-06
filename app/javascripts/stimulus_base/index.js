import { Application } from '@hotwired/stimulus'

export const application = Application.start()
window.application = application

HTMLElement.prototype.controller = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
