const { MessageEmbed } = require('discord.js')

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
  name: 'auditlog',
  run: async(client) => {
    const logAudit = async (guild, embed) => {
      const logChannel = guild.channels.cache.get(await client.gData.get(`${guild.id}:auditlogchannel`))
      if(logChannel) logChannel.send(embed)
    }

    client.on('messageDelete', message => {
      const { guild, author, channel, content } = message
      if (!guild) return
      if (message.partial) return
      if (message.author.bot) return
        const embed = new MessageEmbed()
      .setAuthor(author.tag, author.displayAvatarURL())
      .setDescription(`${author}'s message was from deleted inside ${channel}`)
      .setColor('BLUE')
      .setTimestamp()
        
      if(message.attachments.first() || message.attachments.first().proxyURL) {
        embed.setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
      } else {
        embed.addField('Message', content)
      }

      logAudit(guild, embed)
      
    })

    client.on("messageUpdate", async function(oldMessage, newMessage) {

      let main = await oldMessage.fetch();
    
      if (oldMessage.content === newMessage.content) return;
    
      let message = newMessage;

      if (message.partial) return
      if (message.author.bot) return

      const { guild } = message
      if (!guild) return
      const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .setColor('BLUE')
      .setTitle(`A message in ${message.channel.name} was edited by ${main.author.tag}\n `)
      .setThumbnail(message.author.avatarURL({dynamic:true}))
      .setDescription(`[Link to message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
      .setTimestamp()

      if(newMessage.attachments.first() || newMessage.attachments.first().proxyURL) {
        embed.setImage(newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null)
      } else {
        embed.addField("Old message content", `${oldMessage.content}`)
        embed.addField("New message content", `${newMessage.content}`)
      }

      logAudit(guild, embed)
    
    })

    client.on('channelCreate', async function(channel) {
      const { guild } = channel
      if (!guild) return
      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
    
      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
      .setTitle('A channel was created')
        .setDescription(`<#${channel.id}> was created by ${entry.executor.tag}`)
        .setTimestamp()
      logAudit(guild, embed)
    })

    client.on('channelDelete', async function(channel) {
      const { guild } = channel
      if (!guild) return
      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
      .setTitle('A channel was deleted')
        .setDescription(`${channel.id} was deleted by ${entry.executor.tag}`)
        .setTimestamp()
      logAudit(guild, embed)
    })

    client.on("channelUpdate", async function(oldChannel, newChannel) {
      let channel = oldChannel;
      const { guild } = channel
      if (!guild) return
        const entry = await channel.guild.fetchAuditLogs({type : "CHANNEL_UPDATE"}).then(audit => audit.entries.first());
      
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('A channel was updated')
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
        .setDescription(`\`${channel.name}\` (${channel.id}) has been changed by ${entry.executor.tag} to \`${newChannel.name}\``)
        .setTimestamp()

        logAudit(guild, embed)
        
      })

    client.on("guildBanAdd", async (guild, user) => {
      const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
        .setTitle('A member was banned')
          .setDescription(`<@${user.id}> was banned by ${entry.executor.tag}`)
          .setTimestamp()

        logAudit(guild, embed)
    })

    client.on("guildBanRemove", async(guild, user) => {
     const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
      .setTitle('A member was unbanned')
        .setDescription(`<@${user.id}> was unbanned by ${entry.executor.tag}`)
        .setTimestamp()


        logAudit(guild, embed)
    })

    client.on("roleCreate", async function (role) {
      const { guild } = role
      const entry = await guild.fetchAuditLogs({type: "ROLE_CREATE"}).then(audit => audit.entries.first());

      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
      .setTitle('A role was created')
        .setDescription(`${role.name} was created by ${entry.executor.id}`)
        .setTimestamp()

        logAudit(guild, embed)
    })

    client.on("roleDelete", async function (role) {
      const { guild } = role
        
      const entry = await guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(audit => audit.entries.first());

      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('A role was deleted')
      .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL())
        .setDescription(`A role was deleted by <@${entry.executor.id}>`)

        logAudit(guild, embed)
    })


    
  }
}
