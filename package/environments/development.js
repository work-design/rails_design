const baseConfig = require('./base')
const devServer = config.server

const devConfig =  {
  mode: 'development',
  server: {
    ...devServer
  }
}

module.exports = {
  baseConfig,
  ...devConfig
}
