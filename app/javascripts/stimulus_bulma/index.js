import { application } from '../stimulus_base'

import MenuController from './menu'
application.register('menu', MenuController)

import NavbarController from './navbar'
application.register('navbar', NavbarController)
