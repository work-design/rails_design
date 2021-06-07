/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const baseConfig = require('./base')

const getPlugins = () => {
  const plugins = []

  plugins.push()

  return plugins
}

const productionConfig = {
  devtool: 'source-map',
  stats: 'normal',
  bail: true
}

module.exports = Object.assign(baseConfig, productionConfig)
