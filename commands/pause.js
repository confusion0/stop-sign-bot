module.exports = {
    name: 'pause',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "Music",
    desc: "Pauses the queue",
    example: [],
    run: async(client, message, args) => {


    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    client.player.pause(message);

    message.inlineReply(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} **paused** !`);
    }
};
