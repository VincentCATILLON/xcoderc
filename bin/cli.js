#!/usr/bin/env node

// @flow

'use strict';

const chalk = require('chalk');

const lib = require('../lib').default;

const [,, ...args] = process.argv;

lib(args[0])
  .catch(e => {
  console.error(chalk.red(e.message));

  process.exit(1);
});
