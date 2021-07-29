const ms = require('ms');
const { MessageEmbed } = require('discord.js')

colors = [
  "DEFAULT", 
  "WHITE",
  "AQUA",
  "GREEN",
  "BLUE",
  "YELLOW",
  "PURPLE",
  "LUMINOUS_VIVID_PINK",
  "GOLD",
  "ORANGE",
  "RED",
  "GREY",
  "DARKER_GREY",
  "NAVY",
  "DARK_AQUA",
  "DARK_GREEN",
  "DARK_BLUE",
  "DARK_PURPLE",
  "DARK_VIVID_PINK",
  "DARK_GOLD",
  "DARK_ORANGE",
  "DARK_RED",
  "DARK_GREY",
  "LIGHT_GREY",
  "DARK_NAVY",
  "BLURPLE",
  "GREYPLE",
  "DARK_BUT_NOT_BLACK",
  "NOT_QUITE_BLACK",
  "RANDOM"
]

module.exports = {
  name: 'giveaway2',
  aliases: ['gcreate'],
  reqPerm: "NONE",
  args: "",
  cooldown: 3000,
  desc: "Starts a custom giveaway constuctor/creator. (interactive)",
  example: [],
  run: async(client, message, args) => {
    let guild = message.guild
    const grole = await client.gData.get(`${guild.id}:grole`)
    
    // If the member doesn't have enough permissions
    if(!(message.member.roles.cache.get(grole) || message.member.roles.cache.some((r) => r.name === "Giveaways"))){
        return message.channel.send(`${client.emotes.error} You need to have the the Giveaways role to start giveaways.`);
    }

    const filter = m => m.content.includes("");
    const collector = message.channel.createMessageCollector(filter, {time: 500000});

    const steps = 4
    
    let giveawayChannel = "none", giveawayDuration = "none", giveawayNumberWinners = "none", giveawayPrize = "none"
    let step = 0
    let messages = []
    let cancelled = true

    
    await message.channel.send(`🎉 Ok! Let's start your giveaway! First, What channel do you want the giveaway to be in? (Example: \`${message.channel}\`). You can type \`cancel\` to cancel the giveaway setup. (Step ${step+1} of ${steps})\n\n\`Mention a channel in this server. You can type current for this channel.\``)

    collector.on('collect', async m => {
      if(m.author.bot) return
      if(m.author != message.author) return 

      messages.push(m)

      if((m.content).trim().toLowerCase() == "cancel"){ 
        return collector.stop()
      }

      if(step == 0){
        giveawayChannel = (m.content).trim()
        if(!(giveawayChannel === "current" || giveawayChannel.startsWith("<#") && giveawayChannel.endsWith(">"))){
            return message.channel.send(`${client.emotes.error} You have to mention a valid channel or type current in the chat!`)
        }
        if(giveawayChannel.toLowerCase() === "current") giveawayChannel = message.channel
        else giveawayChannel = getChannelFromMention(client, message, giveawayChannel)

        await message.channel.send(`🎉 Alright, the giveaway will start in ${giveawayChannel}! Now, what should the giveaway duration be? (Example: \`2s (2 seconds)\`). You can type \`cancel\` to cancel the giveaway setup. (Step ${step+1} of ${steps})`)
      }
      if(step == 1){
        giveawayDuration = (m.content).trim()
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return message.channel.send(`${client.emotes.error} You have to specify a valid duration!`)
        }
        await message.channel.send(`🎉 Nice! The giveaway will last ${ms(ms(giveawayDuration), {long: true})}! Then, what should the amount of winners be? (Example: \`1 (1 winner)\`). You can type \`cancel\` to cancel the giveaway setup. (Step ${step+1} of ${steps})`)
      }
      if(step == 2){
        giveawayNumberWinners = (m.content).trim()
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return message.channel.send(`${client.emotes.error} You have to specify a valid number of winners!`);
        }
        await message.channel.send(`🎉 Excellent! The giveaway will have ${giveawayNumberWinners} winners! Finally, what should the prize that you are giving away be? (Example: \`Nitro\`). You can type \`cancel\` to cancel the giveaway setup. (Step ${step+1} of ${steps})`)
      }
      if(step == 3){
        giveawayPrize = (m.content).trim()
        if(!giveawayPrize){
            return message.channel.send(`${client.emotes.error} You have to specify a valid prize!`);
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
        return message.channel.send(`${client.emotes.success} Giveaway creation cancelled.`)
      } 
	    
        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            time: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: parseInt(giveawayNumberWinners),
            // Who hosts this giveaway
            hostedBy: client.config.hostedBy ? message.author : null,
            // Messages
	    lastChance: {
              enabled: true,
              content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
              threshold: 30000,
              embedColor: 'YELLOW'
            },
            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "🎉 Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                } 
            }
        })
	
	message.channel.send(`🎉 Sweet! A giveaway started in ${giveawayChannel} for ${giveawayPrize}, lasting ${ms(ms(giveawayDuration), {long: true})} and with ${giveawayNumberWinners} winners!`)
      })
    }
}

function getChannelFromMention(client, message, mention) {
	if (!mention) return;

	if (mention.startsWith('<#') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('#')) {
			mention = mention.slice(1);
		}

		return message.guild.channels.cache.get(mention);
  }
}
