const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'listservers',
  aliases: [],
  category: 'Owner',
  description: 'List all servers the bot is in',
  args: false,
  usage: '',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    const guilds = client.guilds.cache.map(guild => `**${guild.name}** (ID: ${guild.id})`);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(guilds.length / itemsPerPage);
    let currentPage = 0;

    const generateEmbed = (page) => {
      const start = page * itemsPerPage;
      const end = start + itemsPerPage;
      const guildsList = guilds.slice(start, end).join('\n') || 'No servers found.';

      return new EmbedBuilder()
        .setTitle('Server List')
        .setDescription(guildsList)
        .setFooter({ text: `Page ${page + 1} of ${totalPages}` })
        .setColor('#FF5900');
    };

    const embedMessage = await message.channel.send({ embeds: [generateEmbed(currentPage)] });

    if (totalPages > 1) {
      const backButton = new ButtonBuilder()
        .setCustomId('back')
        .setLabel('⬅️')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currentPage === 0);

      const forwardButton = new ButtonBuilder()
        .setCustomId('forward')
        .setLabel('➡️')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currentPage === totalPages - 1);

      const row = new ActionRowBuilder().addComponents(backButton, forwardButton);

      const buttonsMessage = await message.channel.send({ components: [row] });

      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = buttonsMessage.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (interaction) => {
        if (interaction.customId === 'back') {
          currentPage = Math.max(currentPage - 1, 0);
        } else if (interaction.customId === 'forward') {
          currentPage = Math.min(currentPage + 1, totalPages - 1);
        }

        await interaction.update({ embeds: [generateEmbed(currentPage)], components: [new ActionRowBuilder().addComponents(
          backButton.setDisabled(currentPage === 0),
          forwardButton.setDisabled(currentPage === totalPages - 1)
        )] });
      });

      collector.on('end', () => {
        buttonsMessage.edit({ components: [] });
      });
    }
  },
};
