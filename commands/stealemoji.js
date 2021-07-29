const Discord = require('discord.js');
const { Util, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stealemoji',
  aliases: ['stealmoji', 'steal-emoji'],
  reqPerm: "MANAGE_EMOJIS",
  args: "<emoji(s)>",
  cooldown: 5000,
  module: "Fun",
  desc: "Steal an emoji from another server.",
  example: [],
  run: async(client, message, args) => {

        if(!args.length) return message.inlineReply(`${client.emotes.error} Please specify some emojis`)

        if(args.length > 5) return message.inlineReply(`${client.emotes.error} Please send 5 or less emojis`)

        for (const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {
                try {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis
                    .create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`${client.emotes.add} Added: \`${emoji.url}\``));
                } catch(error) {
                    message.channel.send(`${client.emotes.error} An error occured while adding the emoji! ERROR: \`\`\`${error}\`\`\``)
                }
            } 
        }
    }
}
