const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  name: 'purge',
  aliases: [],
  reqPerm: "MANAGE_MESSAGES",
  args: "<amount>",
  cooldown: 2000,
  desc: "Purges a certain number of messages.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.inlineReply(`${client.emotes.error} You need to have the manage messages permissions to use this command!.`);
    }
    if(!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
        return message.inlineReply(`${client.emotes.error} I do not have the manage messages permission. Please check my permissions`);
    }
        const amount = args.join(" ");

        if(!amount) return message.inlineReply(`${client.emotes.error} please provide an amount of messages for me to delete`)

        if(amount > 100) return message.inlineReply(`${client.emotes.error} you cannot clear more than 100 messages at once`)

        if(amount < 1) return message.inlineReply(`${client.emotes.error} you need to delete at least one message`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages)});


    return message.inlineReply(`${client.emotes.success} Purged ${amount} messages!`)
    }
}
