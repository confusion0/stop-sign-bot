const axios = require('axios')

module.exports = {
    name: 'docs',
    aliases: ['documents'],
    reqPerm: "BOT_ADMIN",
    args: "<document>",
    cooldown: 2000,
    module: "Secret",
    desc: "Gets a document from discord.js",
    example: [],
    run: async(client, message, args) => {
    
    if(!client.ADMINS.find(admin => admin.ID === message.author.id)){
        return message.inlineReply(`${client.emotes.error} You are not an admin. You cannot use the command.`)
     }
    let source = args[0]
    
    if (!['master', 'stable'].includes(args[0]?.toLowerCase())) return message.channel.send(`${client.emotes.error} Please make sure to include a valid source. Either \`\`master\`\` or stable\`\`.`)
    
    let searchParam = args.slice(0).join(' ');
    if(!searchParam) return message.channel.send(`${client.emotes.error} Please make sure to include a search param.`)

    if(args[0].toLocaleLowerCase() === 'stable') {
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      searchParam
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.inlineReply(`${client.emotes.error} Could not find that documentation`)
        }
      })
      .catch((err) => {
        console.error(err)
      })
    } else if(args[0].toLocaleLowerCase() === 'master') {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(
      searchParam
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.inlineReply(`${client.emotes.error} Could not find that documentation`)
        }
      })
      .catch((err) => {
        console.error(err)
      })
    } else return message.inlineReply(`${client.emotes.error} Please make sure to include a valid source. Either \`\`master\`\` or stable\`\`.`)
    }
}
