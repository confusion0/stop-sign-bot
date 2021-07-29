
module.exports = async (client, message, oldMessage, newMessage) => {
  let user = oldMessage.author
  if(!oldMessage.guild) return
  if(message.author.bot) return
  client.editsnipes.set(oldMessage.channel.id, {
    oldcontent: oldMessage.content,
    newcontent: newMessage.content,
    author: oldMessage.author,
    image: newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null
  })
}
