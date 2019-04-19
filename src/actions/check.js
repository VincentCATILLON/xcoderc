// @flow

import emoji from 'node-emoji';

import config from '../helpers/config';
import xcode from '../helpers/xcode';
import type {Logger} from '../_types';

const use = async (logger: Logger) => {
  const lockedVersion = await config.getVersion();
  const paths = await xcode.fetchPaths();
  const versions = await xcode.getVersions(paths);
  const currentVersion = await xcode.getCurrentVersion();

  if (currentVersion === lockedVersion) {
    logger.log(`${emoji.get('rocket')} Xcode version ${lockedVersion} is already used.`);
    return;
  }

  if (versions.hasOwnProperty(lockedVersion)) {
    throw new Error(
      `${emoji.get(
        'no_entry'
      )} Xcode version ${lockedVersion} is not used yet. Please run: xcoderc use`
    );
  }

  const availableVersions = versions ? `[${Object.keys(versions).join(', ')}]` : '-';
  throw new Error(
    `${emoji.get(
      'x'
    )} Xcode version ${lockedVersion} has not been found. Available versions: ${availableVersions}`
  );
};

export default use;
