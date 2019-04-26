<p align="center">
  <br>
  <img height="256" src="https://github.com/VincentCATILLON/xcoderc/raw/master/.github/logo.png" alt="xcoderc">
  <br>
  <br>
</p>

[![CircleCI](https://circleci.com/gh/VincentCATILLON/xcoderc.svg?style=svg)](https://circleci.com/gh/VincentCATILLON/xcoderc)
[![codecov](https://codecov.io/gh/VincentCATILLON/xcoderc/branch/master/graph/badge.svg?token=aiXSI86rRD)](https://codecov.io/gh/VincentCATILLON/xcoderc)

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
    # Define a xcode:check command in your package.json ("xcode:check": "xcoderc")
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
