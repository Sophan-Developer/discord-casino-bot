const { claimDailyReward } = require('../../models/economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'daily',
  aliases: ['d'],
  category: 'Economy',
  description: 'Claim your daily reward',
  async execute(message, args, client, prefix) {
    try {
      const result = await claimDailyReward(message.author.id);
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Daily Reward')
        .setTimestamp();

      if (result.success) {
        embed.setDescription(`You have claimed your daily reward of ${result.reward} coins!`);
      } else {
        embed.setDescription(result.message);
      }

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing daily command:', error);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('There was an error trying to claim your daily reward.')
        .setTimestamp();

      message.reply({ embeds: [embed] });
    }
  },
};
