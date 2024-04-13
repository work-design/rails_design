import { Application } from '@hotwired/stimulus'

window.application = Application.start()

HTMLElement.prototype.getController = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
