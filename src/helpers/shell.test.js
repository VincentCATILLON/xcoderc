// @flow

jest.mock('shelljs', () => ({
  exec: jest.fn()
}));

describe('Shell', () => {
  describe('execute', () => {
    it('should return command result', async () => {
      const shelljs = require('shelljs');
      shelljs.exec.mockImplementation(command => {
        expect(command).toEqual('echo "foo"');

        return {
          stdout: 'foo'
        };
      });

      const {execute} = require('./shell');

      const result = await execute('echo "foo"');

      expect(result).toEqual('foo');
    });
  })
})
