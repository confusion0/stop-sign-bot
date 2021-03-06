const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const Canvas = require("canvas");
const db = require('quick.db');
const ms = require('parse-ms');
module.exports = {
  name: 'blackjack',
  aliases: ['bj'],
  reqPerm: "NONE",
  args: "",
  cooldown: 30000,
  module: "Fun",
  desc: "Play a short game of blackjack",
  example: [],
  run: async(client, message, args) => {
  let liveDeck = [];
let playersHand = [];
let dealersHand = [];
let dealersFaceDownCard = [];
let drawCard = [];
let playerScore = 0;
let dealersScore = 0;
let inGame = false;
let playerAceCount = false;
let dealerAceCount = false;
let playerDisplay;
let dealerDisplay;
let messages = [];

// deck to be played
const deck = [
  { card: "2C", value: 2, deltOut: false },
  { card: "2D", value: 2, deltOut: false },
  { card: "2H", value: 2, deltOut: false },
  { card: "2S", value: 2, deltOut: false },

  { card: "3C", value: 3, deltOut: false },
  { card: "3D", value: 3, deltOut: false },
  { card: "3H", value: 3, deltOut: false },
  { card: "3S", value: 3, deltOut: false },

  { card: "4C", value: 4, deltOut: false },
  { card: "4D", value: 4, deltOut: false },
  { card: "4H", value: 4, deltOut: false },
  { card: "4S", value: 4, deltOut: false },

  { card: "5C", value: 5, deltOut: false },
  { card: "5D", value: 5, deltOut: false },
  { card: "5H", value: 5, deltOut: false },
  { card: "5S", value: 5, deltOut: false },

  { card: "6C", value: 6, deltOut: false },
  { card: "6D", value: 6, deltOut: false },
  { card: "6H", value: 6, deltOut: false },
  { card: "6S", value: 6, deltOut: false },

  { card: "7C", value: 7, deltOut: false },
  { card: "7D", value: 7, deltOut: false },
  { card: "7H", value: 7, deltOut: false },
  { card: "7S", value: 7, deltOut: false },

  { card: "8C", value: 8, deltOut: false },
  { card: "8D", value: 8, deltOut: false },
  { card: "8H", value: 8, deltOut: false },
  { card: "8S", value: 8, deltOut: false },

  { card: "9C", value: 9, deltOut: false },
  { card: "9D", value: 9, deltOut: false },
  { card: "9H", value: 9, deltOut: false },
  { card: "9S", value: 9, deltOut: false },

  { card: "10C", value: 10, deltOut: false },
  { card: "10D", value: 10, deltOut: false },
  { card: "10H", value: 10, deltOut: false },
  { card: "10S", value: 10, deltOut: false },

  { card: "JC", value: 10, deltOut: false },
  { card: "JD", value: 10, deltOut: false },
  { card: "JH", value: 10, deltOut: false },
  { card: "JS", value: 10, deltOut: false },

  { card: "QC", value: 10, deltOut: false },
  { card: "QD", value: 10, deltOut: false },
  { card: "QH", value: 10, deltOut: false },
  { card: "QS", value: 10, deltOut: false },

  { card: "KC", value: 10, deltOut: false },
  { card: "KD", value: 10, deltOut: false },
  { card: "KH", value: 10, deltOut: false },
  { card: "KS", value: 10, deltOut: false },

  { card: "AC", value: 11, deltOut: false },
  { card: "AD", value: 11, deltOut: false },
  { card: "AH", value: 11, deltOut: false },
  { card: "AS", value: 11, deltOut: false },
];

let user = message.author;

    

        let timeout = 30000;
        let blackjack = await db.fetch(`blackjack_${user.id}`);
        if(blackjack !== null && timeout - (Date.now() - blackjack) > 0){
            let time = ms(timeout - (Date.now() - blackjack));
            return message.channel.send(`Woah slow down man! Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
        } else {
        db.set(`blackjack_${user.id}`, Date.now());
// user enters text
const channel = message.channel

const filter = m => m.content.includes("");
const collector = message.channel.createMessageCollector(filter, {time: 500000});
  
     
      liveDeck = [...deck];
      inGame = true;

      playersHand = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      dealersHand = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 2);
      playersHand.push(drawCard[0]);
      drawCard.pop();
      drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      dealersFaceDownCard.push(drawCard[0]);
      drawCard.pop();
      playerScore = getScore(playersHand);
      dealersScore = getScore(dealersHand);
      let dealersCanvas = await createDealersCanvas([...dealersHand]);
      let playersCanvas = await createPlayersCanvas([...playersHand]);

      message.channel.send("Type ``hit`` to hit, ``stand`` to stand, and ``end game`` to end the game. " + `Dealers score: \`\`?\`\`, Your score: \`\`${playerScore}\`\``, dealersCanvas)
      message.channel.send(playersCanvas)
      collector.on('collect', async m => {
        if(m.author.bot) return
        if(m.author != message.author) return 

        messages.push(m)
        if((m.content).trim().toLowerCase() == "hit") { 
              drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 5);
              playersHand.push(drawCard[0]);
              drawCard.pop();
              playerScore = getScore(playersHand);
              dealersScore = getScore(dealersHand);
              let dealersCanvas = await createDealersCanvas([...dealersHand]);
              let playersCanvas = await createPlayersCanvas([...playersHand]);
              message.channel.send("Type ``hit`` to hit, ``stand`` to stand, and ``end game`` to end the game. " + `Dealers score: \`\`?\`\`, Your score: \`\`${playerScore}\`\``, dealersCanvas)
              message.channel.send(playersCanvas)
              }
             if((m.content).trim().toLowerCase() == "end game") { 
                message.channel.send(`You ended the game. What a loser`)
                resetGame();
                return collector.stop()
               }
               if((m.content).trim().toLowerCase() == "stand") { 
        drawCard = dealersFaceDownCard.splice(0, 1);
        dealersHand.push(drawCard[0]);
        drawCard.pop();
        dealersScore = getScore(dealersHand);
        // draw cards for dealer till but or gets higher them player
        do {
          drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
          dealersHand.push(drawCard[0]);
          drawCard.pop();
          playerScore = getScore(playersHand);
          dealersScore = getScore(dealersHand);
        } while (dealersScore <= playerScore && dealersScore < 22);
  
        let dealersCanvas = await createDealersCanvas([...dealersHand]);
        let playersCanvas = await createPlayersCanvas([...playersHand]);
  
        message.channel.send(`Dealers score: \`\`${dealersScore}\`\`, Your score: \`\`${playerScore}\`\``, dealersCanvas)
        message.channel.send(playersCanvas)
        collector.stop()
       }

  // change ace to 1 for dealer
  if (dealersScore > 21 && inGame === true && dealerAceCount === false) {
    for (let i = 0; i < dealersHand.length; i++) {
      if (
        dealersHand[i].card === "AC" ||
        dealersHand[i].card === "AD" ||
        dealersHand[i].card === "AH" ||
        dealersHand[i].card === "AS"
      ) {
        dealersHand[i].value = 1;
        i = dealersHand.length;
        dealersScore = getScore(dealersHand);
      }
    }
    dealerAceCount = true;
  }
  // change aces to 1 for player
  if (playerScore > 21 && inGame === true && playerAceCount === false) {
    for (let i = 0; i < playersHand.length; i++) {
      if (
        playersHand[i].card === "AC" ||
        playersHand[i].card === "AD" ||
        playersHand[i].card === "AH" ||
        playersHand[i].card === "AS"
      ) {
        playersHand[i].value = 1;
        i = playersHand.length;
        playerScore = getScore(playersHand);
      }
    }
    playerAceCount = true;
  }
  // dealer bust
  if (dealerAceCount === true && dealersScore > 21 && inGame === true) {
    await resetGame(channel);

    let dealersCanvas = await dealerBust();
    let playersCanvas = await playerWins();
    dealerDisplay = await channel.send(dealersCanvas);
    playerDisplay = await channel.send(playersCanvas);
    await channel.send(`End of Game!! Dealer busted!`);
    return collector.stop()
  }
  // player bust
  if (playerAceCount === true && playerScore > 21 && inGame === true) {
    await resetGame(channel);
    let dealersCanvas = await dealerWins();
    let playersCanvas = await playerBust();
    await channel.send(dealersCanvas);
    await channel.send(playersCanvas);
    await channel.send(`End of Game!! You busted...`);
    return collector.stop()
  }
  // dealer has higher score than player and wins
  if (dealersScore > playerScore && dealersScore < 22 && inGame === true) {
    await resetGame(channel);
    let dealersCanvas = await dealerWins();
    let playersCanvas = await playerLost();
    await channel.send(dealersCanvas);
    await channel.send(playersCanvas);
    await channel.send(`End of Game!! The dealer has a higher score than you...`);
    return collector.stop()
  }
})}
}
}
// generate a random number to select a card in the remaining deck
const createRandomNumber = (maxNum) => Math.floor(Math.random() * (10 - 5));
// reset all the var to clean up for another game
const resetGame = async () => {
  inGame = false;
  liveDeck = [];
  playersHand = [];
  dealersHand = [];
  dealersFaceDownCard = [];
  drawCard = [];
  playerScore = 0;
  dealersScore = 0;
};
// calculate the cards
const getScore = (array) => {
  const result = array;
  let score = 0;
  for (let i = 0; i < result.length; i++) {
    score += result[i].value;
  }
  return score;
};

