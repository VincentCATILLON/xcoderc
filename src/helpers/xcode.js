// @flow

import shelljs from 'shelljs';
import emoji from 'node-emoji';

import type {Path, Version, Versions} from '../_types';

const BUNDLE_IDENTIFIER = 'com.apple.dt.Xcode';

const fetchPaths = async (): Promise<Array<Path>> => {
  let paths = [];

  const mdFind = await shelljs.exec(
    `mdfind "kMDItemCFBundleIdentifier == '${BUNDLE_IDENTIFIER}'" 2>/dev/null`,
    {silent: true}
  );

  paths = mdFind.stdout.split('\n').filter(path => path);

  if (paths.length === 0) {
    const find = await shelljs.exec(
      `find /Applications -maxdepth 2 -type d -name '*.app' -exec sh -c 'if [ "$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "{}/Contents/Info.plist" 2>/dev/null)" == "${BUNDLE_IDENTIFIER}" ]; then echo "{}"; fi' ';'`,
      {silent: true}
    );

    paths = find.stdout.split('\n').filter(path => path);
  }

  return paths;
};

const parseVersion = (output?: string): Version | void => {
  const version = output && output.split('\n')[0];

  return version && version.split(' ')[1];
};

const getVersion = async (path: Path): Promise<Version> => {
  const xcodebuildPath = `${path}/Contents/Developer/usr/bin/xcodebuild`;
  const output = await shelljs.exec(`${xcodebuildPath} -version`, {
    silent: true
  });

  const version = parseVersion(output.stdout);

  if (!version) {
    throw new Error(`${emoji.get('x')} Xcode version not reachable from ${xcodebuildPath}`);
  }

  return version;
};

const getVersions = async (paths: Array<Path>): Promise<Versions> =>
  paths.reduce(async (promise, path): Promise<Versions> => {
    const version = await getVersion(path);
    const result = await promise;

    result[version] = path;

    return {
      ...result,
      [version]: path
    };
  }, Promise.resolve({}));

const getCurrentVersion = async (): Promise<Version> => {
  const output = await shelljs.exec(`xcodebuild -version`, {
    silent: true
  });

  const version = parseVersion(output.stdout);

  if (!version) {
    throw new Error(`${emoji.get('x')} Xcode version not reachable.`);
  }

  return version;
};

const getSelectCommand = (path: Path): string => `sudo xcode-select -s ${path}/Contents/Developer`;

const select = async (path: Path): Promise<Version> => {
  const command = getSelectCommand(path);

  console.log(
    `${emoji.get('hot_pepper')}  This command must be run as root, fill your password if prompted.`
  );
  await shelljs.exec(command, {
    silent: true
  });

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
