const WebSocket = require('uws')
const hypercore = require('hypercore')
const hyperdiscovery = require('hyperdiscovery')

const feed = hypercore('./ticker-data', {valueEncoding: 'json'})

feed.once('ready', () => console.log(feed.key.toString('hex')))
feed.once('ready', () => hyperdiscovery(feed))

const sock = new WebSocket('wss://api.bitfinex.com/ws')

sock.onopen = function () {
  sock.send(JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    pair: 'BTCUSD'
  }))
}

var dataChannel = null
sock.onmessage = function (raw) {
  var msg = JSON.parse(raw.data)

  console.log(msg)
  if (msg[0] === dataChannel && msg[1] !== 'hb') return feed.append([msg])
  if (msg.event && msg.event === 'subscribed') dataChannel = msg.chanId
}
