const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const chalk = require('chalk');

class BotClient extends Client {
  constructor(options, token) {
    super(options);
    this.token = token;
    this.commands = new Collection();
    this.aliases = new Collection();
  }

  connect() {
    return this.login(this.token)
      .then(() => console.log(chalk.green('Logged in to Discord')))
      .catch(err => console.error(chalk.red(`Error logging in: ${err}`)));
  }
}

module.exports = BotClient;
