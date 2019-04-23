// @flow

import shelljs from 'shelljs';

export const execute = async (command: string): Promise<any> => {
  const result = await shelljs.exec(command, {
    silent: true
  });

  return result.stdout;
};

export default {
  execute
};
