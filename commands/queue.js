module.exports = {
    name: 'queue',
    aliases: ['q'],
    reqPerm: "NONE",
    args: "",
    cooldown: 5000,
    module: "Music",
    desc: "Shows the server queue",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No songs currently playing !`);

    message.inlineReply(`**Server queue - ${message.guild.name} ${client.emotes.queue}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
    }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));
    }
};
