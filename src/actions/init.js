// @flow

import path from 'path';
import fs from 'fs';

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

  log(`${emoji.get('tada')} Xcode config file created with ${currentVersion}.`);

  return true;
};

export default init;
