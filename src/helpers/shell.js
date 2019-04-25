// @flow

import shelljs from 'shelljs';

export const execute = async (command: string): Promise<any> => {
  const {stdout} = await shelljs.exec(command, {
    silent: true
  });

  return stdout;
};

export default {
  execute
};
