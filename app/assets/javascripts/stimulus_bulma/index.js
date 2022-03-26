import { application } from '../rails_design/stimulus'

import MenuController from './menu'
application.register('menu', MenuController)

import NavbarController from './navbar'
application.register('navbar', NavbarController)
