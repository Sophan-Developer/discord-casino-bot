const { EmbedBuilder } = require('discord.js');
const { playSlots } = require('../../models/economy');

module.exports = {
  name: 'slots',
  aliases: ['slot', 'gamble'],
  category: 'Economy',
  description: 'Play a game of slots',
  args: true,
  usage: '<amount>',
  userPerms: [],
  cooldown: 10,
  owner: false,
  async execute(message, args, client, prefix) {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please provide a valid amount to gamble.');
    }
    try {
      const result = await playSlots(message.author.id, amount);
      if (result === null) {
        console.error('Slots result is null for user:', message.author.id);
        return message.reply('There was an error playing the slots.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Slots')
        .setDescription(`You ${result.win ? 'won' : 'lost'} ${Math.abs(result.amount)} coins.`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing slots command:', error);
      message.reply('There was an error playing the slots.');
    }
  },
};
