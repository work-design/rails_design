/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./base')

const getPlugins = () => {
  const plugins = []

  plugins.push(
    new CompressionPlugin({
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|json|ico|svg|eot|otf|ttf|map)$/
    })
  )

  if ('brotli' in process.versions) {
    plugins.push(
      new CompressionPlugin({
        filename: '[path][base].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|json|ico|svg|eot|otf|ttf|map)$/
      })
    )
  }

  return plugins
}

const productionConfig = {
  devtool: 'source-map',
  stats: 'normal',
  bail: true
}

module.exports = Object.assign(baseConfig, productionConfig)
