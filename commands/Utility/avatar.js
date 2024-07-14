const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: ['av'],
  category: 'Utility',
  description: 'Display the avatar of a user',
  args: false,
  usage: '[user]',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const user = message.mentions.users.first() || message.author;
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));
    message.channel.send({ embeds: [embed] });
  },
};
