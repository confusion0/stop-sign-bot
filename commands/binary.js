const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'binary',
    aliases: [],
    reqPerm: "BOT_ADMIN",
    args: "<decode | encode> <text>",
    desc: "Runs the specified code.",
    module: "Secret",
    example: ['encode hi'],
    cooldown: 1000,
    run: async(client, message, args) => {

 let word;
if(!args[0]) return message.channel.send("Please specify whether you want to `encode` or `decode`")
if(args[0].toLowerCase() === "encode") {
  word = args.slice(1).join(" ")
   if(!args[1]) return message.reply('Please provide some text to encode!')
   const data = await fetch(`https://api.popcatdev.repl.co/encode?text=${encodeURIComponent(word)}`)
   const json = await data.json();
   let embed = new Discord.MessageEmbed()
   .setTitle("Binary Converter Machine")
   .addField('Text', `\`\`\`yaml\n${args.slice(1).join(" ")}\`\`\``)
   .addField('Binary', `\`\`\`yaml\n${json.binary}\`\`\``)
   .setColor("BLUE")
   message.channel.send(embed)
} else if(args[0].toLowerCase() === "decode") {
  word = args.slice(1).join(" ")
   if(!args[1]) return message.reply('Please provide some binary numbers to decode!')
   let arr = ["0","1"]
   for (let i in arr) {
     if (!word.includes(arr[i])) return message.reply("These are not valid binary numbers!")
   }
   const data = await fetch(`https://api.popcatdev.repl.co/decode?binary=${encodeURIComponent(word)}`)
   const json = await data.json();
   
   let embed = new Discord.MessageEmbed()
   .setTitle("Binary Converter Machine")
   .addField('Binary', `\`\`\`yaml\n${args.slice(1).join(" ")}\`\`\``)
   .addField('Text', `\`\`\`yaml\n${json.text}\`\`\``)
   .setColor("BLUE")
   message.channel.send(embed)
} else {
  message.reply('1st argument must be either `encode` or `decode`')
}
  }
}