// @flow

import emoji from 'node-emoji';

import config from '../helpers/config';
import xcode from '../helpers/xcode';
import type {Logger} from '../_types';

const use = async (logger: Logger) => {
  const lockedVersion = await config.getVersion();
  const paths = await xcode.fetchPaths();
  const versions = await xcode.getVersions(paths);
  let currentVersion = await xcode.getCurrentVersion();

  if (currentVersion === lockedVersion) {
    logger.log(`${emoji.get('rocket')} Xcode version ${lockedVersion} is already used.`);
    return;
  }

  currentVersion = await xcode.select(versions[lockedVersion]);

  if (currentVersion !== lockedVersion) {
    const command = xcode.getSelectCommand(versions[lockedVersion]);
    throw new Error(`${emoji.get('x')} Xcode version has not been set. Try yourself: ${command}`);
  }

  logger.log(`${emoji.get('white_check_mark')} Xcode version ${currentVersion} is now used.`);
};

export default use;
