// @flow

import emoji from 'node-emoji';

import config from '../helpers/config';
import xcode from '../helpers/xcode';
import {log} from '../helpers/logger';

export const use = async (): Promise<boolean> => {
  const lockedVersion = await config.getVersion();
  const paths = await xcode.fetchPaths();
  const versions = await xcode.getVersions(paths);
  let currentVersion = await xcode.getCurrentVersion();

  if (currentVersion === lockedVersion) {
    log(`${emoji.get('rocket')} Xcode version ${lockedVersion} is already used.`);

    return true;
  }

  log(
    `${emoji.get('hot_pepper')}  This command must be run as root, fill your password if prompted.`
  );

  currentVersion = await xcode.select(versions[lockedVersion]);

  if (currentVersion !== lockedVersion) {
    const command = xcode.getSelectCommand(versions[lockedVersion]);
    throw new Error(`${emoji.get('x')} Xcode version has not been set. Try yourself: ${command}`);
  }

  log(`${emoji.get('white_check_mark')} Xcode version ${currentVersion} is now used.`);

  return true;
};

export default use;
