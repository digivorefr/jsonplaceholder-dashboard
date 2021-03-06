/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

process.env.NODE_ENV = 'test'

const path = require('path')
const jest = require('jest')

const watch = (process.argv.includes('-w'))
  ? '--watchAll'
  : ''

// We want to run Jest in watch mode and see the code coverage for faster testing.
jest.run(['--coverage', watch, '--passWithNoTests', `--config=${path.resolve(__dirname, '../jest.config.js')}`])
