const Keyv = require('keyv')
const MONGOPATH = 'mongoURI'

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'datasetup',
  run: async(client) => {
    client.gData = new Keyv(MONGOPATH, {namespace: 'guilds'})
    client.uData = new Keyv(MONGOPATH, {namespace: 'users'})

    client.gData.on('error', err => console.error('Keyv connection error:', err));
    client.uData.on('error', err => console.error('Keyv connection error:', err));
  }
}
