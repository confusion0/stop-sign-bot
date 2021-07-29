const ms = require('ms');

module.exports = {
  name: 'tempmute',
  aliases: [],
  reqPerm: "KICK_MEMBERS",
  args: "<time> <member | member id>",
  cooldown: 2000,
  desc: "Mutes a member for a duration.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
    let guild = message.guild
  
if(!message.channel.permissionsFor(message.guild.me).has("MANAGE_ROLES")) {
        return message.inlineReply(`${client.emotes.error} I do not have the manage roles permission. Please check my permissions`);
    }
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    
            if(!user) message.inlineReply(`${client.emotes.error} Incorrect usage. The correct usage, its < Time | Member mention >`);
    
            if(user === message.author.id) return message.inlineReply(`${client.emotes.error} You cannot mute yourself you imbecile`);
    
            const muterole = await client.gData.get(`${guild.id}:asrole`)
      
            let role = message.guild.roles.cache.find(r => r.name === "Muted" || r.id === muterole)
    
            if(!role) return message.inlineReply(`${client.emotes.error} Cannot find the muted role. Make a role call Muted.`);

            let Timer = args[0];

            if(!args[0] || isNaN(ms(Timer))){
                return message.inlineReply(`${client.emotes.error} Incorrect usage. The correct usage, its < Time | Member mention >`);
            }
            
              if(!args[0]){
                return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
              }
      
        if(args[0] <= 0){
          return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
        }

        try {
        user.roles.add(role);
        message.inlineReply(`${client.emotes.success} ${user} has been muted for ${ms(ms(Timer), {long: true})}, ${message.author}.`)
      
        setTimeout(function(){
          message.channel.send(`${client.emotes.success} ${user} has been unmuted, ${message.author}.`)
          user.roles.remove(role);
    
        }, ms(Timer));
        } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
      }
    
    }
}
