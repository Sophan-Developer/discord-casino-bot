const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'uptime',
  aliases: [],
  category: 'Utility',
  description: 'Check the bot\'s uptime',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const uptime = client.uptime;
    const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((uptime % (60 * 1000)) / 1000);
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Uptime')
      .setDescription(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    message.channel.send({ embeds: [embed] });
  },
};
