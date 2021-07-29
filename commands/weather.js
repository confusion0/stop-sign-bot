const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
  name: 'weather',
  aliases: ['w'],
  reqPerm: "NONE",
  args: "<farenheit | celsius> <location name>",
  module: "General",
  cooldown: 3000,
  desc: "Checks a weather forecast",
  example: [],
  run: async(client, message, args) => {

    if (!['celsius', 'farenheit'].includes(args[0]?.toLowerCase())) return message.inlineReply(`${client.emotes.error} Please specify a degree type! Either celsius or farenheit`)

    if(!args[1]) return message.inlineReply(`${client.emotes.error} Please specify a location`)

    if(args[0].toLowerCase() === 'celsius') {

        weather.find({search: args.slice(1).join(" "), degreeType: 'C'}, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if(error) return message.inlineReply(error);

            if(result === undefined || result.length === 0) return message.channel.send(`${client.emotes.error} Invalid location`);

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor('BLUE')
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', 'Celsius', true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', current.winddisplay, true)
            .addField('Feels like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)


            message.inlineReply(weatherinfo)
        })
      } else if(args[0].toLowerCase() === 'farenheit') {
        weather.find({search: args.slice(1).join(" "), degreeType: 'F'}, function (error, result) {
          // 'C' can be changed to 'F' for farneheit results
          if(error) return message.inlineReply(error);

          if(result === undefined || result.length === 0) return message.channel.send(`${client.emotes.error} Invalid location`);

          var current = result[0].current;
          var location = result[0].location;

          const weatherinfo2 = new Discord.MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Weather forecast for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor('BLUE')
          .addField('Timezone', `UTC${location.timezone}`, true)
          .addField('Degree Type', 'Farenheit', true)
          .addField('Temperature', `${current.temperature}°`, true)
          .addField('Wind', current.winddisplay, true)
          .addField('Feels like', `${current.feelslike}°`, true)
          .addField('Humidity', `${current.humidity}%`, true)


          message.inlineReply(weatherinfo2)
        })
      } else return message.inlineReply(`${client.emotes.error} Please specify a degree type! Either celsius or farenheit`)
    }
}
