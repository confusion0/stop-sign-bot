const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'tempunlock',
  aliases: [],
  reqPerm: "MANAGE_CHANNELS",
  args: "<time>",
  cooldown: 2000,
  desc: "Unlocks a channel for a duration.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
    
    if(!message.channel.permissionsFor(message.guild.me).has("ADMINISTRATOR")) {
        return message.inlineReply(`${client.emotes.error} I do not have the administrator permission. Please check my permissions`);
    }

    let Timer = args[0];

    if(!args[0] || isNaN(ms(Timer))){
        return message.inlineReply(`${client.emotes.error} Incorrect usage. The correct usage, its < Time >`);
    }
    
      if(!args[0]){
        return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
      }

if(args[0] <= 0){
  return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
}
try {
        message.channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
                message.inlineReply(`${client.emotes.success} I have unlocked this channel for ${ms(ms(Timer), {long: true})}!`);

                setTimeout(function(){
                    message.channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    })
                    message.channel.send(`${client.emotes.success} This channel has been locked!`)
                  }, ms(Timer));
    } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
      }
    }
}
