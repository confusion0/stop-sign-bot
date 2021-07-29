const usersMap = new Map();
const LIMIT = 7;
const TIME = 7000;
const MUTETIME = 10000
const DIFF = 2500;

module.exports = {
    name: 'antispam',
    run: async(client) => {

client.on('message', async(message) => {
    const { guild } = message
    if(!guild) return
    const muterole = await client.gData.get(`${guild.id}:asrole`)
    if(!muterole) return
    if(message.author.bot) return
    if(message.member.hasPermission('BAN_MEMBERS' || 'KICK_MEMBERS' || 'MANAGE_GUILD' || 'ADMINISTRATOR')) return
    if(!guild.roles.cache.get(muterole)) return
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                
                message.member.roles.add(muterole);
                message.channel.send(`${client.emotes.success} ${message.author}, woah! Slow down there. You have been muted for spamming!`);
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send(`${client.emotes.success} ${message.author}, You have been unmuted!`)
                }, MUTETIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})
    }
}
