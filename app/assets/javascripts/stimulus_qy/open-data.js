import ConfigController from './config'

export default class extends ConfigController {
  static targets = ['open']

  connect() {
    super.connect()

    alert(WWOpenData)
    if (WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success() {
          alert('有登录态')
        },
        fail() {
          alert('登录态过期')
        }
      })
    }
    WWOpenData.bind(document.querySelector('ww-open-data'))
  }

}
