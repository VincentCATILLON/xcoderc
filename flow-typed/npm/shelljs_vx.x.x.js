// @flow

declare module 'shelljs' {
  declare type Options = {|
    silent: boolean
  |};

  declare type Result = {|
    stdout: string
  |};

  declare class Class {
    static exec: (string, Options) => Promise<Result>
  }

  declare export default typeof Class
}
