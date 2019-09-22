'use strict'

const buildDictionary = require('./build-dictionary')

const pascalCase = (str) => {
  return str.match(/[a-z]+/gi)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    })
    .join('')
}

module.exports = {
  loadController: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/controllers',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, controllers) => {
      if (err) throw err

      for (let controllerId in controllers) {
        global[pascalCase(controllers[controllerId].globalId + ' controllers')] = controllers[controllerId]
      }

      cb(null, 'controller-loaded')
    })
  },
  loadHelpers: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/helper',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, services) => {
      if (err) throw err

      for (let helperId in services) {
        global[pascalCase(services[helperId].globalId + ' helper')] = services[helperId]
      }

      cb(null, 'helper-loaded')
    })
  },
  loadLibraries: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/libs',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, services) => {
      if (err) throw err

      for (let librariesId in services) {
        global[pascalCase(services[librariesId].globalId + ' Libs')] = services[librariesId]
      }

      cb(null, 'libraries-loaded')
    })
  },
  loadSchema: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/schema',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, services) => {
      if (err) throw err

      for (let schemeId in services) {
        global[pascalCase(services[schemeId].globalId + ' Scheme')] = services[schemeId]
      }

      cb(null, 'libraries-loaded')
    })
  },
  loadCustom: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir,
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, (err, services) => {
      if (err) throw err

      for (let moduleId in services) {
        global[pascalCase(services[moduleId].globalId)] = services[moduleId]
      }

      cb(null, 'libraries-loaded')
    })
  },
  loadModels: (rootDir, cb) => {
    buildDictionary.optional({
      dirname: rootDir + '/app/models',
      filter: /^([^.]+)\.(js)$/,
      replaceExpr: /^.*\//,
      flatten: true
    }, cb)
  }
}
