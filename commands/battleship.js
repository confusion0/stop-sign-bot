const Discord = require('discord.js')
const { DiscordBattleShip } = require("discord-battleship");

module.exports = {
    name: 'battleship',
    aliases: [],
    reqPerm: "NONE",
    args: "<member>",
    desc: "Play a game of battleship!",
    module: "Fun",
    example: [],
    cooldown: 10000,
    run: async(client, message, args) => {
        if (!args[0]) {
            return message.channel.send(`${client.emotes.error} Incorrect Syntax! Please mention a user or user id!`)
        }
        
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix

        if (!member) {
            return message.channel.send(`${client.emotes.error} Incorrect Syntax! Please mention a user or user id!`)
        }
        if (member.id === message.author.id) {
            return message.channel.send(`${client.emotes.error} Incorrext Syntax! You cannot duel yourself!`)
        }
        if (member.bot) {
            return message.channel.send(`${client.emotes.error} You cannot duel a bot`)
        }
        
        const BattleShip = new DiscordBattleShip({
            embedColor: "BLUE", 
            prefix: prefix, 
        });

        await BattleShip.createGame(message);
    }
}
