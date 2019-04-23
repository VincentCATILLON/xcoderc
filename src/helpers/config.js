// @flow

import path from 'path';
import fs from 'fs';

import emoji from 'node-emoji';
import pkgDir from 'pkg-dir';

import type {Path, Version} from '../types';

const CONFIG_FILE_NAME = '.xcodeversionrc';

export const getFilePath = async (): Promise<Path> => {
  const rootDir = pkgDir.sync(__dirname);

  if (!rootDir) {
    throw new Error(`${emoji.get('x')} Project root not found.`);
  }

  const filePath = path.join(rootDir, CONFIG_FILE_NAME);

  return filePath;
}

export const getVersion = async (): Promise<Version> => {
  const filePath = await getFilePath();

  if (!fs.existsSync(filePath)) {
    throw new Error(`${emoji.get('x')} Xcode version file (${CONFIG_FILE_NAME}) not found.`);
  }

  const version = fs.readFileSync(filePath, 'UTF-8').split('\n')[0];

  if (!version) {
    throw new Error(`${emoji.get('x')} Xcode version file (${CONFIG_FILE_NAME}) is empty.`);
  }

  return version;
};

export default {
  getFilePath,
  getVersion
};
