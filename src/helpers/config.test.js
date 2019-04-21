// @flow

import mockFs from 'mock-fs';

jest.mock('pkg-dir');

describe('Config', () => {
  const mockRootDir = '/foo/bar/baz';

  const pkgDir = require('pkg-dir');
  pkgDir.mockReturnValue(Promise.resolve(mockRootDir));

  describe('getFilePath', () => {
    it('should return file path', async () => {
      const {getFilePath} = require('./config');

      const result = await getFilePath();
      const expected = `${mockRootDir}/.xcodeversionrc`;

      expect(result).toEqual(expected);
    });
  });

  describe('getVersion', () => {
    it('should throw error on file not found', async () => {
      const {getVersion} = require('./config');

      const result = getVersion();

      await expect(result).rejects.toThrow(`Xcode version file (.xcodeversionrc) not found.`);
    });

    it('should throw error on empty file', async () => {
      mockFs({
        [`${mockRootDir}/.xcodeversionrc`]: ''
      });
      const {getVersion} = require('./config');

      const result = getVersion();

      await expect(result).rejects.toThrow(`Xcode version file (.xcodeversionrc) is empty.`);
    });

    it('should return version', async () => {
      const mockVersion = '9.4';
      mockFs({
        [`${mockRootDir}/.xcodeversionrc`]: mockVersion
      });
      const {getVersion} = require('./config');

      const result = await getVersion();

      expect(result).toEqual(mockVersion);
    });

    afterEach(() => mockFs.restore());
  });
});
