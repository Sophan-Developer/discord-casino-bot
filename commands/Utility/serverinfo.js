const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  aliases: ['si'],
  category: 'Utility',
  description: 'Display information about the server',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const { guild } = message;
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Server Information')
      .addFields(
        { name: 'Server Name', value: guild.name },
        { name: 'Server ID', value: guild.id },
        { name: 'Owner', value: `<@${guild.ownerId}>` },
        { name: 'Created On', value: guild.createdAt.toDateString() },
        { name: 'Member Count', value: `${guild.memberCount}` }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }));
    message.channel.send({ embeds: [embed] });
  },
};
