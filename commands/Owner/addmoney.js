const { updateBalance } = require('../../models/economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'addmoney',
  aliases: [],
  category: 'Owner',
  description: 'Add money to a user\'s balance',
  args: true,
  usage: '<user_id> <amount>',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const userId = args[0];
    const amount = parseInt(args[1], 10);

    if (isNaN(amount)) {
      return message.reply('Invalid amount.');
    }

    await updateBalance(userId, amount);
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Add Money')
      .setDescription(`Added ${amount} coins to user ${userId}.`);

    message.channel.send({ embeds: [embed] });
  },
};