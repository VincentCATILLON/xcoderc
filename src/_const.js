// @flow

import type {Command} from './_types';

export const COMMAND: {
  ['INIT' | 'USE']: Command
} = {
  INIT: '--init',
  USE: '--use'
};
