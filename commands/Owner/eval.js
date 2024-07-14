const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'eval',
  aliases: [],
  category: 'Owner',
  description: 'Evaluates JavaScript code',
  args: true,
  usage: '<code>',
  userPerms: [],
  cooldown: 0,
  owner: true,
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) {
      return message.reply('You do not have permission to use this command.');
    }

    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }

      const embed = new EmbedBuilder()
        .setColor('#FF5900')
        .setTitle('Eval Result')
        .setDescription(`\`\`\`js\n${evaled}\n\`\`\``);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Eval Error')
        .setDescription(`\`\`\`js\n${err}\n\`\`\``);

      message.channel.send({ embeds: [embed] });
    }
  },
};
