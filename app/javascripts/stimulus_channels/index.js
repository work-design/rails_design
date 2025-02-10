import LogChannel from './log_channel'
application.register('log-channel', LogChannel)

import NoticeChannel from './notice_channel'
application.register('notice-channel', NoticeChannel)

import SessionChannel from './session_channel'
application.register('session-channel', SessionChannel)

import DoneChannel from './done_channel'
application.register('done', DoneChannel)