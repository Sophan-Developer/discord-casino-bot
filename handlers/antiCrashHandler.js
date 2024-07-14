const process = require('process');
const chalk = require('chalk');

const setupAntiCrashHandlers = () => {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
    // Recommended: send the information to a logging service
  });

  process.on('uncaughtException', (error) => {
    console.error(chalk.red('Uncaught Exception thrown:'), error);
    // Recommended: send the information to a logging service
    process.exit(1); // optional: exit the process
  });

  process.on('multipleResolves', (type, promise, reason) => {
    console.error(chalk.red(`Multiple Resolves: type: ${type}, promise: ${promise}, reason: ${reason}`));
  });
};

module.exports = { setupAntiCrashHandlers };
