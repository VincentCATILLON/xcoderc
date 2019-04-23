// @flow

import {mock} from '../../__mocks__';

jest.mock('../shell', () => ({
  execute: jest.fn()
}));

describe('Xcode', () => {
  describe('fetchPaths', () => {
    it('should return paths from mdfind command', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual(`mdfind "kMDItemCFBundleIdentifier == 'com.apple.dt.Xcode'" 2>/dev/null`);
        return "/foo\n/bar/baz\n";
      });
      const {fetchPaths} = require('../xcode');

      const result = await fetchPaths();
      const expected = ['/foo', '/bar/baz'];

      expect(result).toEqual(expected);
    });

    it('should return paths from find command', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual(`mdfind "kMDItemCFBundleIdentifier == 'com.apple.dt.Xcode'" 2>/dev/null`);
        return '';
      });
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual(`find /Applications -maxdepth 2 -type d -name '*.app' -exec sh -c 'if [ "$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "{}/Contents/Info.plist" 2>/dev/null)" == "com.apple.dt.Xcode" ]; then echo "{}"; fi' ';'`);
        return "/qux\n";
      });
      const {fetchPaths} = require('../xcode');

      const result = await fetchPaths();
      const expected = ['/qux'];

      expect(result).toEqual(expected);
    });

    it('should return empty array', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual(`mdfind "kMDItemCFBundleIdentifier == 'com.apple.dt.Xcode'" 2>/dev/null`);
        return '';
      });
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual(`find /Applications -maxdepth 2 -type d -name '*.app' -exec sh -c 'if [ "$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "{}/Contents/Info.plist" 2>/dev/null)" == "com.apple.dt.Xcode" ]; then echo "{}"; fi' ';'`);
        return '';
      });
      const {fetchPaths} = require('../xcode');

      const result = await fetchPaths();
      const expected = [];

      expect(result).toEqual(expected);
    });
  });

  describe('parseVersion', () => {
    it('should return undefined if output is empty', () => {
      const {parseVersion} = require('../xcode');

      const result = parseVersion();

      expect(result).toBeUndefined();
    });

    it('should return undefined if version is not parsable', () => {
      const {parseVersion} = require('../xcode');

      const result = parseVersion('foobarbaz');

      expect(result).toBeUndefined();
    });

    it('should return version', () => {
      const {parseVersion} = require('../xcode');

      const result = parseVersion("Xcode 9.0\nBuild version 9A235\n");
      const expected = '9.0';

      expect(result).toEqual(expected);
    });
  });

  describe('getXcodebuildPath', () => {
    it('should return path', () => {
      const {getXcodebuildPath} = require('../xcode');

      const result = getXcodebuildPath('/foo/bar/baz');
      const expected = '/foo/bar/baz/Contents/Developer/usr/bin/xcodebuild';

      expect(result).toEqual(expected);
    });
  });

  describe('getVersion', () => {
    it('should throw error if xcodebuild not found', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('/foo/bar/baz/Contents/Developer/usr/bin/xcodebuild -version');
        return 'xcodebuild command not found';
      });

      const {getVersion} = require('../xcode');

      const result = getVersion('/foo/bar/baz');

      await expect(result).rejects.toThrow(`:x: Xcode version not reachable from /foo/bar/baz/Contents/Developer/usr/bin/xcodebuild`);
    });

    it('should return version', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('/foo/bar/baz/Contents/Developer/usr/bin/xcodebuild -version');
        return "Xcode 9.0\nBuild version 9A235\n";
      });

      const {getVersion} = require('../xcode');

      const result = await getVersion('/foo/bar/baz');

      expect(result).toEqual('9.0');
    });
  });

  describe('getVersions', () => {
    it('should return versions and paths related', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('/foo/bar/Contents/Developer/usr/bin/xcodebuild -version');
        return "Xcode 9.0\nBuild version 9A235\n";
      });
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('/baz/Contents/Developer/usr/bin/xcodebuild -version');
        return "Xcode 10.2\nBuild version 10E125\n";
      });

      const {getVersions} = require('../xcode');

      const result = await getVersions(['/foo/bar', '/baz']);
      const expected = {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getCurrentVersion', () => {
    it('should return current version', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('xcodebuild -version');
        return "Xcode 9.0\nBuild version 9A235\n";
      });

      const {getCurrentVersion} = require('../xcode');

      const result = await getCurrentVersion();
      const expected = '9.0';

      expect(result).toEqual(expected);
    });

    it('should throw error if xcodebuild not found', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('xcodebuild -version');
        return 'xcodebuild command not found';
      });

      const {getCurrentVersion} = require('../xcode');

      const result = getCurrentVersion();

      await expect(result).rejects.toThrow(':x: Xcode version not reachable.');
    });
  });

  describe('getSelectCommand', () => {
    it('should return command', () => {
      const {getSelectCommand} = require('../xcode');

      const result = getSelectCommand('/foo/bar/baz');
      const expected = 'sudo xcode-select -s /foo/bar/baz/Contents/Developer';

      expect(result).toEqual(expected);
    });
  });

  describe('select', () => {
    it('should switch to xcode and return version', async () => {
      const {execute} = require('../shell');
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('sudo xcode-select -s /foo/Contents/Developer');
        return '';
      });
      mock(execute).mockImplementationOnce(async command => {
        expect(command).toEqual('xcodebuild -version');
        return "Xcode 10.2\nBuild version 10E125\n";
      });

      const {select} = require('../xcode');

      const result = await select('/foo');
      const expected = '10.2';

      expect(result).toEqual(expected);
    });
  });
});
