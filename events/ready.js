const Schema = require('../models/blacklist')
const { blacklistedWords } = require('../collections/blacklist')

module.exports = (client) => {
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    Schema.find()
    .then(((data) => {
        data.forEach((val) => {
            blacklistedWords.set(val.Guild, val.Words)
        })
    }))
};
