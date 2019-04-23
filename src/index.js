// @flow

import emoji from 'node-emoji';

import check from './actions/check';
import init from './actions/init';
import use from './actions/use';
import {COMMAND} from './const';
import type {Command} from './types';

export default async (command?: Command): Promise<boolean> => {
  if (command && ![COMMAND.INIT, COMMAND.USE].includes(command)) {
    throw new Error(`${emoji.get('think')} Unknown command: ${command}`);
  }

  if (command === COMMAND.INIT) {
    return init();
  }

  if (command === COMMAND.USE) {
    return use();
  }

  return check();
};
