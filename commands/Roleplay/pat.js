const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  name: 'pat',
  aliases: [],
  category: 'Roleplay',
  description: 'Pat someone with an anime GIF',
  args: true,
  usage: '<user>',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to pat.');

    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          tag: 'anime pat',
          rating: 'pg-13'
        }
      });

      const gif = response.data.data.images.original.url;

      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle(`${message.author.username} pats ${user.username}!`)
        .setImage(gif);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to fetch a pat GIF.');
    }
  },
};
