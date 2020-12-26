module.exports = {
  test: require.resolve('@hotwired/turbo'),
  loader: 'expose-loader',
  options: {
    exposes: 'Turbo'
  }
}
