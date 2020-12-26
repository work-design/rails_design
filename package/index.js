const { basename, dirname, join, relative, resolve } = require('path')
const { sync: globSync } = require('glob')
const extname = require('path-complete-extname')
const { config } = require('@rails/webpacker')

const paths = () => {
  let result = {}

  config.additional_paths.forEach((rootPath) => {
    globSync(`${rootPath}/**/*.*`, { ignore: config.ignore }).forEach((path) => {
      const namespace = relative(join(rootPath), dirname(path))
      const name = join(namespace, basename(path, extname(path)))
      result[name] = resolve(path)
    })
  })

  return result
}

module.exports = paths
