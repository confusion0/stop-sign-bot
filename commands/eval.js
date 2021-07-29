const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'eval',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<code>",
  desc: "Runs the specified code.",
  module: "Secret",
  example: ['message.channel.name'],
  cooldown: 1000,
  run: async(client, message, args) => {
    if(!client.ADMINS.find(admin => admin.ID === message.author.id)){
        return message.channel.send(`${client.emotes.error} You are not an admin. You cannot use the command.`)
      }
        const embed = new MessageEmbed()
            .setColor('0x2F3136')
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .setColor('0x2F3136')
                .setTitle('Output: ')
                .setDescription(await data)
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                const embed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('Output: ')
                                .setDescription(data)
                                msg.edit(embed)
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle(`ERROR`)
                .setColor('0x2F3136')
                .setDescription(`\`\`\`${error}\`\`\``)
            return await msg.edit(embed);

        }
    }
}
