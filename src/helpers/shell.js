// @flow

import shelljs from 'shelljs';

import type {Command} from '../_types';

export const execute = async (command: Command): Promise<any> => {
  const result = shelljs.exec(command, {
    silent: true
  });

  return result.stdout;
};

export default {
  execute
};
