<p align="center">
  <br>
  <img height="256" src="https://github.com/VincentCATILLON/xcoderc/raw/master/.github/logo.png" alt="xcoderc">
  <br>
  <br>
</p>

<p align="center">
  <i>Switching between iOS/MacOS projects <br>that use different Xcode versions won't by painful anymore.</i>
</p>

<br>

[![CircleCI](https://circleci.com/gh/VincentCATILLON/xcoderc.svg?style=shield)](https://circleci.com/gh/VincentCATILLON/xcoderc)
[![codecov](https://codecov.io/gh/VincentCATILLON/xcoderc/branch/master/graph/badge.svg?token=aiXSI86rRD)](https://codecov.io/gh/VincentCATILLON/xcoderc)
[![types](https://img.shields.io/npm/types/xcoderc.svg?color=e8bd36)](https://flow.org)
[![code style](https://img.shields.io/badge/code_style-eslint-463fd4.svg)](https://eslint.org/)
[![version](https://img.shields.io/npm/v/xcoderc.svg?color=cb3837)](https://www.npmjs.com/package/xcoderc)

## Installation

```console
npm install --save-dev xcoderc
# or
yarn add --dev xcoderc
```

## Init

You need a `.xcoderc` file on your project root to lock the Xcode version.

```console
$ npx xcoderc init
```

For your information, the file content should look like: `9.4`

_**Note**: This will create a .xcoderc file with your current Xcode version_

## Usage

<img src="https://github.com/VincentCATILLON/xcoderc/raw/master/.github/terminal.png" alt="xcoderc">

---

##### Check

To automatize the Xcode version check, you can use it in your `package.json`, ie:

```json
{
  "postinstall": "xcoderc"
}
```

or you can add it before your iOS build command, ie:

```json
{
  "prebuild:ios": "xcoderc",
  "build:ios": "xcodebuild"
}
```

or any script used to build your app, for example [Fastlane](https://fastlane.tools) (with [fastlane-plugin-yarn](https://github.com/joshrlesch/fastlane-plugin-yarn) plugin):

```ruby
platform :ios do
  before_all do
    # Define a command in your package.json like:
    # {
    #   "xcode:check": "xcoderc"
    # }
    yarn(command: 'xcode:check', package_path: '../package.json')
  end
end
```

---

##### Use

To use the version specified in your `.xcoderc` file:

```console
$ [sudo] npx xcoderc use
```

_**Note**: This commands needs to be root._

## Example versions (not exhaustive)

- 9
- 9.0.1
- 9.1
- 9.2
- 9.3
- 9.3.1
- 9.4
- 9.4.1
- 10
- 10.1
- 10.2
- 10.2.1
