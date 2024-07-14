const { EmbedBuilder } = require('discord.js');
const { getTopUsers } = require('../../models/economy');

module.exports = {
  name: 'ranking',
  aliases: ['rank'],
  category: 'Economy',
  description: 'Show the top users by balance',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 10,
  owner: false,
  async execute(message, args, client, prefix) {
    try {
      const topUsers = await getTopUsers();
      if (!topUsers) {
        console.error('Top users data is null.');
        return message.reply('There was an error retrieving the top users.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Top Users')
        .setDescription(
          topUsers.map((user, index) => `${index + 1}. ${user.username} - ${user.balance} coins`).join('\n')
        );
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing ranking command:', error);
      message.reply('There was an error retrieving the top users.');
    }
  },
};
