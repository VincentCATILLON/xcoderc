// @flow

import {COMMAND} from '../const';
import {mock} from '../__mocks__';

jest.mock('../actions/check', () => jest.fn());
jest.mock('../actions/init', () => jest.fn());
jest.mock('../actions/use', () => jest.fn());

describe('Index', () => {
  it('should handle default action: check', async () => {
    const check = require('../actions/check');
    const init = require('../actions/init');
    const use = require('../actions/use');

    const call = require('..').default;

    await call();

    expect(check).toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(use).not.toHaveBeenCalled();
  });

  it('should handle init', async () => {
    const check = require('../actions/check');
    const init = require('../actions/init');
    const use = require('../actions/use');

    const call = require('..').default;

    await call(COMMAND.INIT);

    expect(check).not.toHaveBeenCalled();
    expect(init).toHaveBeenCalled();
    expect(use).not.toHaveBeenCalled();
  });

  it('should handle use', async () => {
    const check = require('../actions/check');
    const init = require('../actions/init');
    const use = require('../actions/use');

    const call = require('..').default;

    await call(COMMAND.USE);

    expect(check).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(use).toHaveBeenCalled();
  });

  it('should throw error if command not supported', async () => {
    const check = require('../actions/check');
    const init = require('../actions/init');
    const use = require('../actions/use');

    const call = require('..').default;

    // $FlowFixMe this is to emulate an invalid command
    const result = call('coffee');

    await expect(result).rejects.toThrow(':question: Unknown command: coffee');
    expect(check).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(use).not.toHaveBeenCalled();
  });

  afterEach(() => {
    const check = require('../actions/check');
    const init = require('../actions/init');
    const use = require('../actions/use');

    mock(check).mockClear();
    mock(init).mockClear();
    mock(use).mockClear();
  });
});
