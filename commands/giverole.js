const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'giverole',
    aliases: [],
    reqPerm: "MANAGE_ROLES",
    args: "<member | member id> <role | role id>",
    cooldown: 1000,
    module: "Roles",
    desc: "Gives a role to a member.",
    example: [],
    run: async(client, message, args) => {

        if (!args[0] || !args[1]) return message.inlineReply(`${client.emotes.error} Incorrect usage, It's <username | user id> <role name | id>`)

        try {

             const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
             const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

             const alreadyHasRole = member._roles.includes(roleName.id);

             if (alreadyHasRole) return message.inlineReply(`${client.emotes.error} User already has that role`)

             const embed = new Discord.MessageEmbed()
                 .setTitle(`Role Name: ${roleName.name}`)
                 .setDescription(`${message.author} has successfully given the role ${roleName} to ${member.user}`)
                 .setColor('BLUE')
                 .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                 .setFooter(new Date().toLocaleString())

            return member.roles.add(roleName).then(() => message.inlineReply(embed));
        } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
        }
    }
}
