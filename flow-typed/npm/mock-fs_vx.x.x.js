// @flow

declare module 'mock-fs' {
  declare type Path = {
    [string]: Path
  };

  declare export default (Path) => void;
}
