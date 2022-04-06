import { application } from '../rails_design/stimulus'

import FormerController from './former'
application.register('former', FormerController)

import InputController from './input'
application.register('input', InputController)

import TaxonController from './taxon'
application.register('taxon', TaxonController)

import TyperController from './typer'
application.register('typer', TyperController)

import FieldController from './field'
application.register('field', FieldController)

import DatetimeController from './datetime'
application.register('datetime', DatetimeController)

import DefaultValidController from './default_valid'
application.register('default_valid', DefaultValidController)

import WeuiFormController from './valid_weui'
application.register('weui_form', WeuiFormController)