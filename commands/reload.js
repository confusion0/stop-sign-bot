module.exports = {
  name: 'reload',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<command>",
  module: "Secret",
  desc: "Reloads a command",
  example: [],
  cooldown: 2000,
  run: async(client, message, args) => {
      
        if(!args[0]) return message.inlineReply(`${client.emotes.error} You need to provide a command.`)

        let cmd = client.commands.get(args[0].toLowerCase());

        if(!cmd) return message.inlineReply(`${client.emotes.error} You need to provide a valid command`)

        let command = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${command}.js`)]
            client.commands.delete(command)
            const pull = require(`./${command}.js`)
            client.commands.set(command, pull)
            message.inlineReply(`${client.emotes.success} Successfully reloaded \`\`${command}\`\` (command)`)
            console.log(`Reloaded ${command}`)
        } catch(error) {
            message.channel.send(`${client.emotes.error} An error occured while reloading this command command! ERROR: \`\`\`${error}\`\`\``)
        }
    }
}
