const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'botinfo',
  aliases: ['bi'],
  category: 'Utility',
  description: 'Display information about the bot',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Bot Information')
      .addFields(
        { name: 'Bot Name', value: client.user.username },
        { name: 'Created On', value: client.user.createdAt.toDateString() },
        { name: 'Servers', value: `${client.guilds.cache.size}` },
        { name: 'Users', value: `${client.users.cache.size}` },
      );
    message.channel.send({ embeds: [embed] });
  },
};
