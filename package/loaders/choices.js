module.exports = {
  test: require.resolve('choices.js'),
  loader: 'expose-loader',
  options: {
    exposes: 'Choices'
  }
}
