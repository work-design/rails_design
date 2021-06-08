/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const baseConfig = require('./base')
const config = require('../config')
const getEntryObject = require('../paths')
const { join } = require('path')

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
    manifest: true,
    sourcemap: true,
    outDir: join(process.cwd(), config.public_root_path, config.public_output_path),
    rollupOptions: {
      input: {
        ...baseConfig.build.rollupOptions.input,
        ...paths()
      }
    }
  }
}

module.exports = Object.assign(baseConfig, productionConfig)
