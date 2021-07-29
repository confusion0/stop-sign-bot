const { token, prefix } = require('./config.json');
const walkSync = require('./walkSync.js');

const wait = require('util').promisify(setTimeout);

const path = require('path')

const fs = require('fs');

const mongoose = require('mongoose'); 

const Discord = require('discord.js');
const client = new Discord.Client({
  disableMention: "everyone",
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"]
});

require('discord-buttons')(client);

require("./inlineReply.js");

const config = require('./config.json');
client.config = config;

client.on('ready', () => {
    let gsize = client.guilds.cache.size;
    let msize = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    
      

      wait(1000);

        
      client.user.setActivity("@stop sign", { type : "WATCHING" })    
  });


  const mongo = require('./mongo')

  mongo().then(connection => {
    console.log('MongoDB Connection Established!')
  })
  
const giveawayModel = require('./models/giveaway')
  

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all giveaways which are stored in the database.
  async getAllGiveaways() {
      // Get all giveaways from the database. We fetch all documents by passing an empty condition.
      return await giveawayModel.find({});
  }

  // This function is called when a giveaway needs to be saved in the database.
  async saveGiveaway(messageID, giveawayData) {
      // Add the new giveaway to the database
      await giveawayModel.create(giveawayData);
      // Don't forget to return something!
      return true;
  }

  // This function is called when a giveaway needs to be edited in the database.
  async editGiveaway(messageID, giveawayData) {
      // Find by messageID and update it
      await giveawayModel.findOneAndUpdate({ messageID: messageID }, giveawayData).exec();
      // Don't forget to return something!
      return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageID) {
      // Find by messageID and delete it
      await giveawayModel.findOneAndDelete({ messageID: messageID }).exec();
      // Don't forget to return something!
      return true;
  }
};

client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 30000,
    default: {
        botsCanWin: false,
        embedColor: "BLUE",
        embedColorEnd: '0x2F3136',
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});


client.ADMINS = [
    {"lastKnownTag": "confusion#6969", "ID": "790618859173969952"}
  ]
  
  client.BLACKLISTED = [
      
  ]

client.snipes = new Map()
client.editsnipes = new Map()

const { Player } = require('discord-player');

const player = new Player(client);
client.player = player;
client.configure = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});

client.eventFiles = walkSync(path.join(__dirname, '/events'))

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();
client.commandFiles = walkSync(path.join(__dirname, '/commands'))

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Command loaded: ${commandName}`);
    });
});

client.prerequisites = new Discord.Collection()
client.prerequisiteFiles = walkSync(path.join(__dirname, '/prerequisites'))

for (const file of client.prerequisiteFiles) {
    const prerequisite = require(`${file}`);
    client.prerequisites.set(prerequisite.name, prerequisite)
    prerequisite.run(client);
  }

client.features = new Discord.Collection()
client.featureFiles = walkSync(path.join(__dirname, '/features'))

for (const file of client.featureFiles) {
    const feature = require(`${file}`);
    client.features.set(feature.name, feature)
    feature.run(client);
  }


// Login
client.login(token);
