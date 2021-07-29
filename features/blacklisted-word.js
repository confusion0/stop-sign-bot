const { blacklistedWords } = require('../collections/blacklist.js');

module.exports = {
    name: 'blacklisted-word',
    run: async(client, message, args) => {

    client.on('message', async (message) => {
        const { guild } = message

        if(!guild) return
        if(message.partial) return
        if(!message.author.id === client.user.id) return
        if(message.author.bot) return

        const splittedMsgs = message.content.split(' ');

        let deleting = false;

        await Promise.all(
            splittedMsgs.map((content) => {
                if (blacklistedWords
                    .get(message.guild.id)
                    ?.includes(content.toLocaleLowerCase())
                )
                deleting = true;
            })
        )
        if (deleting) return message.delete();
        });
    }
}