const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const pagination = require('discord.js-pagination');
const ms = require('ms');
const { blacklistedWords } = require('../collections/blacklist');
const Schema = require('../models/blacklist');
const Schema2 = require('../models/lockdown')
const wait = require('util').promisify(setTimeout);

colors = [
  "WHITE",
  "AQUA",
  "GREEN",
  "BLUE",
  "YELLOW",
  "PURPLE",
  "LUMINOUS_VIVID_PINK",
  "GOLD",
  "ORANGE",
  "RED",
  "GREY",
  "DARKER_GREY",
  "NAVY",
  "DARK_AQUA",
  "DARK_GREEN",
  "DARK_BLUE",
  "DARK_PURPLE",
  "DARK_VIVID_PINK",
  "DARK_GOLD",
  "DARK_ORANGE",
  "DARK_RED",
  "DARK_GREY",
  "LIGHT_GREY",
  "DARK_NAVY",
  "BLURPLE",
  "GREYPLE",
  "DARK_BUT_NOT_BLACK",
  "NOT_QUITE_BLACK",
  "RANDOM"
]

var configs = [

  { title: 'Prefix',
    name: 'prefix',
    args: '<Prefix>',
    current: async (client, guild) => {
      return await client.gData.get(`${guild.id}:prefix`) || client.config.prefix
    },
    run: async (client, message, args) => {

      if(!message.member.hasPermission("MANAGE_GUILD")) {
        return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
    }

      if(!args[0]) return message.channel.send(`${client.emotes.error} You need to enter a prefix.`)
	 
      if(args[0] === client.config.prefix) {
        client.gData.delete(`${message.guild.id}:prefix`)
      } else {
        client.gData.set(`${message.guild.id}:prefix`, args[0])
      }	
      message.inlineReply(`${client.emotes.success} The bot prefix is now \`${args[0]}\``)
    }
  },

  //----------------------------------------------------------------------------------------------------------------------

  { title: 'Audit Log Channel',
    name: 'auditlog',
    args: '<Channel ID | Channel Mention | None>',
    current: async (client, guild) => {
      if(!(await client.gData.get(`${guild.id}:auditlogchannel`))) return 'None'
      return "<#" + await client.gData.get(`${guild.id}:auditlogchannel`) + ">"
    },
    run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
    }

      const { channel, guild } = message
      if(!args[0]) return message.inlineReply(`${client.emotes.error} Please enter the channel as a mention or its id, or none to remove. Ex: @Channel or 129038032234 or none`)

      let logChannel = message.mentions.channels.first() || guild.channels.cache.get(args[0])

      if(logChannel){
        client.gData.set(`${guild.id}:auditlogchannel`, logChannel.id)
        message.inlineReply(`${client.emotes.success} Set audit log channel to ${logChannel}.`)
      }
      else if(args[0].toLowerCase() == 'none') {
        client.gData.delete(`${guild.id}:auditlogchannel`)
        message.inlineReply(`${client.emotes.success} Set audit log channel to None.`)
      }
      else return message.inlineReply(`${client.emotes.error} Please enter the channel as a mention or its id, or none to remove. Ex: @Channel or 129038032234 or none`)
    }
  },

  //----------------------------------------------------------------------------------------------------------------------

{ title: 'Auto decancer',
    name: 'autodecancer',
    args: '<On | Off>',
    current: async (client, guild) => {
      if(!(await client.gData.get(`${guild.id}:autodecancer`))) return 'Off'
      return await client.gData.get(`${guild.id}:autodecancer`)
    },
    run: async (client, message, args) => {

      let user = message.author

      const { channel, guild } = message

      if(!message.member.hasPermission("MANAGE_GUILD")) {
        return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
      }

      let filter = (m) => m.author.id === message.author.id
        message.inlineReply("Please type `on` to turn them on. \n\n Please type `off` to turn them off.")
        let collect = new Discord.MessageCollector(message.channel, filter, { time: 60000, max: 1 })
        collect.on("collect", async (msg) => {
            if (msg.content.toLowerCase() === 'on') {
        client.gData.set(`${guild.id}:autodecancer`, 'On')
        message.inlineReply(`${client.emotes.success} Turned on the auto decancered`)
      }
      else if(msg.content.toLowerCase() == 'off') {
        client.gData.delete(`${guild.id}:autodecancer`)
        message.inlineReply(`${client.emotes.success} Turned off the auto decancered`)
      }
      else return message.inlineReply(`${client.emotes.error} You must reply to this message with either \`on\` or \`off\``)
    }
  )}
},

