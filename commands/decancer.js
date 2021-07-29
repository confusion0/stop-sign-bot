const unorm = require('unorm');
        const limax = require('limax');

    module.exports = {
    name: 'decancer',
    aliases: [],
    reqPerm: "MANAGE_NICKNAMES",
    args: "<member | member id>",
    cooldown: 1000,
    module: "Moderation",
    desc: "Decancer a username.",
    example: [],
    run: async(client, message, args) => {
        
            const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

            if(!target) {
                return message.inlineReply(`${client.emotes.error} Please mention a user to decancer`)
            }
                
        function decancer(text) {
            text = unorm.nfkd(text);
            text = limax(text, {
                replacement: ' ',
                tone: false,
                separateNumbers: false,
                maintainCase: true,
                
            });
            return text;
        }

        var dcuser = message.guild.members.cache.get(target.id).displayName
        
        var decancered = decancer(dcuser)
        if (decancered === '') {
            decancered = 'decancered nickname'
        }

        if(message.channel.permissionsFor(message.guild.me).has('MANAGE_NICKNAMES')) {
        return message.inlineReply(`${client.emotes.success} I have changed \`${dcuser}\` to \`${decancered}\``).then(message.guild.members.cache.get(target.id).setNickname(`${decancered}`))
        } else {
            return message.inlineReply(`${client.emotes.error} I am missing permissions. Please give me the change nickname permission and move my role above the target`)
        }
    }
}
