// @flow

export type Path = string;

export type Version = string;

export type Versions = {
  [Version]: Path
};

export type Command = 'check' | 'init' | 'use';

export type Logger = {|
  log: (...args: any) => void,
  error: (...args: any) => void
|};
