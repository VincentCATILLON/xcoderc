// @flow

declare module 'pkg-dir' {
  declare module.exports: {
    string: Promise<string | void>;
    sync(string): string | void;
  };
}
