const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'restart',
  aliases: [],
  category: 'Owner',
  description: 'Restart the bot',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Restarting')
      .setDescription('Restarting the bot...');

    await message.reply({ embeds: [embed] });
    process.exit();
  },
};
