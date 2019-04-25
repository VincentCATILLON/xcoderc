// @flow

import mockFs from 'mock-fs';

import {mock} from '../../__mocks__';

jest.mock('../../helpers/xcode', () => ({
  getCurrentVersion: jest.fn()
}));

jest.mock('../../helpers/config', () => ({
  getFilePath: jest.fn()
}));

jest.mock('../../helpers/logger', () => ({
  log: jest.fn()
}));

describe('Init', () => {
  it('should throw error if xcode is not reachable', async () => {
    const {getFilePath} = require('../../helpers/config');
    const {getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getFilePath).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '/foo/bar/baz/.xcodeversionrc';
    });
    mock(getCurrentVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return;
    });

    const {init} = require('../init');

    const result = init();

    await expect(result).rejects.toThrow(':x: Xcodebuild is not reachable. Check that Xcode is installed and in your PATH.');
    expect(log).not.toHaveBeenCalled();
  });

  it('should throw error if version is not used', async () => {
    const {getFilePath} = require('../../helpers/config');
    const {getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getFilePath).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '/foo/bar/baz/.xcodeversionrc';
    });
    mock(getCurrentVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });

    const {init} = require('../init');

    const result = init();

    await expect(result).rejects.toThrow(':x: Xcode config file (.xcodeversionrc) not written.');
    expect(log).not.toHaveBeenCalled();
  });

  it('should return true', async () => {
    const {getFilePath} = require('../../helpers/config');
    const {getCurrentVersion} = require('../../helpers/xcode');
    const {log} = require('../../helpers/logger');
    mock(getFilePath).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '/foo/bar/baz/.xcodeversionrc';
    });
    mock(getCurrentVersion).mockImplementationOnce(async (...args) => {
      expect(args).toEqual([]);
      return '10.2';
    });

    mockFs({
      '/foo/bar/baz': {}
    });

    const {init} = require('../init');

    const result = await init();

    expect(result).toBeTruthy();
    expect(log).toHaveBeenCalledWith('<green>:tada: Xcode config file created with 10.2.</green>', '(/foo/bar/baz/.xcodeversionrc)');
  });

  afterEach(() => {
    const {log} = require('../../helpers/logger');

    mockFs.restore();
    log.mockClear();
  });
});
