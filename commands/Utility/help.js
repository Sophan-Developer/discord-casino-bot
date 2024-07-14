const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'Utility',
  description: 'Displays a list of all commands or detailed information for a specific command.',
  args: false,
  usage: '[command name]',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const data = [];
    const { commands } = client;

    if (!args.length) {
      data.push('Here\'s a list of all my commands:');
      commands.forEach(command => {
        data.push(`**${prefix}${command.name}**: ${command.description}`);
      });

      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Command List')
        .setDescription(data.join('\n'))
        .setFooter({ text: `You can send ${prefix}help [command name] to get info on a specific command!` });

      return message.channel.send({ embeds: [embed] });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('That\'s not a valid command!');
    }

    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle(`Command: ${command.name}`)
      .addFields(
        { name: 'Description', value: command.description || 'No description provided.' },
        { name: 'Category', value: command.category || 'No category provided.' },
        { name: 'Aliases', value: command.aliases.length ? command.aliases.join(', ') : 'None' },
        { name: 'Usage', value: command.usage ? `${prefix}${command.name} ${command.usage}` : 'No usage provided.' },
        { name: 'Cooldown', value: `${command.cooldown || 3} second(s)` }
      );

    message.channel.send({ embeds: [embed] });
  },
};
