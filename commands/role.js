const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

  module.exports = {
  name: 'role',
  aliases: [],
  reqPerm: "MANAGE_ROLES",
  args: "<create | delete>",
  cooldown: 2000,
  desc: "Creates or deletes a role.",
  example: [],
  module: "Roles",
  run: async(client, message, args) => {
    let prefix = await client.gData.get(`${message.guild.id}:prefix`)
    if(!prefix) prefix = client.config.prefix
    if (args[0] === "create") {
      let args = message.content
      .slice(`${prefix}role create`.length)
      .trim()
      .split(/ +/g);
      let rName = args.join("")
      let rColor;

      args.forEach((arg) => {
        if (arg.startsWith("#")) {
          rColor = arg;
        }
      });
      if (!rName) {
        return message.inlineReply(
          `${client.emotes.error} You did not specify a name for your role!`
        );
      }
      if (!rColor) {
        return message.inlineReply(
          `${client.emotes.error} You did not specify a color for your role!`
        );
      }
      if (rColor >= 16777215)
        return message.inlineReply(
          `${client.emotes.error} That hex color range was too big! Keep it between 0 and 0xFFFFFF`
        );
      if (rColor <= 0)
        return message.inlineReply(
          `${client.emotes.error} That hex color range was too small! Keep it between 0 and 0xFFFFFF`
        );
      rName = rName.replace(`${rColor}`, ``);
      try {
      let rNew = await message.guild.roles.create({
        data: {
          name: `${rName}`,
          color: `${rColor}`,
        },
      });
      const Embed = new MessageEmbed()
        .setTitle(`Success!`)
        .setDescription(
          `${message.author.username} has created the role "${rName}"\nIts Hex Color Code: ${rColor}\nIts ID: ${rNew.id}`
        )
        .setColor('GREEN');
      message.inlineReply(Embed);
    } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
      }
    } else if (args[0] === "delete") {
      if (!args[0] || !args[1])
        return message.inlineReply(
          `${client.emotes.error} You did not specify the name or id of the role you wish to delete!`
        );
        const roleDelete = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));
      try {
      roleDelete.delete();
      const Embed1 = new MessageEmbed()
        .setTitle(`Success!`)
        .setColor(`'GREEN`)
        .setDescription(
          `${message.author.username} has deleted the role "${roleDelete.name}"\nIts ID: ${roleDelete.id}\nIts Hex Color Code: ${roleDelete.color}`
        );
      message.inlineReply(Embed1);
      } catch(error) {
            message.inlineReply(`${client.emotes.error} An error occured when running this command! ERROR: \`\`\`${error}\`\`\``)
      }
    }
  }
  }
