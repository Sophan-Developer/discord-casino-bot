const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'serverjoin',
  aliases: [],
  category: 'Owner',
  description: 'Join a server by invite link',
  args: true,
  usage: '<invite_link>',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const inviteLink = args[0];

    try {
      await client.guilds.join(inviteLink);
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Joined Server')
        .setDescription('Joined server successfully.');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Join Server Failed')
        .setDescription(`Failed to join server: ${error.message}`);

      message.channel.send({ embeds: [embed] });
    }
  },
};
