const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  category: 'Utility',
  description: 'Display information about a user',
  args: false,
  usage: '[user]',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const user = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(user.id);
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle(`${user.username}'s Information`)
      .addFields(
        { name: 'Username', value: user.username },
        { name: 'Discriminator', value: `#${user.discriminator}` },
        { name: 'ID', value: user.id },
        { name: 'Joined Server', value: member.joinedAt.toDateString() },
        { name: 'Account Created', value: user.createdAt.toDateString() },
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));
    message.channel.send({ embeds: [embed] });
  },
};
