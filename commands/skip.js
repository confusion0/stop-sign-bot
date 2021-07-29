module.exports = {
    name: 'skip',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "Music",
    desc: "Skips the current song",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    client.player.skip(message);

    message.inlineReply(`${client.emotes.success} - The current music has just been **skipped** !`);
    }
};
