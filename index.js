const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

const BotClient = require('./handlers/BotClient');
const { GatewayIntentBits, Partials } = require('discord.js');
const loadEvents = require('./handlers/eventHandler');
const loadCommands = require('./handlers/commandHandler');
const { setupAntiCrashHandlers } = require('./handlers/antiCrashHandler');
const { setupClientErrorHandlers } = require('./handlers/clientErrorHandler'); // Correct import

const clientOptions = {
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
  ],
};

const client = new BotClient(clientOptions, process.env.DISCORD_TOKEN);

// Set mongoose strictQuery
mongoose.set('strictQuery', true);
const dbOptions = {
  useNewUrlParser: true,
  autoIndex: false,
  connectTimeoutMS: 10000,
  family: 4,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, dbOptions)
  .then(() => console.log(chalk.green('Connected to MongoDB')))
  .catch(err => console.error(chalk.red(`MongoDB connection error: ${err}`)));

loadCommands(client); // Ensure commands are loaded
loadEvents(client); // Ensure events are loaded
setupAntiCrashHandlers();
setupClientErrorHandlers(client);

client.connect();

client.on('shardReady', (id) => {
  console.log(chalk.green(`Shard Ready (ID: ${id})`));
});

client.on('shardDisconnect', (event, id) => {
  console.log(chalk.red(`Shard Disconnected (ID: ${id})`, event));
});

client.on('shardReconnecting', (id) => {
  console.log(chalk.yellow(`Shard Reconnecting (ID: ${id})`));
});

client.on('shardResume', (id, replayedEvents) => {
  console.log(chalk.green(`Shard Resumed (ID: ${id}, Events: ${replayedEvents})`));
});

// Suppress multipleResolves warnings
process.removeAllListeners('multipleResolves');
