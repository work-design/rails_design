import { application } from '../stimulus_base'

import ScanController from './scan'
application.register('scan', ScanController)

import SearchController from './search'
application.register('search', SearchController)

import WechatController from './wechat'
application.register('wechat', WechatController)

// dependent on Weui
import WeuiActionsheetController from './weui-actionsheet'
application.register('weui-actionsheet', WeuiActionsheetController)

import WeuiDatepickerController from './weui-datepicker'
application.register('weui-datepicker', WeuiDatepickerController)

import WeuiDialogController from './weui-dialog'
application.register('weui-dialog', WeuiDialogController)

import WeuiPickerController from './weui-picker'
application.register('weui-picker', WeuiPickerController)

import MaskController from './mask'
application.register('mask', MaskController)

// dependent on weixin.js
import MiniProgramController from './mini-program'
application.register('mini-program', MiniProgramController)

import WxShareController from './wx-share'
application.register('wx-share', WxShareController)

import WxpayController from './wxpay'
application.register('wxpay', WxpayController)
