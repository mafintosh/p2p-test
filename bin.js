#!/usr/bin/env node

const DHT = require('@hyperswarm/dht')

const serverPublicKey = Buffer.from('45792d69fcdb3c5bca14b0c23edf473fb491847c5d2579322de697a14d4338db', 'hex')
const description = process.argv.slice(2).join(' ')
const node = new DHT()

sample()

async function sample () {
  console.log('Sampling network using a Hyperswarm DHT query...')

  const result = []
  for await (const data of node.findNode(Buffer.alloc(32))) {
    result.push({
      from: { host: data.from.host, port: data.from.port },
      to: { host: data.to.host, port: data.to.port }
    })
  }

  console.log('Sampling done! Got ' + result.length + ' samples, last 5:')
  console.log(result.slice(-5))

  console.log('Connecting to ' + serverPublicKey.toString('hex') + ' to add to index')
  console.log('Adding the following description: ' + (description || '(empty)'))

  const socket = node.connect(serverPublicKey)

  socket.write(JSON.stringify({ time: new Date(), description, samples: result }))
  socket.end()

  socket.on('close', function () {
    console.log('Data received and stored')
    node.destroy()
  })
}
