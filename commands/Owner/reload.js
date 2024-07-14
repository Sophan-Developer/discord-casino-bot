const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'reload',
  aliases: [],
  category: 'Owner',
  description: 'Reload a command',
  args: true,
  usage: '<command_name>',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName) || client.aliases.get(commandName);

    if (!command) {
      return message.reply('That command does not exist.');
    }

    const commandPath = require.resolve(path.join(__dirname, `../${command.category}/${command.name}.js`));
    delete require.cache[commandPath];

    try {
      const newCommand = require(commandPath);
      client.commands.set(newCommand.name, newCommand);

      if (newCommand.aliases && Array.isArray(newCommand.aliases)) {
        newCommand.aliases.forEach(alias => {
          client.aliases.set(alias, newCommand);
        });
      }

      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Reload Command')
        .setDescription(`Command \`${commandName}\` was reloaded.`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Reload Command Failed')
        .setDescription(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);

      message.channel.send({ embeds: [embed] });
    }
  },
};
