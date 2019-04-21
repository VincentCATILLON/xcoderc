// @flow

import emoji from 'node-emoji';

import config from '../helpers/config';
import xcode from '../helpers/xcode';
import {log} from '../helpers/logger';

export const check = async (): Promise<boolean> => {
  const lockedVersion = await config.getVersion();
  const paths = await xcode.fetchPaths();
  const versions = await xcode.getVersions(paths);
  const currentVersion = await xcode.getCurrentVersion();

  if (currentVersion === lockedVersion) {
    log(`${emoji.get('rocket')} Xcode version ${lockedVersion} is already used.`);

    return true;
  }

  if (versions.hasOwnProperty(lockedVersion)) {
    throw new Error(
      `${emoji.get(
        'no_entry'
      )} Xcode version ${lockedVersion} is not used yet. Please run: xcodeversion use`
    );
  }

  const availableVersions = Object.keys(versions).length > 0 ? `[${Object.keys(versions).join(', ')}]` : '-';
  throw new Error(
    `${emoji.get(
      'x'
    )} Xcode version ${lockedVersion} has not been found. Available versions: ${availableVersions}`
  );
};

export default check;
