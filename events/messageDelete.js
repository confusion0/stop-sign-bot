module.exports = async (client, message) => {
    let user = message.author
    if(!message.guild) return
    if(message.author.bot) return
    if(message.partial) return
      client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
      })
}
