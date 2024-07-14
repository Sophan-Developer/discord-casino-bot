const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  aliases: [],
  category: 'Utility',
  description: 'Check the bot\'s ping',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Pong!')
      .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    message.channel.send({ embeds: [embed] });
  },
};
