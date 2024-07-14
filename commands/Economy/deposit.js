const { EmbedBuilder } = require('discord.js');
const { depositMoney } = require('../../models/economy');

module.exports = {
  name: 'deposit',
  aliases: ['dep'],
  category: 'Economy',
  description: 'Deposit money into your bank',
  args: true,
  usage: '<amount>',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please provide a valid amount to deposit.');
    }
    try {
      const result = await depositMoney(message.author.id, amount);
      if (result === null) {
        console.error('Deposit result is null for user:', message.author.id);
        return message.reply('There was an error depositing your money.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Deposit')
        .setDescription(`You have successfully deposited ${amount} coins into your bank.`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing deposit command:', error);
      message.reply('There was an error depositing your money.');
    }
  },
};
