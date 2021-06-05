const baseConfig = require('./base')
const devServer = config.server

const { outputPath: contentBase, publicPath } = require('../config')

const devConfig =  {
  mode: 'development',
  server: {
    clientLogLevel: 'none',
    compress: devServer.compress,
    quiet: devServer.quiet,
    disableHostCheck: devServer.disable_host_check,
    host: devServer.host,
    port: devServer.port,
    https: devServer.https,
    hot: devServer.hmr,
    contentBase,
    inline: devServer.inline,
    injectClient: devServer.inject_client,
    useLocalIp: devServer.use_local_ip,
    public: devServer.public,
    publicPath,
    historyApiFallback: { disableDotRule: true },
    headers: devServer.headers,
    overlay: devServer.overlay,
    stats: {
      entrypoints: false,
      errorDetails: true,
      modules: false,
      moduleTrace: false
    },
    watchOptions: devServer.watch_options
  }
}

module.exports = {
  baseConfig,
  ...devConfig
}
