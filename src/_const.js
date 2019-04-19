// @flow

import type {Command} from './_types';

export const COMMAND: {
  ['INIT' | 'CHECK' | 'USE']: Command
} = {
  INIT: 'init',
  CHECK: 'check',
  USE: 'use'
};
