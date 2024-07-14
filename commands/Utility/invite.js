const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'invite',
  aliases: [],
  category: 'Utility',
  description: 'Get the invite link for the bot',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;
    const embed = new EmbedBuilder()
      .setColor('#FF5900')
      .setTitle('Invite Me')
      .setDescription(`[Click here to invite the bot](${inviteLink})`);
    message.channel.send({ embeds: [embed] });
  },
};
