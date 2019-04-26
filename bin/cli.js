#!/usr/bin/env node

// @flow

'use strict';

const emoji = require('node-emoji');
const chalk = require('chalk');
const args = require('args');

const lib = require('../lib').default;
const {COMMAND, CONFIG_FILE_NAME, BINARY_NAME} = require('../lib/const');
const {UnknownCommandError} = require('../lib/helpers/errors');

let exitCode;

function handler(command) {
  return lib(command)
    .then(function() {
      exitCode = 0;
    })
    .catch(function(e) {
      console.error(chalk.red(e.message));

      if (e instanceof UnknownCommandError) {
        console.log("\n");
        exitCode = 127;
        args.showHelp();
      } else {
        exitCode = 1;
      }
    });
}

args
  .command('check', `Check the locked version in ${CONFIG_FILE_NAME} file with your current Xcode version. (default)`, handler)
  .command('init', `Creates a ${CONFIG_FILE_NAME} file with your current Xcode version`, handler)
  .command('use', `Switch to the Xcode instance matching with your ${CONFIG_FILE_NAME} locked version.`, handler)
  .option('timeout', `Set execution timeout.`, 15000);

const [,, command] = process.argv;

const flags = args.parse(process.argv, {
  name: BINARY_NAME,
  mainColor: 'green',
  exit: {
    help: false,
    version: false
  }
});

if (['version', 'help'].includes(command)) {
  exitCode = 0;
} else if (Object.values(COMMAND).includes(command)) {
  // Do nothing
} else if (!command || command.slice(0, 1) === '-') {
  handler();
} else {
  handler(command);
}

let executionTime = 0;

setInterval(function() {
  executionTime += 100;
  if (executionTime >= flags.timeout) {
    console.error(chalk.red(`${emoji.get('confused')} The script ended with timeout. Try to increase this value with '--timeout' option.`));
    process.exit(124);
  }
  if (exitCode !== undefined) {
    process.exit(exitCode);
  }
}, 100);
