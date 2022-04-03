import { application } from '../rails_design/stimulus'

import OpenDataController from './open-data'
application.register('open-data', OpenDataController)

import ShareMomentController from './share-moment'
application.register('share-moment', ShareMomentController)
