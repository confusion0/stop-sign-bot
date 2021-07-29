const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'esnipe',
    aliases: ['editsnipe'],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "General",
    desc: "snipes the last edited message.",
    example: [],
    run: async(client, message, args) => {
    const msg = client.editsnipes.get(message.channel.id)
    if(!msg) return message.channel.send('There is nothing to edit snipe!')

    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(`Message edited by ${msg.author}`)
    .addField('Old message content', msg.oldcontent)
    .addField('New message content', msg.newcontent)
    .setTimestamp()

    if(msg.image) embed.setImage(msg.image)

    message.channel.send(embed)
    }
}
