  
module.exports = {
    name: 'shuffle',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 10000,
    module: "Music",
    desc: "Shuffles the queue",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    client.player.shuffle(message);

    return message.inlineReply(`${client.emotes.success} - Queue shuffled **${client.player.getQueue(message).tracks.length}** song(s) !`);
    }
};
