const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'banner',
  aliases: ['bn'],
  category: 'Utility',
  description: 'Display the banner of a user',
  args: false,
  usage: '[user]',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const user = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(user.id);
    const banner = await client.users.fetch(user.id, { force: true }).then(u => u.bannerURL({ dynamic: true, size: 512 }));
    if (!banner) return message.channel.send(`${user.username} does not have a banner.`);
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle(`${user.username}'s Banner`)
      .setImage(banner);
    message.channel.send({ embeds: [embed] });
  },
};
