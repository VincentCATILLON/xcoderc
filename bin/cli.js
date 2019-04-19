#!/usr/bin/env node

// @flow

'use strict';

const lib = require('../lib');

const [,, ...args] = process.argv;

try {
  lib(args[0], console);

  process.exit(0);
} catch (e) {
  console.error(e.message);

  process.exit(1);
}
