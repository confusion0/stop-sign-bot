const ms = require('ms');

module.exports = {
    name: 'end',
    aliases: ['gend'],
    reqPerm: "NONE",
    args: "<message id>",
    cooldown: 10000,
    module: "Giveaway",
    desc: "End an ongoing giveaway",
    example: [],
    run: async(client, message, args) => {
    let guild = message.guild
    const grole = await client.gData.get(`${guild.id}:grole`)
    
    // If the member doesn't have enough permissions
    if(!(message.member.roles.cache.get(grole) || message.member.roles.cache.some((r) => r.name === "Giveaways"))){
        return message.inlineReply(`${client.emotes.error} You need to have the the ``Giveaways`` role to end giveaways.`);
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.inlineReply(`${client.emotes.error} You have to specify a valid message ID!`);
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.inlineReply('Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.inlineReply('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.inlineReply(`${client.emotes.error} This giveaway has already ended!`);
        } else {
            console.error(e);
            message.inlineReply(`${client.emotes.error} An error occured...`);
        }
    });
    }
};
