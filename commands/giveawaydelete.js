const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'giveawaydelete',
    aliases: ['gdelete', 'giveaway-delete'],
    reqPerm: "NONE",
    args: "<giveaway message id>",
    cooldown: 10000,
    module: "Giveaway",
    desc: "Delete a giveaway on the server",
    example: [],
    run: async(client, message, args) => {

        let guild = message.guild
        const grole = await client.gData.get(`${guild.id}:grole`)

        if(!(message.member.roles.cache.get(grole) || message.member.roles.cache.some((r) => r.name === "Giveaways"))){
            return message.channel.send(`${client.emotes.error} You need to have the the Giveaways role to delete giveaways.`);
        }

        let giveaway = 
        // Search with giveaway prize
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway){
            return message.channel.send(`${client.emotes.error} Unable to find a giveaway for \`` + args.join(' ') + '\`');
        }

        client.giveawaysManager.delete(giveaway.messageID)
        // Success message
        .then(() => {
            // Success message
            message.channel.send(`${client.emotes.success} The giveaway has been deleted.`);
        })
        .catch((error) => {
            message.channel.send(`${client.emotes.error} An error occured while deleting this giveaway! ERROR: \`\`\`${error}\`\`\``)
        });
    }
}
