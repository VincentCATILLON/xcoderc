// @flow

import type {Command} from './types';

export const COMMAND: {
  ['INIT' | 'USE']: Command
} = {
  INIT: '--init',
  USE: '--use'
};
