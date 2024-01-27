import '../stimulus_base'

import MiniProgramController from './mini-program'
application.register('mini-program', MiniProgramController)

import ScanController from './scan'
application.register('scan', ScanController)

import WechatController from './wechat'
application.register('wechat', WechatController)

import WxShareController from './wx-share'
application.register('wx-share', WxShareController)

import WxpayController from './wxpay'
application.register('wxpay', WxpayController)
