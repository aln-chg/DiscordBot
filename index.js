import { Client, GatewayIntentBits } from 'discord.js';
import fs from "fs";
import axios from 'axios';
import { key } from './_keys.js';
import { resolve } from 'path';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Needed to access message.content
    ]
});

//shutdown command
client.on('messageCreate', message => {

    if (message.content === '!shutdown' && message.author.id === "876074218859692072") {
        message.channel.send("Shutting down!").then(() => {
            client.destroy();
        });
    }
});

//help command
client.on("messageCreate", message => {
    if(message.content === '!help') {
        message.channel.send("Discord bot is currently under maintainence!")
    }
});

//word filter command
const blockedWords = fs.readFileSync("wordFilter.txt", "utf8").split(",").map(word => word.trim().toLowerCase());

client.on('messageCreate', async message => {
    
    if (message.author.bot) return;

    for (const word of blockedWords) {
        if (message.content.toLowerCase().includes(word.toLowerCase())) {
            message.delete();
            await new Promise(resolve => setTimeout(resolve, 150));
            message.channel.send('Your message was deleted because the content included a blocked word!');
            break;
        }
    }
});




client.login(key); // Assuming 'key' is your bot token from _keys.js
console.log("Starting weather bot...");
