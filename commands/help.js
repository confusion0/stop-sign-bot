const pagination = require('discord.js-pagination');
const path = require('path')
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms');

var configs = [
    { title: 'Fun',
    name: 'Fun',
    run: async (client, message, args) => {
        let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
        const funembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Fun')
        .setDescription(`The prefix is \`\`${prefix}\`\``)
        .addField('`ping`', 'Shows the bot ping', true)
        .addField('`snipe`', 'Shows a recently deleted message', true)
        .addField('`esnipe`', 'Shows a recently edited message', true)
        .addField('`customembed`', 'Creates a custom embed', true)
        .addField('`meme`', 'Shows a meme', true)
        .addField('`tictactoe`', 'Play tic-tac-toe with some friends', true)
        .addField('`blackjack`', 'Play a friendly game of blackjack', true)
        .addField('`stealemoji`', 'Steal an emoji from another server', true)
        .addField('`battleship`', 'Play a game of battleship', true)
        .addField('`rockpaperscissors`', 'Play a game of rock paper scissors')
        .setTimestamp()

        message.inlineReply(funembed)

    }
},

{ title: 'Info',
name: 'Info',
run: async (client, message, args) => {
let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
    const infoembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Info')
        .setDescription(`The prefix is \`\`${prefix}\`\``)
        .addField('`whois`', 'See info on a member', true)
        .addField('`serverinfo`', 'See info on the server', true)
        .addField('`weather`', 'See the weather for a place in the world', true)
        .addField('`covid`', 'See the covid cases for a country', true)
        .addField('`membercount`', 'Shows the member count of the server', true)
        .addField('`vote`', 'Vote for the bot', true)
        .addField('`memberleaderboard`', 'Shows the member join leaderboard', true)
        .addField('`statistics`', 'Shows statistics for the bot.', true)
        .setTimestamp()

        message.inlineReply(infoembed)
    }
},

{ title: 'Moderation',
name: 'Moderation',
run: async (client, message, args) => {
    let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
    const moderationembed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Moderation')
    .setDescription(`The prefix is \`\`${prefix}\`\``)
    .addField('`ban`', 'Ban a member', true)
    .addField('`kick`', 'Kick a member', true)
    .addField('`unban`', 'Unban a banned member', true)
    .addField('`mute`', 'Mute a member', true)
    .addField('`tempmute`', 'Temporarily mute a member', true)
    .addField('`unmute`', 'Unmute a muted member', true)
    .addField('`slowmode`', 'Set the slowmode for the channel', true)
    .addField('`lock`', 'Lock a channel', true)
    .addField('`unlock`', 'Unlock a channel', true)
    .addField('`tempunlock`', 'Temporarily unlock a channel', true)
    .addField('`templock`', 'Temporarily lock a channel', true)
    .addField('`purge`', 'Mass delete messages', true)
    .addField('`nuke`', 'Nuke a channel', true)
    .addField('`decancer`', 'Decancer a nickname', true)
    .setTimestamp()

    message.inlineReply(moderationembed)
    }
},

{ title: 'Roles',
name: 'Roles',
run: async (client, message, args) => {
    let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
    const roleembed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Role management')
    .setDescription(`The prefix is \`\`${prefix}\`\``)
    .addField('`role create`', 'Create a role', true)
    .addField('`role delete`', 'Delete a role', true)
    .addField('`removerole`', 'Remove a role from a member', true)
    .addField('`giverole`', 'Give a role to a member', true)
    .addField('`temprole`', 'Temporarily give a role to a member', true)
    .addField('`rolelock`', 'Lock a channel for a certain role', true)    
    .addField('`roleunlock`', 'Unlock a channel for a certain role', true)    
    .addField('`roleinfo`', 'Shows info on a role', true)    
    .addField('`reactionroleadd`', 'Creates a reaction role', true)
    .addField('`reactionroledelete`', 'Deletes the reaction roles', true)
    .addField('`reactionrolepanel`', 'Displays the reaction roles', true)
    .setTimestamp()

    message.inlineReply(roleembed)
    }
},

{ title: 'Music',
name: 'Music',
run: async (client, message, args) => {
    let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
    const musicembed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Music')
    .setDescription(`The prefix is \`\`${prefix}\`\``)
    .addField('`clearqueue`', 'Clears the queue', true)
    .addField('`loop`', 'Loops the current playlist', true)
    .addField('`np`', 'Shows the current song', true)
    .addField('`pause`', 'Pauses the playlist', true)
    .addField('`play`', 'Plays a song', true)
    .addField('`queue`', 'Shows the current queue', true)
    .addField('`resume`', 'Resumes the paused playlist', true)
    .addField('`shuffle`', 'Shuffles the queue', true)
    .addField('`skip`', 'Skips the current song', true)
    .addField('`stop`', 'Stops the music', true)
    .addField('`volume`', 'Changes the volume', true)
    .setTimestamp()

    message.inlineReply(musicembed)
    }
},

{ title: 'Giveaways',
name: 'Giveaways',
run: async (client, message, args) => {
    let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix
const giveawayembed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Giveaways')
        .setDescription(`The prefix is \`\`${prefix}\`\``)
        .addField('`giveaway`', 'Create a giveaway', true)
        .addField('`giveaway2`', 'Starts a custom giveaway constuctor/creator. (interactive)', true)
        .addField('`reroll`', 'Reroll a giveaway', true)
        .addField('`end`', 'End a giveaway', true)
        .addField('`giveawaydelete`', 'Delete a giveaway on the server', true)
        .addField('`giveawayedit`', 'Edit a giveaway on the server', true)
        .addField('`drop`', 'Creates a small giveaway drop', true)
        .setTimestamp()

    message.channel.send(giveawayembed)
    }
}


]

