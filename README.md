<p align="center" style="padding-top: 32px; padding-bottom: 32px">
  <img height="256" src="./.github/logo.png" alt="xcoderc">
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
$ xcoderc init
```

For your information, the file content should look like: `9.4`

_**Note**: This will create a .xcoderc file with your current Xcode version_

## Usage

<img src="https://github.com/VincentCATILLON/xcoderc/raw/master/.github/terminal.png" alt="xcoderc">

---

##### Check

To automatize the Xcode version check specified in `.xcoderc`, you can add it to your `package.json`:

```json
{
  "postinstall": "xcoderc"
}
```

---

##### Use

To use the version specified in your `.xcoderc` file:

```console
$ [sudo] xcoderc use
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
