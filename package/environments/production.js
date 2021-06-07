/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const baseConfig = require('./base')
const getEntryObject = require('../paths')

const getPlugins = () => {
  const plugins = []

  plugins.push()

  return plugins
}

const paths = () => {
  const result = {}

  baseConfig.engine_paths.forEach((rootPath) => {
    Object.assign(result, getEntryObject(rootPath))
  })

  return result
}

const productionConfig = {
  build: {
    rollupOptions: {
      input: paths()
    }
  }
}

module.exports = Object.assign(baseConfig, productionConfig)
