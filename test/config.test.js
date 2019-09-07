'use strict'

const assert = require('assert').strict
const config = require('../')
const packageJson = require('../package.json')

/* eslint-env mocha */

describe('mkgs-parcel', () => {
  let packageJsonDependencyNames
  let configPackageReferences

  before(() => {
    packageJsonDependencyNames = new Set(
      Object.keys(packageJson.dependencies || {})
    )
    configPackageReferences = collectConfigPackageReferences(config, new Set())
  })

  describe('package.json', () => {
    it('includes every package referenced in the config', () => {
      let missingReferences = []
      for (let reference of configPackageReferences) {
        if (!packageJsonDependencyNames.has(reference)) {
          missingReferences.push(reference)
        }
      }

      // Assert with deepEqual rather than e.g. missingReferences.size as the
      // assertion message with deepEqual enumerates the differences nicely
      assert.deepEqual(missingReferences, [])
    })

    it('does not include packages not referenced in the config', () => {
      let unnecessaryDependencies = []
      for (let dependency of packageJsonDependencyNames) {
        if (!configPackageReferences.has(dependency)) {
          unnecessaryDependencies.push(dependency)
        }
      }

      assert.deepEqual(unnecessaryDependencies, [])
    })
  })
})

function collectConfigPackageReferences (
  configSection,
  references
) {
  if (configSection == null || typeof configSection !== 'object') {
    throw new TypeError('Expected config section to be an object or an array')
  }

  for (let value of Object.values(configSection)) {
    if (typeof value === 'string') {
      references.add(value)
    } else if (configSection != null && typeof configSection === 'object') {
      collectConfigPackageReferences(value, references)
    } else {
      throw new Error(
        'Parcel configs must contain only strings, arrays, or objects in value positions'
      )
    }
  }

  return references
}
