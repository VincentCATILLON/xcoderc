// @flow

import path from 'path';
import fs from 'fs';

import pkgDir from 'pkg-dir';

import type {Path, Version} from '../_types';

const CONFIG_FILE_NAME = '.xcodeversionrc';

export const getFilePath = async (): Promise<Path> => {
  const rootDir = await pkgDir(__dirname);

  return path.join(rootDir, CONFIG_FILE_NAME);
}

export const getVersion = async (): Promise<Version> => {
  const filePath = await getFilePath();

  if (!fs.existsSync(filePath)) {
    throw new Error(`Xcode version file (${CONFIG_FILE_NAME}) not found.`);
  }

  const version = fs.readFileSync(filePath, 'UTF-8').split('\n')[0];

  if (!version) {
    throw new Error(`Xcode version file (${CONFIG_FILE_NAME}) is empty.`);
  }

  return version;
};

export default {
  getFilePath,
  getVersion
};
