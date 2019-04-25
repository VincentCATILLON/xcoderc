// @flow

import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
import emoji from 'node-emoji';

import config from '../helpers/config';
import xcode from '../helpers/xcode';
import {log} from '../helpers/logger';

export const init = async (): Promise<boolean> => {
  const currentVersion = await xcode.getCurrentVersion();
  const configFilePath = await config.getFilePath();

  if (!currentVersion) {
    throw new Error(`${emoji.get('x')} Xcodebuild is not reachable. Check that Xcode is installed and in your PATH.`);
  }

  try {
    fs.writeFileSync(configFilePath, currentVersion);
  } catch(e) {
    throw new Error(`${emoji.get('x')} Xcode config file (${path.basename(configFilePath)}) not written.`)
  }

  log(chalk.green(`${emoji.get('tada')} Xcode config file created with ${currentVersion}.`), `(${configFilePath})`);

  return true;
};

export default init;
