// @flow

jest.mock('../helpers/xcode', () => ({
  fetchPaths: jest.fn(),
  getVersions: jest.fn(),
  getCurrentVersion: jest.fn(),
  select: jest.fn(),
  getSelectCommand: jest.fn()
}));

jest.mock('../helpers/config', () => ({
  getVersion: jest.fn()
}));

jest.mock('../helpers/logger', () => ({
  log: jest.fn()
}));

describe('Use', () => {
  it('should return true if its already selected', async () => {
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

    const {use} = require('./use');

    const result = await use();

    expect(log).toHaveBeenCalledWith(':rocket: Xcode version 9.0 is already used.');
    expect(result).toBeTruthy();
  });

  it('should throw error if version is not used', async () => {
    const {getVersion} = require('../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion, select, getSelectCommand} = require('../helpers/xcode');
    const {log} = require('../helpers/logger');
    getVersion.mockReturnValueOnce('9.0');
    fetchPaths.mockReturnValueOnce(['/foo/bar', '/baz']);
    getVersions.mockReturnValueOnce({
      '9.0': '/foo/bar',
      '10.2': '/baz'
    });
    getCurrentVersion.mockReturnValueOnce('10.2');
    select.mockReturnValueOnce('10.2');
    getSelectCommand.mockReturnValueOnce('fakecommand');

    const {use} = require('./use');

    const result = use();

    await expect(result).rejects.toThrow(':x: Xcode version has not been set. Try yourself: fakecommand');
    expect(log).toHaveBeenCalledWith(':hot_pepper:  This command must be run as root, fill your password if prompted.');
  });

  it('should return true after select succeed', async () => {
    const {getVersion} = require('../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion, select} = require('../helpers/xcode');
    const {log} = require('../helpers/logger');
    getVersion.mockReturnValueOnce('9.0');
    fetchPaths.mockReturnValueOnce(['/foo/bar', '/baz']);
    getVersions.mockReturnValueOnce({
      '9.0': '/foo/bar',
      '10.2': '/baz'
    });
    getCurrentVersion.mockReturnValueOnce('10.2');
    select.mockReturnValueOnce('9.0');

    const {use} = require('./use');

    const result = await use();

    expect(log).toHaveBeenCalledWith(':white_check_mark: Xcode version 9.0 is now used.');
    expect(result).toBeTruthy();
  });

  afterEach(() => {
    const {log} = require('../helpers/logger');
    log.mockClear();
  });
});
