module.exports = {
  name: 'unmute',
  aliases: [],
  reqPerm: "KICK_MEMBERS",
  args: "<member | member id>",
  cooldown: 2000,
  desc: "Unmutes a member.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
    let guild = message.guild
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    const muterole = await client.gData.get(`${guild.id}:asrole`)
      
    let role = message.guild.roles.cache.find(r => r.name === "Muted" || r.id === muterole)

    if(!user) {
        return message.inlineReply(`${client.emotes.error} Please mention a user to unmute`)
    }
    
    if(user.roles.cache.has(role)) return message.channel.send(`${client.emotes.error} This member isn't muted`);
    try {
    user.roles.remove(role);
    
    message.channel.send(`${client.emotes.success} ${user} has been unmuted`)
    } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
      }
    }
}
