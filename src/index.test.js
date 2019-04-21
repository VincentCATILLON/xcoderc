// @flow

import {COMMAND} from './_const';

jest.mock('./actions/check', () => jest.fn());
jest.mock('./actions/init', () => jest.fn());
jest.mock('./actions/use', () => jest.fn());

describe('Index', () => {
  it('should handle default action: check', async () => {
    const check = require('./actions/check');
    const init = require('./actions/init');
    const use = require('./actions/use');

    const call = require('.').default;

    await call();

    expect(check).toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(use).not.toHaveBeenCalled();
  });

  it('should handle init', async () => {
    const check = require('./actions/check');
    const init = require('./actions/init');
    const use = require('./actions/use');

    const call = require('.').default;

    await call(COMMAND.INIT);

    expect(check).not.toHaveBeenCalled();
    expect(init).toHaveBeenCalled();
    expect(use).not.toHaveBeenCalled();
  });

  it('should handle use', async () => {
    const check = require('./actions/check');
    const init = require('./actions/init');
    const use = require('./actions/use');

    const call = require('.').default;

    await call(COMMAND.USE);

    expect(check).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(use).toHaveBeenCalled();
  });

  it('should throw error if command not supported', async () => {
    const check = require('./actions/check');
    const init = require('./actions/init');
    const use = require('./actions/use');

    const call = require('.').default;

    const result = call('coffee');

    await expect(result).rejects.toThrow(':think: Unknown command: coffee');
    expect(check).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(use).not.toHaveBeenCalled();
  });

  afterEach(() => {
    const check = require('./actions/check');
    const init = require('./actions/init');
    const use = require('./actions/use');

    check.mockClear();
    init.mockClear();
    use.mockClear();
  });
});
