  
module.exports = {
    name: 'play',
    aliases: ['p'],
    reqPerm: "NONE",
    args: "<song | playlist>",
    cooldown: 5000,
    module: "Music",
    desc: "Plays a song",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!args[0]) return message.inlineReply(`${client.emotes.error} - Please indicate the title of a song !`);

    client.player.play(message, args.join(" "));
    }
};
