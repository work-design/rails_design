import './wxwork_script'
import { application } from '../rails_design/stimulus'

import ShareMomentController from './share-moment'
application.register('share-moment', ShareMomentController)
