#!/usr/bin/env node

var client = require('./')
var HOST_A = process.env.DEBUG ? '127.0.0.1' : 'p2p-test-1.mafintosh.com'
var HOST_B = process.env.DEBUG ? '127.0.0.1' : 'p2p-test-2.mafintosh.com'

client([HOST_A, HOST_B], process.argv[2] || '', function (report) {
  console.log('Network tested. Thank you for participating.')
  console.log(report)
})
