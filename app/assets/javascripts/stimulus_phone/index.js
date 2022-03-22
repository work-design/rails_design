import { application } from '../rails_design/stimulus'
// dependent on Weui
import QqMapController from './qq-map'
application.register('qq-map', QqMapController)

import SearchController from './search'
application.register('search', SearchController)

import WechatController from './wechat'
application.register('wechat', WechatController)

import WeuiActionsheetController from './weui-actionsheet'
application.register('weui-actionsheet', WeuiActionsheetController)

import WeuiDatepickerController from './weui-datepicker'
application.register('weui-datepicker', WeuiDatepickerController)

import WeuiDialogController from './weui-dialog'
application.register('weui-dialog', WeuiDialogController)

import WeuiPickerController from './weui-picker'
application.register('weui-picker', WeuiPickerController)

// dependent on weixin.js
import MiniProgramController from './mini-program'
application.register('mini-program', MiniProgramController)

import WxTimelineController from './wx-timeline'
application.register('wx-timeline', WxTimelineController)

import WxpayController from './wxpay'
application.register('wxpay', WxpayController)
