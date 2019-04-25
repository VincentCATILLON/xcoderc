// @flow

jest.mock('node-emoji', () => ({
  get: jest.fn(alias => `:${alias}:`)
}));

jest.mock('shelljs', () => ({
  exec: jest.fn(() => Promise.reject(new Error('You have to mock the return value.')))
}));

jest.mock('chalk', () => ({
  red: jest.fn(message => `<red>${message}</red>`),
  green: jest.fn(message => `<green>${message}</green>`),
  blue: jest.fn(message => `<blue>${message}</blue>`),
  yellow: jest.fn(message => `<yellow>${message}</yellow>`)
}));
