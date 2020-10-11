// load .env variables
require('dotenv').config();
const { Client, RichEmbed, Collection } = require('discord.js');
const { prefix } = require('./config.json');

const handler = require(`./handler/handler.js`);
const fs = require('fs');
const onMessage = require('./handler/message');

const discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  throw '⭕️ .env: DISCORD_TOKEN is missing.';
}

console.info('\n\n\n\x1b[34m%s\x1b[0m', '⌛ bot starting...');

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');

handler(client);

client.on('message', message => onMessage(message, client));

client.once('ready', () => {
  console.info('\x1b[33m%s\x1b[0m', '✨ The bot is running.');
});

client.login(discordToken);
