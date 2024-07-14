const { readdirSync } = require('fs');
const path = require('path');

function loadEvents(client) {
  const eventFiles = readdirSync(path.resolve(__dirname, '../events')).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    if (event.name) {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
}

module.exports = loadEvents;
