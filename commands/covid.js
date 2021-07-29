const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: 'covid',
    aliases: [],
    reqPerm: "NONE",
    args: "<country || all>",
    cooldown: 5000,
    module: "Info",
    desc: "Shows the covid 19 cases for a country or the world.",
    example: [],
    run: async(client, message, args) => {

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        if(!args[0]) return message.inlineReply(`${client.emotes.error} You are missing some args (ex: ;covid all || ;covid Canada)` );

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                message.inlineReply(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                message.inlineReply(embed)
            }).catch(e => {
                return message.inlineReply(`${client.emotes.error} Invalid country provided`)
            })
        }
    }
}
