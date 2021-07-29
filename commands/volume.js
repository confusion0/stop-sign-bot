module.exports = {
    name: 'volume',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 10000,
    module: "Music",
    desc: "Changes the volume",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    if (!args[0]) return message.inlineReply(`${client.emotes.error} - Please enter a number !`);

    if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.inlineReply(`${client.emotes.error} - Please enter a valid number (between 1 and 100) !`);

    if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',')) return message.inlineReply(`${client.emotes.error} - Please enter a valid number !`);

    client.player.setVolume(message, parseInt(args[0]));

    message.inlineReply(`${client.emotes.success} - Volume set to **${args.join(" ")}%** !`);
    }
};
