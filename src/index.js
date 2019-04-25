// @flow

import emoji from 'node-emoji';

import check from './actions/check';
import init from './actions/init';
import use from './actions/use';
import {COMMAND} from './const';
import type {Command} from './types';
import {UnknownCommandError} from './helpers/errors';

export default async (command?: Command): Promise<boolean> => {
  if (command && ![COMMAND.INIT, COMMAND.USE, COMMAND.CHECK].includes(command)) {
    throw new UnknownCommandError(`${emoji.get('question')} Unknown command: ${command}`);
  }

  if (command === COMMAND.INIT) {
    return init();
  }

  if (command === COMMAND.USE) {
    return use();
  }

  return check();
};
