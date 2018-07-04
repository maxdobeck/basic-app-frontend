'use strict'
require('dotenv').config()
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  TEST_API: '"https://shielded-stream-75107.herokuapp.com/"',
  MY_TEST: '"My big test case"'
})
