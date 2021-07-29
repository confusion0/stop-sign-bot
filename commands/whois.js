const { MessageEmbed, MessageFlags } = require('discord.js');
const Discord = require('discord.js')
const { RoleManager } = require('discord.js');
const ms = require("ms");

const keyPermissions = [
    'ADMINISTRATOR',
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'MANAGE_GUILD',
    'MENTION_EVERYONE',
    'MANAGE_NICKNAMES',
    'MANAGE_CHANNELS',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

var flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    PARTNERED_SERVER_OWNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    EARLY_VERIFIED_BOT_DEVELOPER: 'Early Verified Bot Developer',
};

module.exports = {
  name: 'whois',
  aliases: ['ui', 'info', 'userinfo'],
  reqPerm: "NONE",
  args: "[user id | user mention]",
  cooldown: 2500,
  module: "General",
  desc: "Shows a user's information",
  example: [],
  run: async(client, message, args) => {
        if(args[0]) {
            const server = message.guild;
            if(!message.mentions.members.first() && !server.members.cache.get(args[0])) {
                return message.reply('This user is not in this server. Enter a valid member mention or ID.');
            }
        }

        if(args[0]) {
            var target = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user;
            var mtarget = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        }
        const cmdmember = message.member;
        const cmduser = message.author;


        if (!target && !mtarget) {
            //Author
            const auser = message.author.user;
            const amember = cmdmember.user;
            var userFlags = cmduser.flags.toArray();
            var flagLength = userFlags.length;
            var uFlags = userFlags.map(flag => flags[flag]).join('\n');
            if(userFlags.length < 1) {
                flagLength = 0;
                uFlags = 'No Badges';
            }

            var mperson = cmdmember;
            var person = cmduser;
            var User = message.author.user;
            var createdAt = (cmduser.createdAt).toString().slice(0, 15);
            var joinedAt = (cmdmember.joinedAt).toString().slice(0, 15);
            var createdAgo = ms(Math.abs(new Date() - cmduser.createdAt), {long: true});
            var joinedAgo = ms(Math.abs(new Date() - cmdmember.joinedAt), {long: true});
            var roleAmount = cmdmember.roles.cache.size - 1;

            const rolemanager = new RoleManager(message.guild);
            var roles = ""
            cmdmember.roles.cache.forEach(role => {
                if (role.toString() != "@everyone") roles += role.toString() + " "
            })
            if(!roles) roles = "No Roles";
            if(roles.length > 1024) roles = roleAmount + " roles";

            var permissionString = '';
            var permissions = cmdmember.permissions.serialize();
            permissions = Object.entries(permissions);

            for(permission of permissions) {
                if(permission[1] && keyPermissions.includes(permission[0])) {
                    permissionString = `${permissionString}\`${permission[0]}\`, `
                }
            }
            if(permissionString.length > 0) permissionString = permissionString.slice(0, -2);

            var userStatus = person.presence.status;
            if(userStatus === 'offline') userStatus = "Offline";
            if(userStatus === 'dnd') userStatus = "Do Not Disturb";
            if(userStatus === 'online') userStatus = "Online";
            if(userStatus === 'idle') userStatus = "Idle";

            //------------------------------------------------------------------------------------
        } else if(target && mtarget) {
            //Target
            const tuser = target.user;
            const tmember = mtarget.user;
            var userFlags = target.flags.toArray();
            var flagLength = userFlags.length;
            var uFlags = userFlags.map(flag => flags[flag]).join('\n');
            if(userFlags.length < 1) {
                flagLength = 0;
                uFlags = 'No Badges';
            }

            var mperson = mtarget;
            var person = target;
            var User = tuser;
            var createdAt = (target.createdAt).toString().slice(0, 15);
            var joinedAt = (mtarget.joinedAt).toString().slice(0, 15);
            var createdAgo = ms(Math.abs(new Date() - target.createdAt), {long: true});
            var joinedAgo = ms(Math.abs(new Date() - mtarget.joinedAt), {long: true});
            var roleAmount = mtarget.roles.cache.size - 1;

            var roles = ""
            mtarget.roles.cache.forEach(role => {
                if (role.toString() != "@everyone") roles += role.toString() + " "
            })
            if(!roles) roles = "No Roles";
            if(roles.length > 1024) roles = roleAmount + " roles";

            var permissionString = '';
            var permissions = mtarget.permissions.serialize();
            permissions = Object.entries(permissions);

            for(permission of permissions) {
                if(permission[1] && keyPermissions.includes(permission[0])) {
                    permissionString = `${permissionString}\`${permission[0]}\`, `
                }
            }
            if(permissionString.length > 0) permissionString = permissionString.slice(0, -2);

            var userStatus = target.presence.status
            if(userStatus === 'offline') userStatus = "Offline";
            if(userStatus === 'dnd') userStatus = "Do Not Disturb";
            if(userStatus === 'online') userStatus = "Online";
            if(userStatus === 'idle') userStatus = "Idle";

        }
        //-----------------------------------------------------------------------------------------------


        const whoisembed = new MessageEmbed()
        .setAuthor(`${person.tag}`, `${person.displayAvatarURL()}`)
        .setColor('BLUE')
        .setThumbnail(`${person.displayAvatarURL()}`)
        .setDescription(`${person}`)
        .addFields(
            {name: `**Status: **`, value: `${userStatus}`},
            {name: `**Registered: **`, value: `${createdAt} (${createdAgo})`, inline: true},
            {name: `**Joined: **`, value: `${joinedAt} (${joinedAgo})`, inline: true},
        )
        .addField(`**Badges [${flagLength}]: **`, `${uFlags}`)
        .addField(`**Roles [${roleAmount}]: **`, roles)
        if(mperson.nickname) {
            whoisembed.setTitle(`**__User Info:__ ${mperson.nickname}**`)
        } else {
            whoisembed.setTitle(`**__User Info:__ ${person.username}**`)
        }
        if(permissionString.length > 0) {
            whoisembed.addField('**Permissions: **', permissionString)
        }
        whoisembed.setFooter(`ID: ${person.id}`)
        whoisembed.setTimestamp()

        message.channel.send(whoisembed);
        }

    }
