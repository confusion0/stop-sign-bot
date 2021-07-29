const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'rolelock',
  aliases: [],
  reqPerm: "MANAGE_CHANNELS",
  args: "<role | role id>",
  cooldown: 2000,
  desc: "Locks the channel for the specified role.",
  example: [],
  module: "Roles",
  run: async(client, message, args) => {
   
    if(!message.channel.permissionsFor(message.guild.me).has("ADMINISTRATOR")) {
        return message.channel.send(`${client.emotes.error} I do not have the administrator permission. Please check my permissions`);
    }

    if (!args[0]) return message.inlineReply(`${client.emotes.error} Incorrect usage. The correct usage, its < Role mention/id >`)

    const roleName = message.guild.roles.cache.find(r => (r.name === args[0].toString()) || (r.id === args[0].toString().replace(/[^\w\s]/gi, '')));

    if(!roleName) {
        return message.inlineReply(`${client.emotes.error} Incorrect usage. The correct usage, its < Role mention/id >`)
    }
    try {

        message.channel.updateOverwrite(roleName, {
                    SEND_MESSAGES: false
                })
                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`${client.emotes.success} I have locked this channel for ${roleName}`)

            return message.channel.send(embed);
    } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
      }
    }
}
