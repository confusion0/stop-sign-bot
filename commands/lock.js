const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'lock',
  aliases: [],
  reqPerm: "MANAGE_CHANNELS",
  args: "",
  cooldown: 2000,
  desc: "Locks a channel.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
    
    if(!message.channel.permissionsFor(message.guild.me).has("ADMINISTRATOR")) {
        return message.inlineReply(`${client.emotes.error} I do not have the administrator permission. Please check my permissions`);
    }
    try {
        message.channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
               
            return message.inlineReply(`${client.emotes.success} I have locked this channel`);
    } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
        }
    }
}
