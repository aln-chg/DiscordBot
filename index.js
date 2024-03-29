import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import { key } from "./_keys.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

//shutdown command
client.on("messageCreate", (message) => {
  if (
    message.content === "!shutdown" &&
    message.author.id === "876074218859692072"
  ) {
    message.channel.send("Shutting down!").then(() => {
      client.destroy();
    });
  }
});

//help command
client.on("messageCreate", (message) => {
  if (message.content === "!help") {
    message.channel.send("Discord bot is currently under maintainence!");
  }
});

//word filter command
const blockedWords = fs
  .readFileSync("wordFilter.txt", "utf8")
  .split(",")
  .map((word) => word.trim().toLowerCase());

client.on("messageCreate", async (message) => {
  // Ignore messages from bots, including itself
  if (message.author.bot) return;

  // Check if the message contains any of the blocked words
  const containsBlockedWord = blockedWords.some((word) =>
    message.content.toLowerCase().includes(word),
  );

  if (containsBlockedWord) {
    // Delete the message if it contains a blocked word
    await message.delete();
    // Send a warning message
    message.channel.send("Content was deleted because it's a blocked content!");
    return; // Exit the function after handling a blocked word
  }
});

//Welcome message that dm's the user
client.on("guildMemberAdd", (member) => {
  member.send("Welcome to the server!, Please read the rules!");
});

//spam filter
const spam = new Set();
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (spam.has(message.author.id)) {
    message.delete();
    message.channel.send("You are sending messages too fast!");
    return;
  }
  spam.add(message.author.id);
  setTimeout(() => {
    spam.delete(message.author.id);
  }, 500);
});

//command for sending the github repo for this bot
client.on("messageCreate", (message) => {
  if (message.content === "!github") {
    message.channel.send("https://github.com/aln-chg/DiscordBot");
  }
});

client.login(key); // Assuming 'key' is your bot token from _keys.
console.log("Starting JS-Bot...");
