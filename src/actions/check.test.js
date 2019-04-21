// @flow

jest.mock('../helpers/xcode', () => ({
  fetchPaths: jest.fn(),
  getVersions: jest.fn(),
  getCurrentVersion: jest.fn()
}));

jest.mock('../helpers/config', () => ({
  getVersion: jest.fn()
}));

jest.mock('../helpers/logger', () => ({
  log: jest.fn()
}));

describe('Check', () => {
  it('should return true', async () => {
    const {getVersion} = require('../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../helpers/xcode');
    const {log} = require('../helpers/logger');
    getVersion.mockReturnValueOnce('9.0');
    fetchPaths.mockReturnValueOnce(['/foo/bar', '/baz']);
    getVersions.mockReturnValueOnce({
      '9.0': '/foo/bar',
      '10.2': '/baz'
    });
    getCurrentVersion.mockReturnValueOnce('9.0');

    const {check} = require('./check');

    const result = await check();

    expect(log).toHaveBeenCalledWith(':rocket: Xcode version 9.0 is already used.');
    expect(result).toBeTruthy();
  });

  it('should throw error if version is not used', async () => {
    const {getVersion} = require('../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../helpers/xcode');
    const {log} = require('../helpers/logger');
    getVersion.mockReturnValueOnce('9.0');
    fetchPaths.mockReturnValueOnce(['/foo/bar', '/baz']);
    getVersions.mockReturnValueOnce({
      '9.0': '/foo/bar',
      '10.2': '/baz'
    });
    getCurrentVersion.mockReturnValueOnce('10.2');

    const {check} = require('./check');

    const result = check();

    await expect(result).rejects.toThrow(':no_entry: Xcode version 9.0 is not used yet. Please run: xcodeversion use');
    expect(log).not.toHaveBeenCalled();
  });

  it('should throw error if version is not installed', async () => {
    const {getVersion} = require('../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../helpers/xcode');
    const {log} = require('../helpers/logger');
    getVersion.mockReturnValueOnce('8.0');
    fetchPaths.mockReturnValueOnce(['/foo/bar', '/baz']);
    getVersions.mockReturnValueOnce({
      '9.0': '/foo/bar',
      '10.2': '/baz'
    });
    getCurrentVersion.mockReturnValueOnce('10.2');

    const {check} = require('./check');

    const result = check();

    await expect(result).rejects.toThrow(':x: Xcode version 8.0 has not been found. Available versions: [9.0, 10.2]');
    expect(log).not.toHaveBeenCalled();
  });

  it('should throw error if any version is installed', async () => {
    const {getVersion} = require('../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../helpers/xcode');
    const {log} = require('../helpers/logger');
    getVersion.mockReturnValueOnce('8.0');
    fetchPaths.mockReturnValueOnce([]);
    getVersions.mockReturnValueOnce({});
    getCurrentVersion.mockReturnValueOnce();

    const {check} = require('./check');

    const result = check();

    await expect(result).rejects.toThrow(':x: Xcode version 8.0 has not been found. Available versions: -');
    expect(log).not.toHaveBeenCalled();
  });

  afterEach(() => {
    const {log} = require('../helpers/logger');
    log.mockClear();
  });
});
