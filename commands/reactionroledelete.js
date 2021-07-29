const Schema = require('../models/reactionroles')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'reactionroledelete',
    aliases: ['rrdelete', 'delete', 'reaction-role-delete'],
    reqPerm: "ADMINISTRATOR",
    args: "NONE",
    cooldown: 30000,
    module: "Roles",
    desc: "Deletes a reaction role",
    example: [],
    run: async(client, message, args) => {


        let filter = (m) => m.author.id === message.author.id
        message.inlineReply("Are you **ABSOLUTELY** sure that you want to delete the reaction role data? Type \`yes\` or \`no\`.")
        let collect = new Discord.MessageCollector(message.channel, filter, { time: 60000, max: 1 })

        collect.on("collect", async (msg) => {
            if (msg.content.toLowerCase() === 'yes') {
	            Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) {
                        await Schema.findOneAndDelete({ Guild: message.guild.id }, data);
                    }
                })
                message.channel.send(`${client.emotes.remove} I have successfully deleted the current reaction roles!`)
            }
            else if(msg.content.toLowerCase() == 'no') {
                message.channel.send(`${client.emotes.success} Alright, I guess the reaction roles will live to see another day.`)
            }
            else return message.inlineReply(`${client.emotes.error} You must reply to this message with either \`on\` or \`off\``)
        })
    }
}
