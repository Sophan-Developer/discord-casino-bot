const { EmbedBuilder } = require('discord.js');
const { getBalance } = require('../../models/economy');

module.exports = {
  name: 'balance',
  aliases: ['bal', 'money'],
  category: 'Economy',
  description: 'Check your balance',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    try {
      const balance = await getBalance(message.author.id);
      if (balance === null) {
        console.error('Balance is null for user:', message.author.id);
        return message.reply('There was an error retrieving your balance.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Balance')
        .setDescription(`You have ${balance} coins.`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing balance command:', error);
      message.reply('There was an error checking your balance.');
    }
  },
};
