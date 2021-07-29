const Jimp = require('jimp');
const path = require('path')
const fs = require('fs').promises
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const url = 'https://api.no-api-key.com/api/v2/captcha'

module.exports = {
    name: 'verification',
    run: async(client) => {
      client.on('guildMemberAdd', async (member) => {
        if(member.user.bot) return
    const { guild } = member
    var inviteChannel = guild.channels.cache.random()
    const vrole = await client.gData.get(`${guild.id}:vrole`)
    if(!guild.roles.cache.get(vrole)) return
    if (vrole) {
    const role = guild.roles.cache.get(await client.gData.get(`${guild.id}:vrole`))
    var isRobot = true
    var exitCaptcha = false
    do {
        const { data } = await axios.get(url)

      const msg = await member.send(new MessageEmbed()
        .setTitle('Verification')
        .setDescription('You have 1 minute to solve the captcha and enter it below. Type cancel to cancel. If you fail, cancel the captcha or fail to respond in time, you will be kicked from the server.')
        .setColor('#23272A')
        .setImage(data.captcha)
        .setTimestamp()
        .setFooter(member.tag)
      )

      inviteChannel.createInvite({maxAge: 0}).then(invite => {
        member.send("If you get kicked, join back here: https://discord.gg/" + invite.code)
      })

      const filter = m => m.author.id === member.id

      const collected = await member.user.dmChannel.awaitMessages(filter, { max: 1, time: 60000 }) 

      if(!collected || !collected.first()){
        exitCaptcha = true
        msg.edit(new MessageEmbed()
        .setTitle('Verification')
        .setDescription('You took too long to respond, captcha failed. You have been kicked')
        .setColor('RED')
        .setImage(data.captcha)
        .setTimestamp()
        .setFooter(member.tag)
        )
        member.kick()
      } else {
        collected.first().delete()
        if(collected.first().content.toLowerCase() == 'cancel'){
          exitCaptcha = true
          msg.edit(new MessageEmbed()
          .setTitle('Verification')
          .setDescription('You cancelled the captcha, captcha failed. You have been kicked')
          .setColor('RED')
          .setImage(data.captcha)
          .setTimestamp()
          .setFooter(member.tag)
          )
          member.kick()
        }
        else if(collected.first().content == data.captcha_text) {
          isRobot = false
          msg.edit(new MessageEmbed()
          .setTitle('Verification')
          .setDescription('You completed the captcha successfully!')
          .addField('Correct Answer: ', data.captcha_text)
          .addField('Your Answer: ', collected.first().content)
          .setColor('GREEN')
          .setImage(data.captcha)
          .setTimestamp()
          .setFooter(member.tag)
          )
          member.roles.add(role)
        }
        else {
          msg.edit(new MessageEmbed()
          .setTitle('Verification')
          .setDescription('You entered the wrong answer. You have been kicked')
          .addField('Correct Answer: ', data.captcha_text)
          .addField('Your Answer: ', collected.first().content)
          .setColor('RED')
          .setImage(data.captcha)
          .setTimestamp()
          .setFooter(user.tag)
          )
          member.kick()
        }
      }

      await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
        .catch(err => console.log(err));
    } while (isRobot == true && exitCaptcha == false)
    }   
    })
  }
}

async function createCaptcha() {
    const captcha = Math.random().toString(36).slice(2, 8);
    const image = new Jimp(175, 50, 'white');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const textWidth = Jimp.measureText(font, captcha);
    const textHeight = Jimp.measureTextHeight(font, captcha);
    image.print(font, (w/2 - textWidth/2), (h/2 - textHeight/2), captcha);
    image.write(`${__dirname}/captchas/${captcha}.png`);
    return captcha;
}
