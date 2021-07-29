const Schema = require('../models/reactionroles')
const { Util } = require('discord.js')

module.exports = {
    name: 'reactionroleadd',
    aliases: ['rradd', 'add', 'reaction-role-add'],
    reqPerm: "ADMINISTRATOR",
    args: "<role mention | role id | role name> <emoji>",
    cooldown: 30000,
    module: "Roles",
    desc: "Creates a reaction role",
    example: [],
    run: async(client, message, args) => {
        if(!args[0]) return message.inlineReply(`${client.emotes.error} Please mention a role or send its name or id.`)
        
        const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => (r.name === args[0].toString()) || (r.id === args[0].toString().replace(/[^\w\s]/gi, '')));
        if(!role) return message.inlineReply(`${client.emotes.error} Please mention a valid role or send its name or id.`)

        if(message.guild.me.roles.highest.position <= role.position) {
            return message.inlineReply(`${client.emotes.error} The role you have given is higher than or same position as my role. Please send a role that has a lower position than my role!`)
        }

        let [, emoji] = args
        if(!emoji) return message.inlineReply(`${client.emotes.error} Please specify an emoji.`)

        const parsedEmoji = Util.parseEmoji(emoji)

        if(!parsedEmoji) return message.inlineReply(`${client.emotes.error} That is not a valid emoji.`)

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                let ids = []
                const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                const role = message.guild.roles.cache.get(data.Roles[value][0])

                ids.push(role.id);
                })

                if(9 <= ids.length) return message.inlineReply(`${client.emotes.error} You can only have 10 or less reaction roles!`)

                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else {
                
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji,
                            }
                        ]
                    }
                }).save();
            }
            message.channel.send(`${client.emotes.add} I have successfully added a reaction role: ${role.name} for ${emoji}. Use the command called \`reactionrolepanel\` in the channel you want the reaction role to be in!`)
        })
    }
}
