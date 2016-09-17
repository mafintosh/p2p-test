var dgram = require('dgram')
var crypto = require('crypto')

module.exports = send

function time () { // prefix tokens with time, so they sort better on the server. just a debug hack
  var buf = new Buffer(4)
  buf.writeUInt32BE(Math.floor(Date.now() / 1000), 0)
  return buf
}

function send (hosts, msg, cb) {
  var socket = dgram.createSocket('udp4')
  var token = Buffer.concat([time(), crypto.randomBytes(28)])

  socket.on('error', noop)

  var a = Buffer.concat([token, new Buffer([0]), new Buffer(msg, 'utf-8')])
  var b = Buffer.concat([token, new Buffer([1]), new Buffer(msg, 'utf-8')])

  function run () {
    socket.send(a, 0, a.length, 10000, hosts[0])
    socket.send(b, 0, b.length, 10000, hosts[1])
  }

  socket.bind(0, function () {
    run()
    var interval = setInterval(run, 1000)
    socket.once('message', function (m) {
      clearInterval(interval)
      socket.close()
      if (cb) cb(JSON.parse(m.toString()))
    })
  })
}

function noop () {}
