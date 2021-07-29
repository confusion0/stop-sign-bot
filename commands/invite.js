const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'invite',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "General",
    desc: "Invite the bot.",
    example: [],
    run: async(client, message, args) => {
    const server = new MessageButton()
      .setLabel("Support server")
      .setStyle("url")
      .setURL("https://discord.gg/KP3wwvmwfM") 

      const invite = new MessageButton()
      .setLabel("Invite link")
      .setStyle("url")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=823568726372253716&permissions=8&scope=bot%20applications.commands")

      message.channel.send('Make sure to invite me and join my support server!', {
          buttons: [server, invite]
      })
    }
} 
