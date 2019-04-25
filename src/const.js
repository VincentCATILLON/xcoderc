// @flow

import packageJson from '../package.json';

import type {Command} from './types';

export const COMMAND: {
  ['CHECK' | 'INIT' | 'USE']: Command
} = {
  CHECK: 'check',
  INIT: 'init',
  USE: 'use'
};

export const BINARY_NAME = Object.keys(packageJson.bin)[0];

export const CONFIG_FILE_NAME = '.xcodeversionrc';
