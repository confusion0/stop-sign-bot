const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Schema = require('../models/lockdown')

module.exports = {
  name: 'server',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "<lockdown | unlockdown>",
  cooldown: 60000,
  desc: "Lockdowns the entire server.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
	let filter = (m) => m.author.id === message.author.id
	let collect = new Discord.MessageCollector(message.channel, filter, { time: 60000, max: 1 })

    if(!message.member.hasPermission('MANAGE_GUILD')) { 
        return message.inlineReply(`${client.emotes.error} You do not have the manage server permission!`)
	}

	if (!args[0]) return message.inlineReply(`${client.emotes.error} ` + 'There are two valid options for this command. `Lockdown` to lockdown the server and `unlockdown` to remove the lockdown');
	
	if (!['lockdown', 'unlockdown'].includes(args[0].toLowerCase())) return message.inlineReply(`${client.emotes.error} ` + 'Please provide a valid option! Either `true` or `false`.', { allowedMentions: { repliedUser: false } });
	
	let data = await Schema.findOne({
		Guild: message.guild.id,
	});
	
	if(!data) {
		await new Schema({
			Guild: message.guild.id,
			Lockdown: {
			  Enabled: false,
			  Channels: channelIDs,
			}
		}).save();

		return message.inlineReply(`${client.emotes.error} ` + 'You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.');
	}

	if(!data.Lockdown) return message.inlineReply(`${client.emotes.error} ` + 'You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.')

	if(!data.Lockdown.Channels[0]) return message.reply(`${client.emotes.error} ` + 'You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.');

	if (args[0].toLowerCase() === 'lockdown') {
		if(data.Lockdown.Enabled) return message.inlineReply(`${client.emotes.error} ` + 'The server is already locked!');

		message.inlineReply("Are you **ABSOLUTELY** sure that you want to lockdown the server? Type \`yes\` or \`no\`.")

		collect.on("collect", async (msg) => {
            if (msg.content.toLowerCase() === 'yes') {

				data.Lockdown.Enabled = true;

				const channels = message.guild.channels.cache.filter(x => data.Lockdown.Channels.includes(x.id));
				channels.forEach((channel) => {
					if(!channel.manageable) return;
					channel.updateOverwrite(message.guild.id, {
						SEND_MESSAGES: false,
					});
				});
				message.channel.send(`${client.emotes.success} ` + 'Lockdowned the server!');
				data.save();
			} else if(msg.content.toLowerCase() === 'no') {
				return message.channel.send(`I guess we won't be locking the server up!`)
			} else return message.channel.send(`${client.emotes.error} You must reply to this message with either \`yes\` or \`no\``)
		})
	} else if(args[0].toLowerCase() === 'unlockdown') {
		    if(!data.Lockdown.Enabled) return message.inlineReply(`${client.emotes.error} ` + 'The server is already unlocked!');

			message.inlineReply("Are you **ABSOLUTELY** sure that you want to unlockdown the server? Type \`yes\` or \`no\`.")

			collect.on("collect", async (msg) => {
            	if (msg.content.toLowerCase() === 'yes') {

		    		data.Lockdown.Enabled = false;
		    		const channels = message.guild.channels.cache.filter(x => data.Lockdown.Channels.includes(x.id));
		    		channels.forEach((channel) => {
			    		if(!channel.manageable) return;
			    		channel.updateOverwrite(message.guild.id, {
				    		SEND_MESSAGES: true,
						});
					});
					message.channel.send(`${client.emotes.success} ` + 'Unlocked the server!');
					data.save();
				} else if(msg.content.toLowerCase() === 'no') {
					return message.channel.send(`I guess we won't be unlocking the server!`)
				} else return message.channel.send(`${client.emotes.error} You must reply to this message with either \`yes\` or \`no\``)
			})
        }
    }
}
