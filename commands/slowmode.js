module.exports = {
  name: 'slowmode',
  aliases: [],
  reqPerm: "MANAGE_CHANNELS",
  args: "<time>",
  cooldown: 2000,
  desc: "Sets the slowmode for the channel.",
  example: [],
  module: "Moderation",
  run: async(client, message, args) => {
  
  if(!message.channel.permissionsFor(message.guild.me).has("MANAGE_CHANNELS")) {
    return message.inlineReply(`${client.emotes.error} I do not have the manage channels permission. Please check my permissions`);
}
    if (!args[0])
      return message.inlineReply(
        `${client.emotes.error} You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
    if (isNaN(args[0])) return message.inlineReply(`${client.emotes.error} That is not a number!`);
    let reason = args.slice(1).join(' ');
    
    message.channel.setRateLimitPerUser(args[0], reason);
    message.inlineReply(
      `${client.emotes.success} Set the slowmode of this channel to **${args[0]}**`
    )
  }
}
