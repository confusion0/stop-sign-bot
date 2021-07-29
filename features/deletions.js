const Schema = require('../models/lockdown'); 

module.exports = {
    name: 'channeldelete',
    run: async (client) => {
        client.on('channelDelete', async function(channel) {
        const { guild } = channel

        const lockdownchanneldata = await Schema.findOne({
            Guild: guild.id,
        });

        const logChannel = await client.gData.get(`${guild.id}:auditlogchannel`)
        const aichannel = await client.gData.get(`${guild.id}:aichannel`)
        
        if(logChannel && channel.id == logChannel) {
            client.gData.delete(`${guild.id}:auditlogchannel`)
            }
        if(aichannel && channel.id == aichannel) {
            client.gData.delete(`${guild.id}:aichannel`)
            client.gData.delete(`${guild.id}:aitime`)
            }
        if(lockdownchanneldata?.Lockdown.Channels.includes(channel.id)) {
            if(lockdownchanneldata.Lockdown.Channels.length == 1) {

                Schema.findOne({ Guild: guild.id }, async(err, data) => {
                    if(data) {
                        await Schema.findOneAndDelete({ Guild: guild.id }, data);
                    }
                })
            }
      
            const filtered = lockdownchanneldata.Lockdown.Channels.filter((target) => target !== channel.id);
            const enabled = lockdownchanneldata.Lockdown.Enabled
              
            await Schema.findOneAndUpdate({
                Guild: guild.id,
                Lockdown: {
                  Enabled: enabled,
                  Channels: filtered,
                }
            })
        }
    })

    client.on("roleDelete", async function (role) {
        const { guild } = role

        const vrole = await client.gData.get(`${guild.id}:vrole`)
        const grole = await client.gData.get(`${guild.id}:grole`)
        const asrole = await client.gData.get(`${guild.id}:asrole`)
              
        if(vrole && role.id == vrole) {
            client.gData.delete(`${guild.id}:vrole`)
            }
        if(grole && role.id == grole) {
            client.gData.delete(`${guild.id}:grole`)
            }
        if(asrole && role.id == asrole) {
            client.gData.delete(`${guild.id}:asrole`)
            }
        })
    }
}
