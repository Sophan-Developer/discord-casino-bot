const { EmbedBuilder } = require('discord.js');
const { getBankBalance } = require('../../models/economy');

module.exports = {
  name: 'bank',
  aliases: ['bankbalance'],
  category: 'Economy',
  description: 'Check your bank balance',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    try {
      const bankBalance = await getBankBalance(message.author.id);
      if (bankBalance === null) {
        console.error('Bank balance is null for user:', message.author.id);
        return message.reply('There was an error retrieving your bank balance.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Bank Balance')
        .setDescription(`You have ${bankBalance} coins in the bank.`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing bank command:', error);
      message.reply('There was an error checking your bank balance.');
    }
  },
};
