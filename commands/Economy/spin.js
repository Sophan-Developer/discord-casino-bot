const { EmbedBuilder } = require('discord.js');
const { playSpin } = require('../../models/economy');

module.exports = {
  name: 'spin',
  aliases: ['sp'],
  category: 'Economy',
  description: 'Play a spin game to win or lose money',
  args: true,
  usage: '<amount>',
  userPerms: [],
  cooldown: 10,
  owner: false,
  async execute(message, args, client, prefix) {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please provide a valid amount to spin.');
    }
    try {
      const result = await playSpin(message.author.id, amount);
      if (result === null) {
        console.error('Spin result is null for user:', message.author.id);
        return message.reply('There was an error playing the spin game.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Spin')
        .setDescription(`You ${result.win ? 'won' : 'lost'} ${Math.abs(result.amount)} coins.`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing spin command:', error);
      message.reply('There was an error playing the spin game.');
    }
  },
};
