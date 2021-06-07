export const StreamActions = {

  after() {
    if (this.targetElement) {
      this.targetElement.insertAdjacentHTML('afterend', this.templateContent)
    }
  },

  before() {
    if (this.targetElement) {
      this.targetElement.insertAdjacentHTML('beforebegin', this.templateContent)
    }
  }

}
