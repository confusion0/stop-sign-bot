module.exports = {
    name: 'resume',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "Music",
    desc: "Resumes the queue",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    client.player.resume(message);

    message.inlineReply(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} **resumed** !`);
    }
};
