module.exports = {
    name: 'mute',
    aliases: [],
    reqPerm: "KICK_MEMBERS",
    args: "<member | member id> [reason]",
    cooldown: 2000,
    desc: "Mutes a member.",
    example: [],
    module: "Moderation",
    run: async(client, message, args) => {
              let guild = message.guild
      
              let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      
              if(!user) return message.inlineReply(`${client.emotes.error} This user can't be found anywhere in this server`);
      
              if(user === message.author.id) return message.inlineReply(`${client.emotes.error} You cannot mute yourself you imbecile`);
      
              const muterole = await client.gData.get(`${guild.id}:asrole`)
      
              let role = message.guild.roles.cache.find(r => r.name === "Muted" || r.id === muterole)
      
              if(!role) return message.inlineReply(`${client.emotes.error} Cannot find the muted role. Make a role call Muted.`);
      
              let reason = args.slice(1).join(" ");
              if(reason === null) reason = "Unspecified"
              try {
              user.roles.add(role);
      
              await message.inlineReply(`${client.emotes.success} ${user} has been muted for the following reason: ${reason}`)
      
              user.send(`Hello there. You have been muted from ${message.guild.name} for the following reason: ${reason}`);
              } catch(error) {
              message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
          }
      }
  }
