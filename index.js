import { Client, GatewayIntentBits } from 'discord.js';

import axios from 'axios';
import { key } from './_keys';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Needed to access message.content
    ]
});

client.on('messageCreate', message => {
    console.log(message.content); // Logs every message sent to the console

    if (message.content === '!shutdown' && message.author.id === "876074218859692072") {
        message.channel.send("Shutting down!").then(() => {
            client.destroy();
        });
    }
});

client.login(key); // Assuming 'key' is your bot token from _keys.js
console.log("Starting weather bot...");
