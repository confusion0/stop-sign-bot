const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'snipe',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  cooldown: 5000,
  module: "General",
  desc: "snipes the last deleted message.",
  example: [],
  run: async(client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send('There is nothing to snipe!')

    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setTimestamp()

    if(msg.image) embed.setImage(msg.image)

    message.channel.send(embed)
  }
}
