const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const keyPermissions = [
  'ADMINISTRATOR',
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'MANAGE_GUILD',
  'MENTION_EVERYONE',
  'MANAGE_NICKNAMES',
  'MANAGE_CHANNELS',
  'MANAGE_ROLES',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS',
]

module.exports = {
  name: 'roleinfo',
  aliases: [],
  reqPerm: "MANAGE_ROLES",
  args: "<role | role id>",
  cooldown: 2000,
  desc: "Shows the info on a role.",
  example: [],
  module: "Roles",
  run: async(client, message, args) => {
  let role;
  if(args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first()
  if(args[0] && isNaN(args[0]) && !message.mentions.roles.first()){
    role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())

    if(!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())) return message.inlineReply(`${client.emotes.error} Role not found`)
  }
  try {
  if(args[0] && !isNaN(args[0])){
    role = message.guild.roles.cache.find(e => e.id == args[0])
    if(!message.guild.roles.cache.has(args[0])) return message.reply(`${client.emotes.error} Role not found`)
  }

  if(!role) return message.inlineReply(`${client.emotes.error} You must mention role`)

  var permissionString = '';
            var permissions = role.permissions.serialize();
            permissions = Object.entries(permissions);

            for(permission of permissions) {
                if(permission[1] && keyPermissions.includes(permission[0])) {
                    permissionString = `${permissionString}\`${permission[0]}\`, `
                }
            }
            if(permissionString.length > 0) permissionString = permissionString.slice(0, -2);

  let embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(message.guild.name,message.guild.iconURL())
  .setDescription(`**Role Name:** ${role.name} (<@&${role.id}>)\n\n**Role ID:** **\`${role.id}\`**\n\n**Role Mentionable:** ${role.mentionable.toString().replace("true","Yes").replace("false","No")}\n\n`)
  .addField('**Role position**', role.position)
  .addField('**Permissions: **', permissionString)
message.inlineReply(embed)
} catch (e) {
  return message.channel.send(`${client.emotes.error} Try to give a role that exists next time...`)
}
}
}
