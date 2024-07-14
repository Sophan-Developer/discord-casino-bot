const { EmbedBuilder } = require('discord.js');
const { transferMoney } = require('../../models/economy');

module.exports = {
  name: 'transfer',
  aliases: ['send'],
  category: 'Economy',
  description: 'Transfer money to another user',
  args: true,
  usage: '<@user> <amount>',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const user = message.mentions.users.first();
    const amount = parseInt(args[1], 10);
    if (!user || isNaN(amount) || amount <= 0) {
      return message.reply('Please mention a valid user and provide a valid amount to transfer.');
    }
    try {
      const result = await transferMoney(message.author.id, user.id, amount);
      if (result === null) {
        console.error('Transfer result is null for users:', message.author.id, user.id);
        return message.reply('There was an error transferring the money.');
      }
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Transfer')
        .setDescription(`You have successfully transferred ${amount} coins to ${user.tag}.`);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing transfer command:', error);
      message.reply('There was an error transferring the money.');
    }
  },
};