// dealer canvas
const createDealersCanvas = async (dealersCards) => {
  const dealersArray = dealersCards;
  console.log("Dealer", dealersArray);

  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "50px Georgia";
  ctx.fillStyle = "red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  if (dealersArray.length === 1) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/FD.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 2) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 3) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${dealersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 4) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${dealersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${dealersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 5) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${dealersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${dealersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${dealersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);

    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 6) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${dealersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${dealersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${dealersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);
    const img6 = await Canvas.loadImage(`./cards/${dealersArray[5].card}.png`);
    ctx.drawImage(img6, 220, 260, 200, 200);

    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 7) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${dealersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${dealersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${dealersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);
    const img6 = await Canvas.loadImage(`./cards/${dealersArray[5].card}.png`);
    ctx.drawImage(img6, 220, 260, 200, 200);
    const img7 = await Canvas.loadImage(`./cards/${dealersArray[6].card}.png`);
    ctx.drawImage(img7, 430, 260, 200, 200);

    ctx.fillText("Dealers Hand", 0, 40);
  } else if (dealersArray.length === 8) {
    const img1 = await Canvas.loadImage(`./cards/${dealersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${dealersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${dealersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${dealersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${dealersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);
    const img6 = await Canvas.loadImage(`./cards/${dealersArray[5].card}.png`);
    ctx.drawImage(img6, 220, 260, 200, 200);
    const img7 = await Canvas.loadImage(`./cards/${dealersArray[6].card}.png`);
    ctx.drawImage(img7, 430, 260, 200, 200);
    const img8 = await Canvas.loadImage(`./cards/${dealersArray[7].card}.png`);
    ctx.drawImage(img8, 640, 260, 200, 200);
    ctx.fillText("Dealers Hand", 0, 40);
  }
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
// player canvas
const createPlayersCanvas = async (playersCards) => {
  const playersArray = playersCards;
  console.log("player", playersArray);

  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "50px Georgia";
  ctx.fillStyle = "blue";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);

  // players hand
  if (playersArray.length === 2) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    ctx.fillText("Players Hand", 0, 40);
  } else if (playersArray.length === 3) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${playersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    ctx.fillText("Players Hand", 0, 40);
  } else if (playersArray.length === 4) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${playersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${playersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    ctx.fillText("Players Hand", 0, 40);
  } else if (playersArray.length === 5) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${playersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${playersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${playersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);

    ctx.fillText("Players Hand", 0, 40);
  } else if (playersArray.length === 6) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${playersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${playersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${playersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);
    const img6 = await Canvas.loadImage(`./cards/${playersArray[5].card}.png`);
    ctx.drawImage(img6, 220, 260, 200, 200);

    ctx.fillText("Players Hand", 0, 40);
  } else if (playersArray.length === 7) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${playersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${playersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${playersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);
    const img6 = await Canvas.loadImage(`./cards/${playersArray[5].card}.png`);
    ctx.drawImage(img6, 220, 260, 200, 200);
    const img7 = await Canvas.loadImage(`./cards/${playersArray[6].card}.png`);
    ctx.drawImage(img7, 430, 260, 200, 200);

    ctx.fillText("Players Hand", 0, 40);
  } else if (playersArray.length === 8) {
    const img1 = await Canvas.loadImage(`./cards/${playersArray[0].card}.png`);
    ctx.drawImage(img1, 10, 50, 200, 200);
    const img2 = await Canvas.loadImage(`./cards/${playersArray[1].card}.png`);
    ctx.drawImage(img2, 220, 50, 200, 200);
    const img3 = await Canvas.loadImage(`./cards/${playersArray[2].card}.png`);
    ctx.drawImage(img3, 430, 50, 200, 200);
    const img4 = await Canvas.loadImage(`./cards/${playersArray[3].card}.png`);
    ctx.drawImage(img4, 640, 50, 200, 200);
    // 2nd row
    const img5 = await Canvas.loadImage(`./cards/${playersArray[4].card}.png`);
    ctx.drawImage(img5, 10, 260, 200, 200);
    const img6 = await Canvas.loadImage(`./cards/${playersArray[5].card}.png`);
    ctx.drawImage(img6, 220, 260, 200, 200);
    const img7 = await Canvas.loadImage(`./cards/${playersArray[6].card}.png`);
    ctx.drawImage(img7, 430, 260, 200, 200);
    const img8 = await Canvas.loadImage(`./cards/${playersArray[7].card}.png`);
    ctx.drawImage(img8, 640, 260, 200, 200);
    ctx.fillText("Players Hand", 0, 40);
  }
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
const dealerBust = async () => {
  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "100px Georgia";
  ctx.fillStyle = "Red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.fillText("Dealer Bust!", 0, 500);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
const playerBust = async () => {
  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "100px Georgia";
  ctx.fillStyle = "Red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.fillText("Bust!", 0, 500);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
const playerLost = async () => {
  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "100px Georgia";
  ctx.fillStyle = "Red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.fillText("You Lose!!", 0, 500);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
const dealerWins = async () => {
  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "100px Georgia";
  ctx.fillStyle = "Red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.fillText("Dealer Wins!!", 0, 500);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
const dealerLost = async () => {
  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "100px Georgia";
  ctx.fillStyle = "Red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.fillText("Dealer lost!!", 0, 500);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
};
const playerWins = async () => {
  const canvas = Canvas.createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  ctx.font = "100px Georgia";
  ctx.fillStyle = "Red";
  const backGround = await Canvas.loadImage(`./cards/backGround.jpg`);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  ctx.fillText("You Win!!", 0, 500);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "image.png"
  );
  return attachment;
}
