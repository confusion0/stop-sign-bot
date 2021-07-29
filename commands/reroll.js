const ms = require('ms');

module.exports = {
    name: 'reroll',
    aliases: ['greroll'],
    reqPerm: "NONE",
    args: "<message id>",
    cooldown: 10000,
    module: "Giveaway",
    desc: "Reroll a giveaway",
    example: [],
    run: async(client, message, args) => {
    let guild = message.guild
    const grole = await client.gData.get(`${guild.id}:grole`)
    
    // If the member doesn't have enough permissions
    if(!(message.member.roles.cache.get(grole) || message.member.roles.cache.some((r) => r.name === "Giveaways"))){
        return message.inlineReply(`${client.emotes.error} You need to have the the Giveaways role to reroll giveaways.`);
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
        return message.inlineReply(`${client.emotes.error} `+'Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID, {
        messages: {
            congrat: '🎉 New winner(s): {winners}! Congratulations, you won **{prize}**!\n{messageURL}',
            error: `${client.emotes.error} No valid participations, no new winner(s) can be chosen!`
        }
    })
    .then(() => {
        // Success message
        message.inlineReply('🎉 Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.inlineReply(`${client.emotes.error} This giveaway has not ended!`);
        } else {
            console.error(e);
            message.inlineReply(`${client.emotes.error} An error occured...`);
        }
    });
  }
};
