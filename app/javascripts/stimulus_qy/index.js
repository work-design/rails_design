import { application } from '../stimulus_base'

import ShareMomentController from './share-moment'
application.register('share-moment', ShareMomentController)

import OpenDataController from './open-data'
application.register('open-data', OpenDataController)
