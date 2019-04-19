// @flow

import fs from 'fs';

import emoji from 'node-emoji';

import config, {CONFIG_FILE_NAME} from '../helpers/config';
import xcode from '../helpers/xcode';
import type {Logger} from '../_types';

const init = async (logger: Logger) => {
  const currentVersion = await xcode.getCurrentVersion();
  const configFilePath = await config.getFilePath();

  if (!currentVersion) {
    throw new Error(`${emoji.get('x')} Xcodebuild is not reachable. Check that Xcode is installed and in your PATH.`);
  }

  fs.writeFileSync(configFilePath, currentVersion);

  if (!fs.existsSync(configFilePath)) {
    throw new Error(`${emoji.get('x')} Xcode version file (${CONFIG_FILE_NAME}) not written.`);
  }

  logger.log(`${emoji.get('tada')} Xcode version file created with ${currentVersion}.`);
};

export default init;
