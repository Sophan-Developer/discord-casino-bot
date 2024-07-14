const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'emojilist',
  aliases: ['emojis'],
  category: 'Utility',
  description: 'Display a paginated list of all custom emojis in the server with their IDs',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 5,
  owner: false,
  async execute(message, args, client) {
    const emojis = message.guild.emojis.cache.map((e, index) => `${0 + 1}.${e.toString()} \`${e.toString()}\``);
    const pageSize = 15;
    let currentPage = 0;

    const generateEmbed = (page) => {
      const start = page * pageSize;
      const end = start + pageSize;
      const emojiList = emojis.slice(start, end).join('\n') || 'No emojis available.';

      return new EmbedBuilder()
        .setTitle('Emoji List')
        .setDescription(emojiList)
        .setFooter({ text: `Page ${page + 1} of ${Math.ceil(emojis.length / pageSize)}` })
        .setColor('#FF5900');
    };

    const embedMessage = await message.channel.send({ embeds: [generateEmbed(currentPage)] });

    if (emojis.length <= pageSize) return;

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('prev')
          .setLabel('⬅️')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel('➡️')
          .setStyle(ButtonStyle.Primary),
      );

    await embedMessage.edit({ components: [row] });

    const filter = (i) => i.user.id === message.author.id;
    const collector = embedMessage.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'prev' && currentPage > 0) {
        currentPage--;
      } else if (interaction.customId === 'next' && currentPage < Math.ceil(emojis.length / pageSize) - 1) {
        currentPage++;
      }

      await interaction.update({ embeds: [generateEmbed(currentPage)], components: [row] });
    });

    collector.on('end', () => {
      const disabledRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('⬅️')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('next')
            .setLabel('➡️')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true),
        );

      embedMessage.edit({ components: [disabledRow] });
    });
  },
};
