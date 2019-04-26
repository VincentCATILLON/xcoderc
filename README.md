<!-- <p align="center">
  <img height="400" src="https://github.com/VincentCATILLON/xcoderc/raw/master/.github/demo.gif" alt="xcoderc">
</p> -->

<!-- @todo remove once public -->
[![CircleCI](https://circleci.com/gh/VincentCATILLON/xcoderc.svg?style=svg&circle-token=bef9f3f5b8ea78319a7ad86207df4d5dbbdb2e45)](https://circleci.com/gh/VincentCATILLON/xcoderc)
[![codecov](https://codecov.io/gh/VincentCATILLON/xcoderc/branch/master/graph/badge.svg?token=aiXSI86rRD)](https://codecov.io/gh/VincentCATILLON/xcoderc)

## Installation

```console
npm install xcoderc
# or
yarn add xcoderc
```

## Prerequisite

You need a `.xcoderc` file on your project root to lock the Xcode version.

```console
xcoderc init
```

For your information, the file content should look like: `9.4`

_**Note**: This will create a .xcoderc file with your current Xcode version_

## Usage

##### Check

To check that your Xcode version matches the current one specified in `.xcoderc`:

```console
xcoderc
# or
xcoderc check
```

or in your `package.json`:

```json
{
  "postinstall": "xcoderc"
}
```

##### Use

To use the version specified in your `.xcoderc` file:

```console
xcoderc use
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
