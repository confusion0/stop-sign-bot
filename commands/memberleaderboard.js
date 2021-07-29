const { ReactionPages }  = require('reconlx');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'memberleaderboard',
    aliases: ['memberlb', 'member-leaderboard', 'member-lb'],
    reqPerm: "MANAGE_GUILD",
    args: "",
    cooldown: 30000,
    desc: "Shows the member join leaderboard",
    example: [],
    run: async(client, message, args) => {
        const members = message.guild.members.cache
            .filter((m) => !m.user.bot)
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);

        const arrayOfMembers = members.array();
        const ids = [];
        arrayOfMembers.forEach((mem) => {
            ids.push(mem.user.id);
        })

        let index = 1;
        if(ids.length > 10) {
            const chunks = convertChunk(ids, 10);
            const arry = [];
            for (chunk of chunks) {
                const description = chunk.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
                arry.push(
                    new MessageEmbed()
                        .setTitle('Member join leaderboard in ' + message.guild.name)
                        .setDescription(description)
                        .setColor('BLUE')
                )
            }
            ReactionPages(message, arry, true)
        } else {
            const description = ids.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
            message.channel.send(
                new MessageEmbed()
                 .setTitle('Member join leaderboard in ' + message.guild.name)
                 .setDescription(description)
                 .setColor('BLUE')
            )
        }
    }
}

function convertChunk(arr, size) {
    const array = [];
    for (let i = 0; i < arr.length; i+= size) {
        array.push(arr.slice(i, i+size))
    }
    return array;
}
