const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  aliases: ['si'],
  reqPerm: "NONE",
  args: "",
  cooldown: 2000,
  desc: "Shows info on the server.",
  example: [],
  module: "Info",
  run: async(client, message, args) => {
        const serverinfo_embed = new MessageEmbed()
        serverinfo_embed.setAuthor(
            `${message.author.username}`,
            message.author.displayAvatarURL()
          )
          serverinfo_embed.setColor('BLUE')
          serverinfo_embed.setTimestamp()
          serverinfo_embed.setTitle("Server Info")
          serverinfo_embed.setThumbnail(message.guild.iconURL())
          serverinfo_embed.setDescription(`${message.guild}'s information`)
          serverinfo_embed.addField(
            "Roles Count",
            `This server has ${message.guild.roles.cache.size} roles`
          )
          serverinfo_embed.addField(
             "Server Owner",
             `${message.guild.owner}`
          )
          serverinfo_embed.addField(    
              "Total Members",
              `${message.guild.memberCount}`
          )
          serverinfo_embed.addField(
            "Server region",
            `${message.guild.region}`
          )
          serverinfo_embed.addField(
              "Emoji Count",
              `${message.guild.emojis.cache.size}`
          )
          ,serverinfo_embed.addField(
              "Boost Status",
              "Boost Count `" +
                message.guild.premiumSubscriptionCount +
                "` Boost Level `" +
                message.guild.premiumTier +
                "`"
            )
            serverinfo_embed.addField(
              "Server created",
              `${message.guild.createdAt}`
            )
            ,serverinfo_embed.addField(
              "Maximum members",
              `${message.guild.maximumMembers}`
            )
            serverinfo_embed.addField(
              "Verification level",
              `${message.guild.verificationLevel}`
            )
      
            message.inlineReply(serverinfo_embed)
            }
};

