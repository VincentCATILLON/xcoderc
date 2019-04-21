// @flow

const nativeLog = jest.spyOn(global.console, 'log');

describe('Logger', () => {
  describe('log', () => {
    it('should print data to terminal', () => {
      const {log} = require('./logger');

      log('foo', 'bar', 'baz');

      expect(nativeLog).toHaveBeenCalledWith('foo', 'bar', 'baz');
    });
  })
})
