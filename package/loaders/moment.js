module.exports = {
  test: require.resolve('moment'),
  loader: 'expose-loader',
  options: {
    exposes: 'moment'
  }
}
