const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unban',
  aliases: [],
  reqPerm: "BAN_MEMBERS",
  args: "<member id> [reason]",
  cooldown: 3000,
  desc: "Unban the specified member.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {

        if(!message.channel.permissionsFor(message.guild.me).has("BAN_MEMBERS")) {
            return message.inlineReply(`${client.emotes.error} I do not have the ban members permission. Please check my permissions`);
        }
        if (!args[0]) return message.inlineReply(`${client.emotes.error} please enter a users id to unban!`)

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.inlineReply(`${client.emotes.error} Not a valid user!`)
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
                    .setColor('#00ff00')
                    .setTimestamp()
                    .addField('User ID', user.user.id, true)
                    .addField('user Tag', user.user.tag, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                    .addField('Unbanned Reason', reason)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`${client.emotes.error} User ${member.tag} isn't banned!`)
                    .setColor('#ff0000')
                message.inlineReply(embed)
            }

        }).catch(e => {
            console.log(e)
            message.inlineReply(`${client.emotes.error} An error has occurred!`)
        });
    }
}
