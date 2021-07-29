module.exports = {
    name: 'ban',
    aliases: [],
    reqPerm: "BAN_MEMBERS",
    args: "<member | member id>",
    cooldown: 1000,
    module: "Moderation",
    desc: "Ban a member.",
    example: [],
    run: async(client, message, args) => {
   
    if(!message.channel.permissionsFor(message.guild.me).has("BAN_MEMBERS")) {
        return message.inlineReply(`${client.emotes.error} I do not have the ban members permission. Please check my permissions`);
    }
        
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!target) {
        return message.inlineReply(`${client.emotes.error} Please enter a valid user to ban`);
    }
   
    const memberTarget = message.guild.members.cache.get(target.id);
    memberTarget.ban();
    message.inlineReply(`${client.emotes.success} ${target} has been banned`);       
    }
}
