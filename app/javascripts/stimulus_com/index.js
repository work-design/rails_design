import { application } from '../rails_design/stimulus'

import AlertController from './alert'
application.register('alert', AlertController)

import CheckController from './check'
application.register('check', CheckController)

import CommonController from './common'
application.register('common', CommonController)

import CountDownController from './count_down'
application.register('count-down', CountDownController)

import CountUpController from './count_up'
application.register('count-up', CountUpController)

import CustomController from './custom'
application.register('custom', CustomController)

import HoverController from './hover'
application.register('hover', HoverController)

import NoticeController from './notice'
application.register('notice', NoticeController)

import PageController from './page'
application.register('page', PageController)

import PictureController from './picture'
application.register('picture', PictureController)

import ShowController from './show'
application.register('show', ShowController)

// 点击小图，显示大图
import ShowcaseController from './showcase'
application.register('showcase', ShowcaseController)

import SlideController from './slide'
application.register('slide', SlideController)

import SlideYController from './slide_y'
application.register('slide-y', SlideYController)

import SwipeController from './swipe'
application.register('swipe', SwipeController)

// 时间格式根据浏览器时区等进行转化
import TimeController from './time'
application.register('time', TimeController)

import TimeCountController from './time_count'
application.register('time-count', TimeCountController)

import TreeController from  './tree'
application.register('tree', TreeController)

import TreeRemoteController from './tree_remote'
application.register('tree-remote', TreeRemoteController)

import VisitController from './visit'
application.register('visit', VisitController)

// dependent on sortable
import SortableController from './sortable'
application.register('sortable', SortableController)

import SortController from './sortable'
application.register('sort', SortController)

// Dependent on Choices.js
import ChoiceController from './choice'
application.register('choice', ChoiceController)

// Dependent on Bulma CSS
import ModalController from './modal'
application.register('modal', ModalController)

import ModalShowController from './modal_show'
application.register('modal-show', ModalShowController)