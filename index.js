const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 3000);

const botOptions = {
    host: 'ARTIC__MC.aternos.me:23768', 
    port: 25565,                  
    username: 'AFK_Spectator',    
    version: false                
};

let bot;
function createBot() {
    bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log("Bot spawned successfully!");
        
        setTimeout(() => { 
            bot.chat('/gamemode spectator'); 
        }, 5000);

        startAFK();
    });

    function startAFK() {
        setInterval(() => {
            if (!bot) return;
            bot.setControlState('right', true);
            setTimeout(() => {
                bot.setControlState('right', false);
                bot.setControlState('left', true);
                setTimeout(() => { 
                    bot.setControlState('left', false); 
                }, 1000);
            }, 1000);
        }, 15000); 
    }

    bot.on('end', () => { 
        console.log("Bot disconnected. Reconnecting in 10 seconds...");
        setTimeout(createBot, 10000); 
    });

    bot.on('error', (err) => {
        console.log("Error:", err);
    });
}

createBot();
