const { Collection } = require('discord.js');
const chalk = require('chalk');
const cooldowns = new Map();

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.aliases.get(commandName);

    if (!command) return;

    // Handle command cooldowns
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Check if the command requires arguments
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    // Check if the command requires specific user permissions
    if (command.userPerms && command.userPerms.length) {
      const missingPerms = command.userPerms.filter(perm => !message.member.permissions.has(perm));
      if (missingPerms.length) {
        return message.reply(`You do not have the necessary permissions to use this command: ${missingPerms.join(', ')}`);
      }
    }

    try {
      await command.execute(message, args, client, process.env.PREFIX);
    } catch (error) {
      console.error(chalk.red('Error executing command:'), error);
      message.reply('There was an error trying to execute that command!');
    }
  },
};
