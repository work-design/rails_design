import { application } from '../rails_design/stimulus'

import CheckboxController from './checkbox'
import CommonController from './common'
import CountDownController from './count_down'
import FormerController from './former'
import HoverController from './hover'
import InputController from './input'
import MenuController from './menu'
import NavbarController from './navbar'
import NoticeController from './notice'
import PictureController from './picture'
import ShowController from './show'
import ShowcaseController from './showcase'  // 点击小图，显示大图
import SlideController from './slide'
import SlideYController from './slide_y'
import SwipeController from './swipe'
import TaxonController from './taxon'
import TimeController from './time'  // 时间格式根据浏览器时区等进行转化
import TreeController from  './tree'
import TreeRemoteController from './tree_remote'
import TyperController from './typer'
import VisitController from './visit'

import SortableController from './sortable' // dependent on sortable
import ChoiceController from './choice' // Dependent on Choices.js

// Dependent on Bulma CSS
import ModalController from './modal'
import ModalShowController from './modal_show'

application.register('check', CheckboxController)
application.register('choice', ChoiceController)
application.register('common', CommonController)
application.register('count-down', CountDownController)
application.register('former', FormerController)
application.register('hover', HoverController)
application.register('input', InputController)
application.register('menu', MenuController)
application.register('modal', ModalController)
application.register('modal-show', ModalShowController)
application.register('navbar', NavbarController)
application.register('notice', NoticeController)
application.register('picture', PictureController)
application.register('show', ShowController)
application.register('showcase', ShowcaseController)
application.register('slide', SlideController)
application.register('slide-y', SlideYController)
application.register('sortable', SortableController)
application.register('swipe', SwipeController)
application.register('taxon', TaxonController)
application.register('time', TimeController)
application.register('tree', TreeController)
application.register('tree-remote', TreeRemoteController)
application.register('typer', TyperController)
application.register('visit', VisitController)
