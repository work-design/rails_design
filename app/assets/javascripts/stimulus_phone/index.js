import { application } from 'rails_ui/stimulus'
// dependent on Weui
import QqMapController from './qq_map'
import SearchController from './search'
import WechatController from './wechat'
import WeuiActionsheetController from './weui-actionsheet'
import WeuiDatepickerController from './weui-datepicker'
import WeuiDialogController from './weui-dialog'
import WeuiPickerController from './weui-picker'
import WxpayController from './wxpay'

application.register('qq-map', QqMapController)
application.register('search', SearchController)
application.register('wechat', WechatController)
application.register('weui-actionsheet', WeuiActionsheetController)
application.register('weui-dialog', WeuiDialogController)
application.register('weui-datepicker', WeuiDatepickerController)
application.register('weui-picker', WeuiPickerController)
application.register('wxpay', WxpayController)
