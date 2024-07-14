const { readdirSync } = require('fs');
const path = require('path');

module.exports = (client) => {
  client.commands = new Map();
  client.aliases = new Map();
  let count = 0;

  readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${dir}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
        if (command.aliases && Array.isArray(command.aliases)) {
          command.aliases.forEach(alias => {
            client.aliases.set(alias, command);
          });
        }
        count++;
      }
    }
  });

  console.log(`Client Commands Loaded: ${count}`);
};
