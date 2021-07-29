const { MessageEmbed } = require("discord.js")
const ms = require('ms')

module.exports = {
    name: 'giveawayedit',
    aliases: ['gedit', 'giveaway-edit'],
    reqPerm: "NONE",
    args: "<giveaway message id>",
    cooldown: 10000,
    module: "Giveaway",
    desc: "Edit a giveaway on the server",
    example: [],
    run: async(client, message, args) => {


        let guild = message.guild
        const grole = await client.gData.get(`${guild.id}:grole`)

        if(!(message.member.roles.cache.get(grole) || message.member.roles.cache.some((r) => r.name === "Giveaways"))){
            return message.channel.send(`${client.emotes.error} You need to have the the Giveaways role to edit giveaways.`);
        }

        if(!args[0]){
            return message.channel.send(`${client.emotes.error} You have to specify a valid message ID!`);
        }

        let giveaway = 
        // Search with giveaway prize
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway){
            return message.channel.send(`${client.emotes.error} Unable to find a giveaway for \`` + args.join(' ') + '\`');
        }

        message.channel.send(`🎉 Please respond to this message with the new giveaway prize. You can respond with \`cancel\` to cancel the giveaway editor. More giveaway options will be available to edit later on.`)

        let filter = (m) => m.author.id === message.author.id
        const collector = message.channel.createMessageCollector(filter, {time: 30000});

        const steps = 2
    
        let giveawayPrize = "none", giveawayDuration = "none"
        let step = 0
        let messages = []
        let cancelled = true

        collector.on('collect', async m => {
            if(m.author.bot) return
            if(m.author != message.author) return 
      
            messages.push(m)
      
            if((m.content).trim().toLowerCase() == "cancel"){ 
              return collector.stop()
            }
            
            if(step == 0){
                giveawayPrize = (m.content).trim()
                if(!giveawayPrize){
                  return message.channel.send(`${client.emotes.error} You have to specify a valid prize!`);
                }
                if(giveawayPrize.length > 1024) {
                    return message.channel.send(`${client.emotes.error} The new prize must be less than 1024 characters`)
                }
                await message.channel.send(`🎉 Sweet! Now, how much time should be added to the giveaway? (Example: \`2s (2 seconds)\`). You can type \`cancel\` to cancel the giveaway editor. (Step ${step+1} of ${steps})`)
            }

            if(step == 1){
                giveawayDuration = (m.content).trim()
                if(!giveawayDuration || isNaN(ms(giveawayDuration))){
                    return message.channel.send(`${client.emotes.error} You have to specify a valid duration!`)
                }
            }
      
            step += 1
      
            if(step >= steps){
              cancelled = false
              return collector.stop()
            }
          });
      
          collector.on('end', async collected => {
            if(cancelled){
              return message.channel.send(`${client.emotes.success} The giveaway editor has been cancelled.`)
            }
            
            client.giveawaysManager.edit(giveaway.messageID, {
                addTime: ms(giveawayDuration),
                newPrize: giveawayPrize
            })
            // Success message
            .then(() => {
                message.channel.send(`${client.emotes.success} The giveaway has been edited successfully.`);
            })
            .catch((error) => {
                message.channel.send(`${client.emotes.error} An error occured while editing this giveaway! ERROR: \`\`\`${error}\`\`\``)
            });
        })    
    }
}
