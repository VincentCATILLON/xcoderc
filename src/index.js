// @flow

import emoji from 'node-emoji';

import check from './actions/check';
import init from './actions/init';
import use from './actions/use';
import {COMMAND} from './_const';
import type {Command, Logger} from './_types';

export default async (command: Command, logger: Logger): Promise<void> => {
  switch (command) {
    case COMMAND.INIT: {
      await init(logger);
      break;
    }
    case COMMAND.CHECK: {
      await check(logger);
      break;
    }
    case COMMAND.USE: {
      await use(logger);
      break;
    }
    default:
      throw new Error(`${emoji.get('think')} Unknown command: ${command}`);
  }
};
