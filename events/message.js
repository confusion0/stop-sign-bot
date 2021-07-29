const ms = require('ms');

const fs = require("fs")

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const command_cooldowns = new Map()

const Discord = require('discord.js')

module.exports = async (client, message) => {
      if (!message.guild) return;
      if (message.author.bot) return;

      let user = message.author
      
      let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
      
      if(message.content.startsWith('<@') && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) return message.inlineReply(`My prefix is ` + `\`${prefix}\``)

    // Ignore messages not starting with the prefix (in config.json)
      if (message.content.indexOf(prefix) !== 0) return;

       const args = message.content.slice(prefix.length).trim().split(/ +/g);

      const command1 = args.shift().toLowerCase();
  
      // Grab the command data from the client.commands Enmap
      var command = client.commands.get(command1.toLowerCase());

      if( !command ) client.commands.forEach( $command => { $command.aliases.forEach( alias => { if(alias == command1) command = $command } ) } )

      if(command){
        //Permmision Checking
        if(command.reqPerm == "BOT_ADMIN" && !client.ADMINS.find(admin => admin.ID === message.author.id)) return message.inlineReply("This command is reserved for bot admins only.")

        if(command.reqPerm != "BOT_ADMIN" && command.reqPerm != "NONE" && !message.member.hasPermission(command.reqPerm)) {
          if(!client.ADMINS.find(admin => admin.ID === message.author.id)) return message.channel.send(`You need \`${command.reqPerm}\` permmision to run this command.`)
          else message.channel.send(`Bot admin detected, bypassed \`${command.reqPerm}\` permmisions for ${message.author.tag}`)
        }

        //Cooldown Checking
        if(command.cooldown) {
          if(command_cooldowns.get(`${message.author.id}:${command.name}`))     return message.inlineReply(new Discord.MessageEmbed().setTitle('Cooldown Alert').setDescription(`The \`${command.name}\` command has a \`${command.cooldown/1000}s\` cooldown. You still have to wait \`${command_cooldowns.get(`${message.author.id}:${command.name}`)/1000}s\` until you can run the command again.`).setColor('BLUE'))
          else {
            if(!client.ADMINS.find(admin => admin.ID === message.author.id)) 

            var cooldown = command.cooldown
            command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown)

            var interval = setInterval(function(){
              command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown)
              cooldown -= 100
            }, 100)

            setTimeout(function(){
              clearInterval(interval)
              command_cooldowns.delete(`${message.author.id}:${command.name}`)
            }, command.cooldown)
          }
        }
        try {
            command.run(client, message, args);
        } catch(error) {
          message.channel.send(`An error occured when running this command! ERROR: \`\`\`${error}\`\`\`\nIf this error keeps showing up, report it in our support server (discord.gg/KP3wwvmwfM).`)
        }
      }
    }
