const hypercore = require('hypercore')
const swarm = require('hyperdiscovery')
const ram = require('random-access-memory')

const feed = hypercore(ram, 'fda9b1865df061fb24523da5ea2748bdee6f1b5e178cc9c42e71195942632e55', {valueEncoding: 'json'})

feed.createReadStream({live: true}).on('data', console.log)

feed.ready(_ => swarm(feed))
