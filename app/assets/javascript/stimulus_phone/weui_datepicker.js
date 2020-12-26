import { Controller } from 'stimulus'

class WeuiDatePickerController extends Controller {

  connect() {
    console.debug('Weui Datepicker Controller works!')
  }

  // focus->weui#getFocus
  getFocus() {
    document.activeElement.blur()
  }

  // click->weui#select
  select(e) {
    let d = new Date()
    let da = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    weui.datePicker({
      start: da.join('-'),
      end: '2020-02-31',
      cron: '* * *',
      defaultValue: da,
      onChange: function onChange(result) {
        console.log(da)
        console.log(result)
        console.log(e.currentTarget)
        console.log(e.target)
      },
      onConfirm: function onConfirm(result) {
        e.target.value = result.join('-')
      },
      id: 'datePicker',
      title: '日期选择器'
    })
  }

}

application.register('weui_date_picker', WechatController)
