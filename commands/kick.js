module.exports = {
  name: 'kick',
  aliases: [],
  reqPerm: "KICK_MEMBERS",
  args: "<mention or id>",
  cooldown: 2000,
  desc: "Kicks a member.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {

    if(!message.channel.permissionsFor(message.guild.me).has("KICK_MEMBERS")) {
        return message.inlineReply(`${client.emotes.error} I do not have the kick members permission. Please check my permissions`);
    }
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    
    if(!user) return message.inlineReply(`${client.emotes.error} Please provide a member to kick`);

        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.inlineReply(`${client.emotes.success} ${target} has been kicked`);
        }else{
            message.inlineReply(`${client.emotes.error} This user can\'t be kicked.`);
        }
    }
}
