const Keyv = require('keyv')
const MONGOPATH = 'mongodb://xsadme:lmfao888@cluster0-shard-00-00.upphd.mongodb.net:27017,cluster0-shard-00-01.upphd.mongodb.net:27017,cluster0-shard-00-02.upphd.mongodb.net:27017/MyFirstDatabase?ssl=true&replicaSet=atlas-9eozlm-shard-0&authSource=admin&retryWrites=true&w=majority'

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
