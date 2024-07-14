const { EmbedBuilder } = require('discord.js');
const { withdraw } = require('../../models/economy');

module.exports = {
  name: 'withdraw',
  aliases: ['wd'],
  category: 'Economy',
  description: 'Withdraw money from your bank',
  args: true,
  usage: '<amount>',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const amount = parseInt(args[0]);
    const newBalance = await withdraw(message.author.id, amount);
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Withdraw')
      .setDescription(`You have withdrawn ${amount} coins. Your new balance is ${newBalance} coins.`);
    message.channel.send({ embeds: [embed] });
  },
};
