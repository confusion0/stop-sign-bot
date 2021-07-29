const Discord = require('discord.js');
const { MessageEmbed } =require('discord.js');

module.exports = {
  name: 'nuke',
  aliases: ['nukechannel'],
  reqPerm: "MANAGE_CHANNELS",
  args: "",
  cooldown: 2000,
  desc: "Nukes a channel.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
     let user = message.member;
          
        let filter = (m) => m.author.id === message.author.id
        message.inlineReply("You sure? Please type `confirm` to continue. \n\n Nevermind? Type `cancel` .")
        let collect = new Discord.MessageCollector(message.channel, filter, { time: 60000, max: 1 })
        collect.on("collect", async (msg) => {
            if (msg.content.toLowerCase() === 'confirm') {
                try {
                let channel = client.channels.cache.get(message.channel.id);
                let position = channel.position;

                let channel2 = await channel.clone();

                channel2.setPosition(position);
                channel.delete();
                const nukeembed = new Discord.MessageEmbed()
                    .setTitle("Channel Successfully Nuked!")
                    .setDescription(`The channel was nuked by ${message.author.username}`)
                    .setColor('BLUE')
                    .setImage("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbestanimations.com%2FMilitary%2FExplosions%2Fatomic-mushroom-cloud-explosion-2-2.gif&f=1&nofb=1")
                channel2.send(nukeembed);
                } catch(error) {
                    message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
                }
            } else if (msg.content.toLowerCase() === 'cancel') {
                return message.inlineReply("Alright, looks like we aren't nuking this channel today.")
            }
        })
    }
}
