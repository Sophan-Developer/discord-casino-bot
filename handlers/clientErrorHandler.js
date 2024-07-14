const chalk = require('chalk');

const setupClientErrorHandlers = (client) => {
  client.on('error', (error) => {
    console.error(chalk.red('Client Error:'), error);
  });

  client.on('warn', (warning) => {
    console.warn(chalk.yellow('Client Warning:'), warning);
  });

  client.on('rateLimit', (rateLimitInfo) => {
    console.warn(chalk.yellow('Rate Limit Hit:'), rateLimitInfo);
  });
};

module.exports = { setupClientErrorHandlers };
