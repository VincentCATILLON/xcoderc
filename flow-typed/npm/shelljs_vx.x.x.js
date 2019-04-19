// @flow

declare module 'shelljs' {
  declare type Options = {|
    silent: boolean
  |};

  declare class Class {
    static exec: (string, Options) => Promise<any>
  }

  declare export default typeof Class
}
