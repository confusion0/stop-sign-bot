module.exports = (client, message, queue) => {

    message.channel.send(`${client.emotes.error} - Music stopped because there are no more members in the voice channel !`);

};
