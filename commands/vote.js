const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'vote',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "Info",
    desc: "Vote for the bot or else",
    example: [],
    run: async(client, message, args) => {

      const topgg = new MessageButton()
      .setLabel("Vote on Top.gg")
      .setStyle("url")
      .setURL("https://top.gg/bot/823568726372253716/vote") 

      const dbl = new MessageButton()
      .setLabel("Vote on Discord Bot List")
      .setStyle("url")
      .setURL("https://discordbotlist.com/bots/stop-sign/upvote")

      message.channel.send('Vote for me!', {
          buttons: [topgg, dbl]
      })
  }
}
