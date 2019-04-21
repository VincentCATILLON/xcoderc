// @flow

jest.mock('node-emoji', () => ({
  get: jest.fn(alias => `:${alias}:`)
}));

jest.mock('shelljs', () => ({
  exec: jest.fn(() => Promise.reject(new Error('You have to mock the return value.')))
}));
