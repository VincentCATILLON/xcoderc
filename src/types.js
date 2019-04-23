// @flow

export type Path = string;

export type Version = string;

export type Versions = {
  [Version]: Path
};

export type Command = '--init' | '--use';
