// 当 target 为 body 的时候，则不用 getElementById 的逻辑，而是直接使用body
Object.defineProperties(customElements.get('turbo-stream').prototype, {
  targetElementsById: {
    get: function() {
      let element
      if (this.target === 'body') {
        element = this.ownerDocument.body
      } else if (this.target) {
        element = this.ownerDocument.getElementById(this.target)
      }

      if (element !== null) {
        return [ element ]
      } else {
        return []
      }
    }
  }
})
