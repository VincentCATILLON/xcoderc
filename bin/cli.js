#!/usr/bin/env node

// @flow

'use strict';

const lib = require('../lib').default;

const [,, ...args] = process.argv;

lib(args[0])
  .catch(e => {
  console.error(e.message);

  process.exit(1);
});
