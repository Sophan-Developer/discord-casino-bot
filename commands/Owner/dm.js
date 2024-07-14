const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'dm',
  aliases: [],
  category: 'Owner',
  description: 'Send a direct message to a user',
  args: true,
  usage: '<user_id> <message>',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const userId = args.shift();
    const userMessage = args.join(' ');

    try {
      const user = await client.users.fetch(userId);
      await user.send(userMessage);
      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('DM Sent')
        .setDescription(`Sent message to ${user.tag}`);

      message.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('DM Failed')
        .setDescription(`Failed to send message: ${error.message}`);

      message.reply({ embeds: [embed] });
    }
  },
};
