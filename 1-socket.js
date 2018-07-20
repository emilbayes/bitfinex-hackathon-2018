const WebSocket = require('uws')

const sock = new WebSocket('wss://api.bitfinex.com/ws')

sock.onopen = function () {
  sock.send(JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    pair: 'BTCUSD'
  }))
}

sock.onmessage = function (raw) {
  var msg = JSON.parse(raw.data)

  console.log(msg)
}
