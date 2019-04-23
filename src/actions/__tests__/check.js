// @flow

import {mock} from '../../__mocks__';

jest.mock('../../helpers/xcode', () => ({
  fetchPaths: jest.fn(),
  getVersions: jest.fn(),
  getCurrentVersion: jest.fn()
}));

jest.mock('../../helpers/config', () => ({
  getVersion: jest.fn()
}));

jest.mock('../../helpers/logger', () => ({
  log: jest.fn()
}));

describe('Check', () => {
  it('should return true', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });
    mock(fetchPaths).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return ['/foo/bar', '/baz'];
    });
    mock(getVersions).mockImplementation(async paths => {
      expect(paths).toEqual(['/foo/bar', '/baz'])
      return {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };
    });
    mock(getCurrentVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });

    const {check} = require('../check');

    const result = await check();

    expect(log).toHaveBeenCalledWith(':rocket: Xcode version 9.0 is already used.');
    expect(result).toBeTruthy();
  });

  it('should throw error if version is not used', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '9.0';
    });
    mock(fetchPaths).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return ['/foo/bar', '/baz'];
    });
    mock(getVersions).mockImplementation(async paths => {
      expect(paths).toEqual(['/foo/bar', '/baz'])
      return {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };
    });
    mock(getCurrentVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });

    const {check} = require('../check');

    const result = check();

    await expect(result).rejects.toThrow(':no_entry: Xcode version 9.0 is not used yet. Please run: xcodeversion use');
    expect(log).not.toHaveBeenCalled();
  });

  it('should throw error if version is not installed', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '8.0';
    });
    mock(fetchPaths).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return ['/foo/bar', '/baz'];
    });
    mock(getVersions).mockImplementation(async paths => {
      expect(paths).toEqual(['/foo/bar', '/baz'])
      return {
        '9.0': '/foo/bar',
        '10.2': '/baz'
      };
    });
    mock(getCurrentVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });

    const {check} = require('../check');

    const result = check();

    await expect(result).rejects.toThrow(':x: Xcode version 8.0 has not been found. Available versions: [9.0, 10.2]');
    expect(log).not.toHaveBeenCalled();
  });

  it('should throw error if any version is installed', async () => {
    const {getVersion} = require('../../helpers/config');
    const {fetchPaths, getVersions, getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '8.0';
    });
    mock(fetchPaths).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return [];
    });
    mock(getVersions).mockImplementation(async paths => {
      expect(paths).toEqual([])
      return {};
    });
    mock(getCurrentVersion).mockImplementation(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });

    const {check} = require('../check');

    const result = check();

    await expect(result).rejects.toThrow(':x: Xcode version 8.0 has not been found. Available versions: -');
    expect(log).not.toHaveBeenCalled();
  });

  afterEach(() => {
    const {log} = require('../../helpers/logger');
    log.mockClear();
  });
});