module.exports = {
    name: 'help',
    aliases: [],
    reqPerm: "NONE",
    args: "[command]",
    cooldown: 3000,
    module: "General",
    desc: "Shows all the commands and how to use them.",
    example: [],
    run: async(client, message, args) => {
    
        //Sort your commands into categories, and make seperate embeds for each category

        const addInfo = `
[Invite the Bot](https://discord.com/api/oauth2/authorize?client_id=823568726372253716&permissions=8&scope=bot%20applications.commands)
[Join the Support Server](https://discord.gg/e4fxq8vCfM)
[Check out Groot Bot](https://top.gg/bot/812395879146717214)
`

        let prefix = await client.gData.get(`${message.guild.id}:prefix`) || client.config.prefix

        const home = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(
            `${message.author.username}`,
            message.author.displayAvatarURL()
        )
        .setTitle('Help panel')
        .setDescription(
            `
            \`\`\`- [] = optional argument 
- <> = required argument
Type ${prefix}help [category || command] for more help on a specific category or command!\`\`\`
            `
        )
        .addField("Fun commands", `\`\`\`${prefix}help fun\`\`\``, true)
        .addField("Info commands", `\`\`\`${prefix}help info\`\`\``, true)
        .addField("Moderation commands", `\`\`\`${prefix}help moderation\`\`\``, true)
        .addField("Role commands", `\`\`\`${prefix}help roles\`\`\``, true)
        .addField("Music commands", `\`\`\`${prefix}help music\`\`\``, true)
        .addField("Giveaway commands", `\`\`\`${prefix}help giveaways\`\`\``, true)
        .addField("Additional Information", addInfo)

        const embed = new MessageEmbed()
        let input = "NONE"
        let modules = []
        embed.setColor('BLUE')
        embed.setTitle("Help panel")
        embed.setDescription(
            `
            \`\`\`- [] = optional argument 
- <> = required argument
Type ${prefix}help [category || command] for more help on a specific category or command!\`\`\`
            `
        )
        embed.addFields(
            { name: 'Available Commands', value: input}
        )
      
        client.commands.forEach(command => {
        const filepath = client.commandFiles.find(filepath => filepath.includes(command.name))
        if(!filepath) return
        
        const module = getModuleFromPath(filepath)
        
        if(module == "Secret") return
        
        var field = embed.fields.find(c => c.name === 'Available Commands')
        
        if(!field) {
          embed.addField(module, 'NONE')
          field = embed.fields.find(field => field.name == module)
        }
        if(field.value == "NONE") field.value = '`'+ command.name +'`'
        else field.value += `, \`${command.name}\``
        })

        embed.addField("Additional Information", addInfo)

        const pages = [
                home,
                embed
        ]

        const emojiList = ["⏪", "⏩"];

        let timeout = 60000

            if(!args[0]){
                return pagination(message, pages, emojiList, timeout)
            } else {
                for(config of configs){
                    if(args[0].toLowerCase() == config.name.toLowerCase()) return config.run(client, message, args.slice(1))
                }
            
            const embed = new MessageEmbed();

            let serverprefix = await client.gData.get(`${message.guild.id}:prefix`)
            if(!serverprefix) serverprefix = client.config.prefix

            var command = client.commands.get(args[0].toLowerCase())

            if( !command ) client.commands.forEach( $command => { $command.aliases.forEach( alias => { if(alias == args[0].toLowerCase()) command = $command } ) } )

            if(!command) return message.inlineReply(`${client.emotes.error} I could not find a category or command with that name.`)
            embed.setColor('BLUE')
            embed.setTitle(`Command Information - ${command.name}`)
            embed.setDescription("```<> means required, and [] means optional```")
            embed.addField("Description: ", `\`\`\`${command.desc}\`\`\``)
            embed.addField("Usage: ", `\`\`\`${serverprefix}${command.name} ${command.args}\`\`\``)
            if(command.aliases.length > 0) embed.addField("Aliases: ", `\`\`\`${command.aliases.join(", ")}\`\`\``)
            if(command.reqPerm != "NONE") embed.addField("Required Permissions: ", `\`\`\`${command.reqPerm}\`\`\``)
            if(command.example.length > 0) {
            var examples = ""
            command.example.forEach(example => {
            examples += ( serverprefix + command.name + " " + example + ", ")
            })
            examples.substring(0, examples.length-2)
            embed.addField('Examples', `\`\`\`${examples}\`\`\``)
            }
            if(command.cooldown) embed.addField('Cooldown: ', `\`\`\`${command.cooldown}\`\`\``)
            message.inlineReply(embed)
        }
    }
}

const getModuleFromPath = (filepath) => {
    const splited = filepath.split(path.sep)
    return splited[splited.length-2]
  }
