const ms = require('ms');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'uptime',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "",
  module: "Secret",
  desc: "Shows the uptime for the bot",
  example: [],
  cooldown: 1000,
  run: async(client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle('Uptime')
    .setColor('BLUE')
    .setDescription(ms(client.uptime, {long:true}))
    message.inlineReply(embed)
  }
}
