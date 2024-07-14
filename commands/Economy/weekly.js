const { claimWeeklyReward } = require('../../models/economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'weekly',
  aliases: ['w'],
  category: 'Economy',
  description: 'Claim your weekly reward',
  async execute(message, args, client, prefix) {
    try {
      const result = await claimWeeklyReward(message.author.id);
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Weekly Reward')
        .setTimestamp();

      if (result.success) {
        embed.setDescription(`You have claimed your weekly reward of ${result.reward} coins!`);
      } else {
        embed.setDescription(result.message);
      }

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing weekly command:', error);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('There was an error trying to claim your weekly reward.')
        .setTimestamp();

      message.reply({ embeds: [embed] });
    }
  },
};