//----------------------------------------------------------------------------------------------------------------------

 { title: 'Giveaway Role',
name: 'giveawayrole',
args: '<Role | None>',
current: async (client, guild) => {
  if(!(await client.gData.get(`${guild.id}:grole`))) return 'None'
  return "<@&" + await client.gData.get(`${guild.id}:grole`) + ">"
},
run: async (client, message, args) => {
  const { channel, guild } = message
  let role = message.mentions.roles.first() || guild.roles.cache.get(args[0])

  if(!message.member.hasPermission("MANAGE_GUILD")) {
    return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
  }

  if(!args[0]) {
     return message.inlineReply(`${client.emotes.error} Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none`)
  }
  
  if (role) {
  client.gData.set(`${guild.id}:grole`, role.id)
  message.inlineReply(`${client.emotes.success} Set giveaway manager role to \`\`${role}.\`\``)
  } else if(args[0].toLowerCase() == 'none') {
  client.gData.delete(`${guild.id}:grole`)
  message.inlineReply(`${client.emotes.success} set giveaway manager role to None.`)
  }
  else return message.inlineReply(`${client.emotes.error} Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none`)
  }
}
	
]

var configs2 = [

{ title: 'Verification',
    name: 'verificationrole',
    args: '<Role | None>',
    current: async (client, guild) => {
      if(!(await client.gData.get(`${guild.id}:vrole`))) return 'None'
      return "<@&" + await client.gData.get(`${guild.id}:vrole`) + ">"
    },
    run: async (client, message, args) => {
      const { channel, guild } = message
      let role = message.mentions.roles.first() || guild.roles.cache.get(args[0])

      if(!message.member.hasPermission("MANAGE_GUILD")) {
        return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
      }
      if(!message.channel.permissionsFor(message.guild.me).has("ADMINISTRATOR")) {
        return message.channel.send(`${client.emotes.error} I do not have the ban members permission. Please check my permissions`);
      }
      const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');

     if(!args[0]) {
     	return message.inlineReply(`${client.emotes.error} Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none`)
     }
      	if (role) {
      	client.gData.set(`${guild.id}:vrole`, role.id)

    	message.inlineReply(`${client.emotes.success} Set verified role to \`\`${role}\`\`. Newcomers will now need to solve a captcha to gain access to the server.`)

   	} else if(args[0].toLowerCase() == 'none') {
        client.gData.delete(`${guild.id}:vrole`)
        
      	message.inlineReply(`${client.emotes.success} Set verified role to None.`)
      	}
        else return message.inlineReply(`${client.emotes.error} Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none`)
     }
  },
	
  //----------------------------------------------------------------------------------------------------------------------

  { title: 'Blacklisted Words',
    name: 'blacklistedwords',
    args: '<Add | Remove | Display> [Word]',
    current: async (client, guild) => {
      const getblacklistedWords = blacklistedWords.get(guild.id);
      if (!getblacklistedWords) return 'None' 
      return getblacklistedWords.join(", ")
    },
    run: async (client, message, args) => {
      const query = args[0]?.toLowerCase();
        const guild = { Guild: message.guild.id }
        const getblacklistedWords = blacklistedWords.get(message.guild.id);

        if (query === 'add') {
            const word = args[1]?.toLowerCase();
            if (!word) return message.inlineReply(`${client.emotes.error} Please specify a word!`);
            if(!word.length > 20) return message.inlineReply(`${client.emotes.error} The word you provided cannot be over 20 characters!`);
            if(getblacklistedWords && getblacklistedWords.length == 3) return message.inlineReply(`${client.emotes.error} You can only have 15 or less than blacklisted words! `)

            Schema.findOne(guild, async (err, data) => {
                
                if (data) {
                    if (data.Words.includes(word)) return message.inlineReply(`${client.emotes.error} That word already exists in the database!`)
                    data.Words.push(word)
                    data.save();
                    blacklistedWords.get(message.guild.id).push(word);
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Words: word
                    }).save();
                    blacklistedWords.set(message.guild.id, [word])
                }
            });
            message.inlineReply(`${client.emotes.add} ${word} is now blacklisted!`);
        } else if (query === 'remove') {
            const word = args[1]?.toLowerCase();
            if (!word) return message.inlineReply(`${client.emotes.error} Please specify a word!`);

            Schema.findOne(guild, async (err, data) => {
                if (!data) return message.inlineReply(`${client.emotes.error} This guild has no data saved in the database!`);

                if (!data.Words.includes(word)) return message.inlineReply(`${client.emotes.error} That word does not exist in the database!`)

                const filtered = data.Words.filter((target) => target !== word);
                if (getblacklistedWords && getblacklistedWords.length == 1) {
                    await Schema.findOneAndDelete({ Guild: message.guild.id }, data);
                }
                await Schema.findOneAndUpdate({
                    Guild: message.guild.id,
                    Words: filtered
                })
                blacklistedWords.set(message.guild.id, filtered);
            });
            message.channel.send(`${client.emotes.remove} Word has been removed!`);
        } else if (query === 'display') {
            Schema.findOne(guild, async (err, data) => {
                if (!data) return message.inlineReply(`${client.emotes.error} There is no data`);
                message.inlineReply(
                    new MessageEmbed()
                        .setTitle('Blacklisted Words')
                        .setDescription(data.Words.join(', '))
			                  .setColor('BLUE')
                )
            })
        } else return message.inlineReply(`${client.emotes.error} That query does not exist!`);
    }
  },

  //----------------------------------------------------------------------------------------------------------------------
  
  { title: 'Lockdown',
    name: 'lockdownchannels',
    args: '<Add | Delete | Remove | Display> [Channel(s)]',
    current: async (client, guild) => {
      const data = await Schema2.findOne({
			  Guild: guild.id,
		  });

      if(!data) return 'None'
      return `${data.Lockdown.Channels.length} channels`
    },
    run: async (client, message, args) => {
      if(!message.member.hasPermission('MANAGE_GUILD')) { 
        return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command!`)
      }

      if (!['add', 'delete', 'remove', 'display'].includes(args[0]?.toLowerCase())) return message.inlineReply(`${client.emotes.error} You must reply to this message with either \`add\`, \`delete\`, \`remove\` or \`display\``)

      if(args[0].toLowerCase() === 'add') {

      const data = await Schema2.findOne({
        Guild: message.guild.id,
      });

      if(data && 25 <= data.Lockdown.Channels.length) return message.inlineReply(`${client.emotes.error} You already have 25 or more channels in the lockdown data.`)

	    message.inlineReply('Please specify all the channels you want to lock at the time of lockdown!');

	    message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(async msgs => {
		  const msg = msgs.first();

		  if(!msg) return message.inlineReply(`${client.emotes.error} You didn't respond in time!`);

		  if(!msg.mentions.channels.first()) return message.inlineReply(`${client.emotes.eror} Please provide a valid channel!`);

		  const channelIDs = msg.mentions.channels.filter(x => x.type === 'text').map(e => e.id);

		  if(!channelIDs[0]) return message.inlineReply(`${client.emotes.error} Unable to find any valid channels!`);

		  if(!data) {
			  await new Schema2({
				  Guild: message.guild.id,
          Lockdown: {
				    Enabled: false,
				    Channels: channelIDs,
          }
			  }).save();

			  message.channel.send(`${client.emotes.success} Successfully saved all channels to lock when lockdown command is run! There are ${channelIDs.length} channels.`);
		  } else if(data) {
          for (const channelID of channelIDs) {
            if(data.Lockdown.Channels.includes(channelID)) return message.channel.send(`${client.emotes.error} That channel already exist in the database!`)
            data.Lockdown.Channels.push(channelID)	  
          }
            
          await data.save();
			    message.channel.send(`${client.emotes.success} Successfully set all the provided channels to lock when lockdown command is run! There are ${data.Lockdown.Channels.length} lockdown configurated channels.`);
		      }
	      });
      } else if(args[0].toLowerCase() === 'delete') {
        const data = await Schema2.findOne({
          Guild: message.guild.id,
        });

        if(!data) return message.inlineReply(`${client.emotes.error} There is no data to be deleted!`)

        message.inlineReply("Are you **ABSOLUTELY** sure that you want to delete the lockdown channel data? Type \`yes\` or \`no\`.")
        
        let filter = (m) => m.author.id === message.author.id
        let collect = new Discord.MessageCollector(message.channel, filter, { time: 60000, max: 1 })

        collect.on("collect", async (msg) => {
            if (msg.content.toLowerCase() === 'yes') {
	            Schema2.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) {
                        await Schema2.findOneAndDelete({ Guild: message.guild.id }, data);
                    }
                })
                message.channel.send(`${client.emotes.success} I have successfully deleted the current lockdown channel data!`)
            }
            else if(msg.content.toLowerCase() == 'no') {
                message.channel.send(`${client.emotes.success} Alright, I guess the lockdown channel will live to see another day.`)
            }
            else return message.channel.send(`${client.emotes.error} You must reply to this message with either \`yes\` or \`no\``)
        }) 
      } else if(args[0].toLowerCase() === 'remove') {
        const data = await Schema2.findOne({
          Guild: message.guild.id,
        });

        if(!data) return message.inlineReply(`${client.emotes.error} There is no lockdown channel data for this server!`)

        let channel = message.mentions.channels.first()

        if(!channel) return message.inlineReply(`${client.emotes.error} Please send a valid channel to delete from the lockdown channel data!`)

        if(!data.Lockdown.Channels.includes(channel.id)) return message.inlineReply(`${client.emotes.error} That channel does not exist in the lockdown channel data!`)

        if(data.Lockdown.Channels.length == 1) {

          Schema2.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
              await Schema2.findOneAndDelete({ Guild: message.guild.id }, data);
            }
          })
        }

        const filtered = data.Lockdown.Channels.filter((target) => target !== channel.id);
        const enabled = data.Lockdown.Enabled

        await Schema2.findOneAndUpdate({
          Guild: message.guild.id,
          Lockdown: {
            Enabled: enabled,
            Channels: filtered,
          }
        })
        
        return message.inlineReply(`${client.emotes.success} I have successfully deleted the channel from the lockdown channel data! There are now ${data.Lockdown.Channels.length} channels!`)
      } else if(args[0].toLowerCase() === 'display') {
        const data = await Schema2.findOne({
          Guild: message.guild.id,
        });

        if(!data) return message.inlineReply(`${client.emotes.error} There is no lockdown channels data to be displayed!`)

        var channels = ""
        data.Lockdown.Channels.forEach(channel => {
          channels += ( "<#" + channel + ">, ")
        })
        channels.substring(0, channels.length-2)

        message.inlineReply(
          new MessageEmbed()
          .setTitle('Lockdown channels')
          .setDescription(channels)
          .setColor('BLUE')
        )
      } else return message.inlineReply(`${client.emotes.error} You must reply to this message with either \`add\`, \`delete\`, \`remove\` or \`display\``)
    }
  },

  //----------------------------------------------------------------------------------------------------------------------
  
  { title: 'Antispam',
  name: 'antispam',
  args: '<On | Off>',
  current: async (client, guild) => {
    if(!(await client.gData.get(`${guild.id}:asrole`))) return 'None'
    return "<@&" + await client.gData.get(`${guild.id}:asrole`) + ">"
  },
  run: async (client, message, args) => {
    const { channel, guild } = message
  
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
    }
    let filter = (m) => m.author.id === message.author.id
          message.inlineReply("Please type `on` to turn the antispam on. \n\n Please type `off` to turn them off.")
          let collect = new Discord.MessageCollector(message.channel, filter, { time: 60000, max: 1 })
          collect.on("collect", async (msg) => {
              if (msg.content.toLowerCase() === 'on') {
          let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');
          if(!muterole) {
          try {
          muterole = await message.guild.roles.create({
            data: {
            name: "Muted",
            permissions: []
            },
          })
          message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS : false
            })
          })
        } catch(error) {
          return message.inlineReply(`${client.emotes.error} There was an error while creating the antispam/mute role. ERROR: \`\`\`${error}\`\`\``)
        }
        }
          client.gData.set(`${guild.id}:asrole`, muterole.id)
          message.inlineReply(`${client.emotes.success} Turned on the antispam, created muted role.`)
        }
        else if(msg.content.toLowerCase() == 'off') {
          client.gData.delete(`${guild.id}:asrole`)
          message.inlineReply(`${client.emotes.success} Turned off the antispam.`)
        } 
        else return message.inlineReply(`${client.emotes.error} You must reply to this message with either \`on\` or \`off\``)
      })
    }
  },
  
  //----------------------------------------------------------------------------------------------------------------------
  
  { title: 'Alt identifier',
  name: 'altidentifier',
  args: '[None]',
  current: async (client, guild) => {
    if(!(await client.gData.get(`${guild.id}:aichannel`))) return 'None'
    return "<#" + await client.gData.get(`${guild.id}:aichannel`) + ">"
  },
  run: async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) {
      return message.inlineReply(`${client.emotes.error} You need the manage server permission to use this command`);
  }
  
    const { guild } = message
    const filter = m => m.content.includes("");
    const collector = message.channel.createMessageCollector(filter, {time: 500000});
  
      const steps = 2
      const text = [
        "Enter a time for the account age limit.",
        "Enter a channel that you want the message to send to when someone has been identified as an alt.",
        "Alt identifier setup complete!"
      ]
  
      let step = 0
      let time = "none", channel = "none"
      let messages = []
      let cancelled = true
  
      if (!args[0]) {
  
      const embed = new MessageEmbed()
      .setTitle("Alt identifier setup")
      .setColor('BLUE')
      .setFooter(`Step ${step} of ${steps} | Type cancel to exit • ${message.author.tag}`)
      .setDescription(text[0])
      .addFields(
        { name: 'Time', value: time},
        { name: 'Channel', value: channel},
      )
      
      embed.setFooter(`Step ${step+1} of ${steps} | Type cancel to exit`)
      const message2 = await message.channel.send(embed)
  
      collector.on('collect', async m => {
        if(m.author.bot) return
        if(m.author != message.author) return 
  
        messages.push(m)
  
        if((m.content).trim().toLowerCase() == "cancel"){ 
          return collector.stop()
        }
  
        if(step == 0){
          time = (m.content).trim()
          if((!time) || isNaN(ms(time))){
            let errorMessage = await message.channel.send(`${client.emotes.error} That is not a valid time!`)
            return messages.push(errorMessage)
          } 
          if(ms(time) > ms('30 days')) {
            let errorMessage = await message.channel.send(`${client.emotes.error} The time must be under 30 days`)
            return messages.push(errorMessage)
          }
          embed.fields.find(c => c.name === 'Time')['value'] = ms(ms(time), { long: true });
        }
  
        if(step == 1){
          channel = m.mentions.channels.first()
        if(!channel){
          return message.channel.send(`${client.emotes.error} You have to mention a valid channel!`);
        }
          embed.fields.find(c => c.name === 'Channel')['value'] = channel;
        }
  
        step += 1
  
        embed.setDescription(text[step])
        embed.setFooter(`Step ${step+1} of ${steps} | Type cancel to exit`)
  
        message2.edit(embed)
  
        if(step >= steps){
          cancelled = false
          return collector.stop()
        }
  
      });
      collector.on('end', async collected => {
        if(cancelled){
          await message.channel.send(`${client.emotes.success} Alt identifier setup has been cancelled.`)
          return;
        } 
  
        client.gData.set(`${guild.id}:aichannel`, channel.id)
        client.gData.set(`${guild.id}:aitime`, time)
        await message.channel.send(`${client.emotes.success} Alt identifier setup is done.`)
      })
    } else if (args[0].toLowerCase() == 'none') {
        client.gData.delete(`${guild.id}:aichannel`)
        client.gData.delete(`${guild.id}:aitime`)
        message.inlineReply(`${client.emotes.success} Set alt identifier channel to None.`)
      }
  }
  }

]

