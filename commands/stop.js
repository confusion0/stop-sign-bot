  
module.exports = {
    name: 'stop',
    aliases: [],
    reqPerm: "NONE",
    args: "",
    cooldown: 10000,
    module: "Music",
    desc: "Stops the music",
    example: [],
    run: async(client, message, args) => {

    if (!message.member.voice.channel) return message.inlineReply(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.inlineReply(`${client.emotes.error} - No music currently playing !`);

    client.player.setRepeatMode(message, false);
    client.player.stop(message);

    message.inlineReply(`${client.emotes.success} - Music **stopped** into this server !`);
    }
};
