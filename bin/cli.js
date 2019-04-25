#!/usr/bin/env node

// @flow

'use strict';

const chalk = require('chalk');
const args = require('args');

const lib = require('../lib').default;
const {COMMAND, CONFIG_FILE_NAME, BINARY_NAME} = require('../lib/const');
const {UnknownCommandError} = require('../lib/helpers/errors');

function handler(command) {
  lib(command)
    .catch(e => {
      console.error(chalk.red(e.message));

      if (e instanceof UnknownCommandError) {
        console.log("\n");
        args.showHelp();
      }
    });
}

args
  .command('check', `Check the locked version in ${CONFIG_FILE_NAME} file with your current Xcode version. (default)`, handler)
  .command('init', `Creates a ${CONFIG_FILE_NAME} file with your current Xcode version`, handler)
  .command('use', `Switch to the Xcode instance matching with your ${CONFIG_FILE_NAME} locked version.`, handler);

const [,, command] = process.argv;

args.parse(process.argv, {
  name: BINARY_NAME,
  mainColor: 'green'
});

if (!command || !Object.values(COMMAND).includes(command)) {
  handler(command);
}
