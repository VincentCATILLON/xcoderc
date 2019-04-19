// @flow

declare module 'pkg-dir' {
  declare type Module = string => Promise<string>;

  declare export default Module
}
