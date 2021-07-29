module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    reqPerm: "NONE",
    args: "<text>",
    cooldown: 10000,
    module: "Music",
    desc: "Clear the queue",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    client.player.clearQueue(message);

    message.inlineReply(`${client.emotes.success} - The queue has just been **removed** !`);
    }
};