module.exports = {
    name: 'config',
    aliases: ['configuration', 'configurate'],
    reqPerm: "MANAGE_GUILD",
    args: "",
    cooldown: 10000,
    module: "Configuration",
    desc: "Displays the config panel",
    example: [],
    run: async(client, message, args) => {

    const embed = new MessageEmbed()
    const embed2 = new MessageEmbed()
    if(!args[0]){
      embed.setTitle('Configuration')
      embed.setThumbnail(client.user.displayAvatarURL())
      embed.setColor('BLUE')
      embed.setFooter('Credits to !!NoobMan13!!#6008 for this command')

      for(config of configs){
        embed.addField(config.title, `**→ Current: **${(await config.current(client, message.guild))} \n\`\`\`${config.name} ${config.args}\`\`\``)
      }

      embed2.setTitle('Configuration')
      embed2.setThumbnail(client.user.displayAvatarURL())
      embed2.setColor('BLUE')
      embed2.setFooter('Credits to !!NoobMan13!!#6008 for this command')

      for(config2 of configs2){
        embed2.addField(config2.title, `**→ Current: **${(await config2.current(client, message.guild))} \n\`\`\`${config2.name} ${config2.args}\`\`\``)
      }

      const pages = [
        embed,
        embed2
      ]

      const emojiList = ["⏪", "⏩"];

      let timeout = 60000

      pagination(message, pages, emojiList, timeout)
    
    } else {
      for(config of configs){
        if(args[0] == config.name) config.run(client, message, args.slice(1))
      }
      for(config2 of configs2){
        if(args[0] == config2.name) config2.run(client, message, args.slice(1))
      }
    }
}
}
