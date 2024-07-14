const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'botshard',
  aliases: ['shard'],
  category: 'Utility',
  description: 'Display shard information',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Shard Information')
      .addFields(
        { name: 'Total Shards', value: `${client.shard.count}` },
        { name: 'Current Shard', value: `${message.guild.shardId}` }
      );
    message.channel.send({ embeds: [embed] });
  },
};
