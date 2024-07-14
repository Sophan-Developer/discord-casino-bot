const { ShardingManager } = require('discord.js');
const chalk = require('chalk');
require('dotenv').config();

const manager = new ShardingManager('./index.js', {
  totalShards: 'auto',
  token: process.env.DISCORD_TOKEN,
  respawn: true,
  autoSpawn: true,
  shardList: 'auto',
});

manager.on('shardCreate', shard => {
  console.log(chalk.green(`Launched shard ${shard.id}`));
  shard.on('ready', () => {
    console.log(chalk.green(`Shard ${shard.id} connected to Discord's Gateway.`));
  });

  shard.on('disconnect', (event) => {
    console.log(chalk.red(`Shard ${shard.id} disconnected from Discord's Gateway.`, event));
  });

  shard.on('reconnecting', () => {
    console.log(chalk.yellow(`Shard ${shard.id} reconnecting to Discord's Gateway.`));
  });

  shard.on('resume', (replayedEvents) => {
    console.log(chalk.green(`Shard ${shard.id} resumed (replayed ${replayedEvents} events).`));
  });

  shard.on('error', (error) => {
    console.error(chalk.red(`Shard ${shard.id} encountered an error: ${error}`));
  });
});

manager.spawn({ amount: manager.totalShards, delay: null, timeout: -1 })
  .then((shards) => {
    console.log(chalk.green(`${shards.size} shard(s) spawned.`));
  })
  .catch((err) => {
    console.error(chalk.red(`An error has occurred: ${err}`));
  });
