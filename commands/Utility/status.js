const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'status',
  aliases: [],
  category: 'Utility',
  description: 'Display the bot\'s status',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Bot Status')
      .addFields(
        { name: 'Status', value: 'Online' },
        { name: 'Servers', value: `${client.guilds.cache.size}` },
        { name: 'Users', value: `${client.users.cache.size}` }
      );
    message.channel.send({ embeds: [embed] });
  },
};
