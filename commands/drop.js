const { MessageEmbed } = require('discord.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const ms = require('ms');

module.exports = {
  name: 'drop',
  aliases: [],
  reqPerm: "NONE",
  args: "<prize>",
  cooldown: 10000,
  module: "Giveaway",
  desc: "Drop a prize",
  example: [],
  run: async(client, message, args) => {
  let guild = message.guild
    const grole = await client.gData.get(`${guild.id}:grole`)
    
    // If the member doesn't have enough permissions
    if(!(message.member.roles.cache.get(grole) || message.member.roles.cache.some((r) => r.name === "Giveaways"))){
    return message.inlineReply(`${client.emotes.error} You need to have the the Giveaways role to start giveaways.`);
}

var secs = args[0];

var timeoutMins = args[0];

// If the duration isn't valid
if(!secs || isNaN(ms(secs))){
    return message.channel.send(`${client.emotes.error} You have to specify a valid duration!`);
}

    const prize = args.slice(1).join(' ');
    if(!prize){
        return message.channel.send('Please provide a prize!')
    }

    var alt = Math.floor(20000 + Math.random()*5000)

    const dropSpeed = alt/secs
    
    const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle("✈️ An Airdrop Apeared!")
    .setDescription(`Airdrop Altitude: ${Math.floor(alt)}m \nEstimated Drop Time Left: ${secs} seconds`)

    const airdrop = await message.inlineReply(embed)
    for(; secs > 0; secs -= 1){
      alt -= dropSpeed
      await sleep(5000)
      embed.setDescription(`Airdrop Altitude: ${Math.floor(alt)}m \nEstimated Drop Time Left: ${secs} secs`)
      airdrop.edit(embed)
    }


    
    embed.setTitle("The Airdrop Has Landed!")
    .setDescription("First one to react with 📥 below gets **" + prize + "**")

    await airdrop.edit(embed)
    airdrop.react('📥')

    const filter = (reaction, user) => {
      return !user.bot && reaction.emoji.name === '📥'
    };

    let winner = false

    const collector = airdrop.createReactionCollector(filter, { time: timeoutMins*60*1000 });

    collector.on('collect', (reaction, user) => {
      winner = user
      collector.stop()
    });

    collector.on('end', collected => {
      embed.setTitle("Airdrop Ended")
      if(!winner) {
        embed.setDescription("Nobody Claimed the Airdrop. Airdrop was airlifted back to base.")
      }
      else {
        embed.setDescription(`${winner} claimed ${message.author}'s airdrop. **${winner.tag}** has won **${prize}**`)
      }
      airdrop.edit(embed) 
    });
  }
}

function randomEmoji() {
  var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋'];
  return selectFruit[Math.floor(Math.random() * selectFruit.length)];
}
