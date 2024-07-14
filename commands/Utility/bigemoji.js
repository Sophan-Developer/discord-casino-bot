const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'bigemoji',
  aliases: [],
  category: 'Utility',
  description: 'Display a large version of an emoji',
  args: true,
  usage: '<emoji>',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const emoji = args[0];
    const emojiId = emoji.match(/\d+/g)[0];

    if (!emojiId) {
      return message.reply('Please provide a valid emoji.');
    }

    const embed = new EmbedBuilder()
      .setTitle('Big Emoji')
      .setImage(`https://cdn.discordapp.com/emojis/${emojiId}.png?v=1`)
      .setColor('#FF5900');

    message.channel.send({ embeds: [embed] });
  },
};