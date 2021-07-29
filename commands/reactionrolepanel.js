const { MessageEmbed } = require('discord.js')
const Schema = require('../models/reactionroles')

module.exports = {
    name: 'reactionrolepanel',
    aliases: ['rrpanel', 'reaction-role-panel'],
    reqPerm: "ADMINISTRATOR",
    args: "[channel mention | channel id | none]",
    cooldown: 10000,
    module: "",
    desc: "Displays the reaction roles",
    example: [],
    run: async(client, message, args) => {
               
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

        try {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.inlineReply(`${client.emotes.error} There are no reaction roles yet. Use the \`reactionroleadd\` command to add some reaction roles.`)
            const mapped = Object.keys(data.Roles)
            .map((value, index) => {
                const role = message.guild.roles.cache.get(data.Roles[value][0])

                return `${index + 1}) React to ${data.Roles[value][1].raw} for ${role}!`;
            }).join("\n\n");

            channel.send(new MessageEmbed().setTitle('Reaction roles').setColor("BLUE").setDescription(mapped))
            .then((msg) => {
                data.Message = msg.id
                data.save()

                const reactions = Object.values(data.Roles).map((val) => val[1].id ?? val[1].raw)
                    
                reactions.map((emoji) => msg.react(emoji));
            })
        })
        } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured while running this command! ERROR: \`\`\`${error}\`\`\``)
        } 
    }
}
