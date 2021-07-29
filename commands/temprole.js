const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'temprole',
    aliases: [],
    reqPerm: "MANAGE_ROLES",
    args: "<time> <member | member id> <role | role id>",
    cooldown: 1000,
    module: "Roles",
    desc: "Gives a role to a member for a duration.",
    example: [],
    run: async(client, message, args) => {

    if(!message.channel.permissionsFor(message.guild.me).has('MANAGE_ROLES')) {
    return message.inlineReply(`${client.emotes.error} I do not have the manage roles permission. Please check my permissions`);
}

        if (!args[0] || !args[1] || !args[2]) return message.inlineReply(`${client.emotes.error} Incorrect usage. The correct usage, its < Time | Member mention | Role mention/id >`)

        try {

             const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
             const roleName = message.guild.roles.cache.find(r => (r.name === args[2].toString()) || (r.id === args[2].toString().replace(/[^\w\s]/gi, '')));

             const alreadyHasRole = member._roles.includes(roleName.id);

             if (alreadyHasRole) return message.inlineReply(`${client.emotes.error} User already has that role`)

             let Timer = args[0];

            if(!args[0] || isNaN(ms(Timer))){
                return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
            }
            
              if(!args[0]){
                return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
              }
      
        if(args[0] <= 0){
          return message.inlineReply(`${client.emotes.error} Please Enter a time period followed by s or m or h`);
        }

        
        member.roles.add(roleName);
        const temproleembed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Success!')
        .setDescription(`${client.emotes.success} ${member} has been given the ${roleName} role for ${ms(ms(Timer), {long: true})}`)
        message.inlineReply(temproleembed)
      
        setTimeout(function(){
          member.roles.remove(roleName);
        }, ms(Timer));
        } catch (e) {
            return message.inlineReply(`${client.emotes.error} Try to give a role that exists next time...`).then(() => console.log(e))
        }
    }
}
