// @flow

import {mock} from '../../__mocks__';

jest.mock('../../helpers/xcode', () => ({
  fetchPaths: jest.fn(),
  getVersions: jest.fn(),
  getCurrentVersion: jest.fn(),
  select: jest.fn(),
  getSelectCommand: jest.fn()
}));

jest.mock('../../helpers/config', () => ({
  getVersion: jest.fn()
}));

jest.mock('../../helpers/logger', () => ({
  log: jest.fn()
}));

describe('Use', () => {
  it('should return true if its already selected', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });
    mock(fetchPaths).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return ['/foo/bar', '/baz'];
    });
    mock(getVersions).mockImplementationOnce(async paths => {
      expect(paths).toEqual(['/foo/bar', '/baz'])
      return {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };
    });
    mock(getCurrentVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });

    const {use} = require('../use');

    const result = await use();

    expect(log).toHaveBeenCalledWith('<blue>:rocket: Xcode version 9.0 is already used.</blue>');
    expect(result).toBeTruthy();
  });

  it('should throw error if version is not used', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion, select, getSelectCommand} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });
    mock(fetchPaths).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return ['/foo/bar', '/baz'];
    });
    mock(getVersions).mockImplementationOnce(async paths => {
      expect(paths).toEqual(['/foo/bar', '/baz'])
      return {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };
    });
    mock(getCurrentVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });
    mock(select).mockImplementationOnce(async path => {
      expect(path).toEqual('/foo/bar')
      return '10.2';
    });
    mock(getSelectCommand).mockImplementationOnce(path => {
      expect(path).toEqual('/foo/bar')
      return 'fakecommand';
    });

    const {use} = require('../use');

    const result = use();

    await expect(result).rejects.toThrow(':x: Xcode version has not been set. Try yourself: fakecommand');
    expect(log).toHaveBeenCalledWith('<yellow>:hot_pepper:  This command must be run as root, fill your password if prompted.</yellow>');
  });

  it('should return true after select succeed', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion, select} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });
    mock(fetchPaths).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return ['/foo/bar', '/baz'];
    });
    mock(getVersions).mockImplementationOnce(async paths => {
      expect(paths).toEqual(['/foo/bar', '/baz'])
      return {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };
    });
    mock(getCurrentVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });
    mock(select).mockImplementationOnce(async path => {
      expect(path).toEqual('/foo/bar')
      return '9.0';
    });

    const {use} = require('../use');

    const result = await use();

    expect(log).toHaveBeenCalledWith('<green>:white_check_mark: Xcode version 9.0 is now used.</green>');
    expect(result).toBeTruthy();
  });

  afterEach(() => {
    const {log} = require('../../helpers/logger');
    log.mockClear();
  });
});
