const Discord = require('discord.js')
const midDuel = new Set()

module.exports = {
    name: 'tictactoe',
    aliases: ['ttt'],
    reqPerm: "NONE",
    args: "<mention>",
    cooldown: 10000,
    module: "Fun",
    desc: "Play tictactoe with a friend",
    example: [],
    run: async(client, message, args) => {
        let author = message.author
        let author2 = message.author.id
        let member = message.mentions.users.first() 
        if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
            message.inlineReply(`${client.emotes.error} Sorry, But I cannot execute This Command if I Do Not Have the Permission to Manage Messages`);
            return;
            }
        if (!member) {
            return message.channel.send(`${client.emotes.error} Incorrect Syntax! Please mention a user!`)
        }
        if (member.id === author) {
            return message.channel.send(`${client.emotes.error} Incorrext Syntax! You cannot duel yourself!`)
        }
        if (member.bot) {
            return message.channel.send(`${client.emotes.error} You cannot duel a bot`)
        }
        if (midDuel.has(author)) {
            return message.channel.send(`${client.emotes.error} You're currently in a duel!`)
        } else if (midDuel.has(member.id)) {
            return message.channel.send(`${client.emotes.error} <@${member.id}> is currently in a duel!`)
        } if (member.id === message.client.user.id) {
            return message.channel.send(`${client.emotes.error} You can't duel me lol!`)
        }
        midDuel.add(author)
        midDuel.add(member.id)
        let turnName
        let a1 = '⬜'
        let a2 = '⬜'
        let a3 = '⬜'
        let b1 = '⬜'
        let b2 = '⬜'
        let b3 = '⬜'
        let c1 = '⬜'
        let c2 = '⬜'
        let c3 = '⬜'
        let xCircle
        let winner
        let turn
        const Embed = new Discord.MessageEmbed()
            .setTitle('Tic Tac Toe')
            .setDescription(`🎮 **${author.tag}** VS ${member.tag} 🎮\n\n🟦🟦🟦🟦🟦\n🟦${a1}${a2}${a3}🟦\n🟦${b1}${b2}${b3}🟦\n🟦${c1}${c2}${c3}🟦\n🟦🟦🟦🟦🟦`)
            .addField('Instructions', 'Type out a, b or c for the row, then 1, 2 or 3 for the column. (eg. a1 for top-left or b2 for middle)\nYou may type "cancel" at any time to stop the game.\n(`a1`, `a2`, `a3`, `b1`, `b2`, `b3`, `c1`, `c2`, `c3`)')
            .setColor('BLUE')
        message.channel.send(`${author}`, Embed).then(async message => {
            for (i = 0; i < 9; i++) {
                if (i % 2 == 0) {
                    turnName = author2
                    xCircle = '❌'
                    winner = `${author}`
                } else if (i % 2 > 0) {
                    turnName = member.id
                    xCircle = '🔴'
                    winner = `<@${member.id}>`
                }
                const filter = m => m.author.id === turnName
                try {
                    msg = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: '20000',
                        errors: ['time']
                    })
                    if (msg.first().content.toLowerCase().trim() === 'cancel') {
                        message.channel.send('Cancelled! What a wimp')
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        break
                    } else {
                        if (msg.first().content.toLowerCase().trim() === 'a1') {
                            if (a1 == '🔴' || a1 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                a1 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'a2') {
                            if (a2 == '🔴' || a2 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                a2 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'a3') {
                            if (a3 == '🔴' || a3 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                a3 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'b1') {
                            if (b1 == '🔴' || b1 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                b1 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'b2') {
                            if (b2 == '🔴' || b2 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                b2 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'b3') {
                            if (b3 == '🔴' || b3 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                b3 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'c1') {
                            if (c1 == '🔴' || c1 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                c1 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'c2') {
                            if (c2 == '🔴' || c2 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                c2 = xCircle
                            }
                        } else if (msg.first().content.toLowerCase().trim() === 'c3') {
                            if (c3 == '🔴' || c3 == '❌') {
                                message.channel.send(`${client.emotes.error} That spot is already occupied.. and now you lost lol`)
                                midDuel.delete(author)
                                midDuel.delete(member.id)
                                break
                            } else {
                                c3 = xCircle
                            }
                        } else {
                            message.channel.send('Incorrect input, you lost.')
                            midDuel.delete(author)
                                midDuel.delete(member.id)
                            break
                        }
                    }
                    msg.first().delete()
                } catch (ex) {
                    message.channel.send(`${client.emotes.error}  <@${turnName}> You took too long to respond, and now you lost. Nice!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                }
                if (i % 2 == 0) {
                const updatedEmbed = new Discord.MessageEmbed()
                    .setTitle('Tic Tac Toe')
                    .setDescription(`🎮 ${author.tag} VS **${member.tag}** 🎮\n\n🟦🟦🟦🟦🟦\n🟦${a1}${a2}${a3}🟦\n🟦${b1}${b2}${b3}🟦\n🟦${c1}${c2}${c3}🟦\n🟦🟦🟦🟦🟦`)
                    .addField('Instructions', 'Type out a, b or c for the row, then 1, 2 or 3 for the column. (eg. a1 for top-left or b2 for middle)\nYou may type "cancel" at any time to stop the game.\n(`a1`, `a2`, `a3`, `b1`, `b2`, `b3`, `c1`, `c2`, `c3`)')
                    .setColor('BLUE')
                message.edit(updatedEmbed)
                } else if (i % 2 > 0) {
                    const updatedEmbed = new Discord.MessageEmbed()
                    .setTitle('Tic Tac Toe')
                    .setDescription(`🎮 **${author.tag}** VS ${member.tag} 🎮\n\n🟦🟦🟦🟦🟦\n🟦${a1}${a2}${a3}🟦\n🟦${b1}${b2}${b3}🟦\n🟦${c1}${c2}${c3}🟦\n🟦🟦🟦🟦🟦`)
                    .addField('Instructions', 'Type out a, b or c for the row, then 1, 2 or 3 for the column. (eg. a1 for top-left or b2 for middle)\nYou may type "cancel" at any time to stop the game.\n(`a1`, `a2`, `a3`, `b1`, `b2`, `b3`, `c1`, `c2`, `c3`)')
                    .setColor('BLUE')
                message.edit(updatedEmbed)
                }
                if (a1 == '❌' && b1 == '❌' && c1 == '❌' || a1 == '🔴' && b1 == '🔴' && c1 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (a2 == '❌' && b2 == '❌' && c2 == '❌' || a2 == '🔴' && b2 == '🔴' && c2 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (a3 == '❌' && b3 == '❌' && c3 == '❌' || a3 == '🔴' && b3 == '🔴' && c3 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (a1 == '❌' && a2 == '❌' && a3 == '❌' || a1 == '🔴' && a2 == '🔴' && a3 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (b1 == '❌' && b2 == '❌' && b3 == '❌' || b1 == '🔴' && b2 == '🔴' && b3 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (c1 == '❌' && c2 == '❌' && c3 == '❌' || c1 == '🔴' && c2 == '🔴' && c3 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (a1 == '❌' && b2 == '❌' && c3 == '❌' || a1 == '🔴' && b2 == '🔴' && c3 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (a3 == '❌' && b2 == '❌' && c1 == '❌' || a3 == '🔴' && b2 == '🔴' && c1 == '🔴') {
                    message.channel.send(`${winner} wins!`)
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                } else if (i == 8) {
                    message.channel.send("It's a tie!")
                    midDuel.delete(author)
                    midDuel.delete(member.id)
                    break
                }
            }
        })
    }
}
