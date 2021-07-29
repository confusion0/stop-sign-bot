const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 1000,
    module: "General",
    desc: "Shows the bot ping",
    example: [],
    run: async(client, message, args) => {


        const ping = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('🏓 Ping')
        .addField('API Latency', `\`${client.ws.ping}ms\``)
        .addField('Latency', `\`${Date.now() - message.createdTimestamp}ms\``)
        


        message.channel.send(ping);
    }
}
