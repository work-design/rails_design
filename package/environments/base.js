/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const { basename, dirname, join, relative, resolve } = require('path')
const { sync: globSync } = require('glob')
const extname = require('path-complete-extname')
const config = require('../config')
const rootPath = join(config.root_path)

const getEntryObject = (rootPath) => {
  const entries = {}

  globSync(`${rootPath}/**/*.*`).forEach((path) => {
    const namespace = relative(join(rootPath), dirname(path))
    const name = join(namespace, basename(path, extname(path)))
    let assetPaths = resolve(path)

    let previousPaths = entries[name]
    if (previousPaths) {
      previousPaths = Array.isArray(previousPaths)
        ? previousPaths
        : [previousPaths]
      previousPaths.push(assetPaths)
      assetPaths = previousPaths
    }

    entries[name] = assetPaths
  })

  return entries
}

const getModulePaths = () => {
  const result = [resolve(config.source_path)]

  if (config.additional_paths) {
    config.additional_paths.forEach((path) => result.push(resolve(path)))
  }
  result.push('node_modules')

  return result
}

module.exports = {
  root: join(process.cwd(), config.root_path),
  engine_paths: config.engine_paths,
  resolve: {
    alias: config.alias
  },
  css: {
    postcss: join(process.cwd(), 'postcss.config.js')
  },
  build: {
    rollupOptions: {
      input: getEntryObject()
    }
  }
}
