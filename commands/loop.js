module.exports = {
    name: 'loop',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 10000,
    module: "Music",
    desc: "Loops the music",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.inlineReply(`${client.emotes.success} - Repeat mode **disabled** !`);
    } else {
        client.player.setRepeatMode(message, true);
        return message.inlineReply(`${client.emotes.success} - Repeat mode **enabled** !`);
    };
    }
};
