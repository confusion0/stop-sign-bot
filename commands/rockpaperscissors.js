const djs = require('djs-fun-v12') 

module.exports = {
    name: 'rockpaperscissors',
    aliases: ['rps'],
    reqPerm: "NONE",
    args: "",
    cooldown: 20000,
    desc: "Play rock paper scissors with me!",
    example: [],
    module: "Fun",
    run: async(client, message, args) => {
        djs.rps(message, {
            startMessage: "Rock Paper Scissors! \n\nHit a button below for your choice.",
        
            rockButtonColor: "red",
            
            paperButtonColor: "gray",
            
            scissorsButtonColor: "green"
           
        })
    }
}