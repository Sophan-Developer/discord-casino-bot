const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'leaveserver',
  aliases: [],
  category: 'Owner',
  description: 'Leaves a server by ID',
  args: true,
  usage: '<server_id>',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const serverId = args[0];
    const server = client.guilds.cache.get(serverId);

    if (!server) {
      return message.reply('Server not found.');
    }

    await server.leave();
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Left Server')
      .setDescription(`Left server: ${server.name}`);

    message.channel.send({ embeds: [embed] });
  },
};
