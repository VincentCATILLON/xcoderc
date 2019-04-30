// @flow

import emoji from 'node-emoji';

import type {Path, Version, Versions} from '../types';

import shell from './shell';

const BUNDLE_IDENTIFIER = 'com.apple.dt.Xcode';

export const fetchPaths = async (): Promise<Array<Path>> => {
  let paths = [];

  const mdFindResult = await shell.execute(
    `mdfind "kMDItemCFBundleIdentifier == '${BUNDLE_IDENTIFIER}'" 2>/dev/null`
  );

  if (mdFindResult) {
    paths = mdFindResult.split('\n').filter(path => path);
  }

  if (paths.length === 0) {
    const findResult = await shell.execute(
      `find /Applications -maxdepth 2 -type d -name '*.app' -exec sh -c 'if [ "$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "{}/Contents/Info.plist" 2>/dev/null)" == "${BUNDLE_IDENTIFIER}" ]; then echo "{}"; fi' ';'`
    );

    if (findResult) {
      paths = findResult.split('\n').filter(path => path);
    }
  }

  return paths;
};

export const parseVersion = (output?: string): Version | void => {
  const firstRow = output && output.split('\n')[0];
  const version = firstRow && firstRow.split(' ')[1];

  return version && version.match(/\d+\.\d+(\d+|)/) ? version : undefined;
};

export const getXcodebuildPath = (path: Path): string => `${path}/Contents/Developer/usr/bin/xcodebuild`

export const getVersion = async (path: Path): Promise<Version> => {
  const xcodebuildPath = getXcodebuildPath(path);
  const output = await shell.execute(`"${xcodebuildPath}" -version`);

  const version = parseVersion(output);

  if (!version) {
    throw new Error(`${emoji.get('x')} Xcode version not reachable from ${xcodebuildPath}`);
  }

  return version;
};

export const getVersions = async (paths: Array<Path>): Promise<Versions> =>
  paths.reduce(async (promise, path): Promise<Versions> => {
    const version = await getVersion(path);
    const result = await promise;

    result[version] = path;

    return {
      ...result,
      [version]: path
    };
  }, Promise.resolve({}));

export const getCurrentVersion = async (): Promise<Version> => {
  const output = await shell.execute(`xcodebuild -version`);

  const version = parseVersion(output);

  if (!version) {
    throw new Error(`${emoji.get('x')} Xcode version not reachable.`);
  }

  return version;
};

export const getSelectCommand = (path: Path): string => `sudo xcode-select -s "${path}/Contents/Developer"`;

export const select = async (path: Path): Promise<Version> => {
  await shell.execute(getSelectCommand(path));

  return getCurrentVersion();
};

export default {
  fetchPaths,
  parseVersion,
  getVersion,
  getVersions,
  getCurrentVersion,
  getSelectCommand,
  select
};
