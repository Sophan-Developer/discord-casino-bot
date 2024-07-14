const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  name: 'laugh',
  aliases: [],
  category: 'Roleplay',
  description: 'Laugh with an anime GIF',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client, prefix) {
    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          tag: 'anime laugh',
          rating: 'pg-13'
        }
      });

      const gif = response.data.data.images.original.url;

      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle(`${message.author.username} is laughing!`)
        .setImage(gif);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to fetch a laugh GIF.');
    }
  },
};
