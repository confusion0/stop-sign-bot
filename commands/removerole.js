const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'removerole',
  aliases: [],
  reqPerm: "MANAGE_ROLES",
  args: "<member | member id> <role name | id>",
  cooldown: 2000,
  desc: "Removes a role from a member.",
  example: [],
  module: "Roles",
  run: async(client, message, args) => {

        if (!args[0] || !args[1]) return message.inlineReply(`${client.emotes.error} Incorrect usage, It's <username | user id> <role name | id>`)

        try {

             const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
             const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

             const embed = new Discord.MessageEmbed()
                 .setTitle(`Role Name: ${roleName.name}`)
                 .setDescription(`${message.author} has successfully removed the role ${roleName} to ${member.user}`)
                 .setColor('BLUE')
                 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                 .setFooter(new Date().toLocaleString())

            return member.roles.remove(roleName).then(() => message.inlineReply(embed));
        } catch (e) {
            return message.inlineReply(`${client.emotes.error} Try to give a role that exists next time...`)
        }
    }
}
