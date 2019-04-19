<!-- <p align="center">
  <img height="400" src="https://github.com/VincentCATILLON/xcodeversion/raw/master/.github/demo.gif" alt="Xcodeversion">
</p> -->

[![CircleCI](https://circleci.com/gh/VincentCATILLON/xcodeversion.svg?style=svg)](https://circleci.com/gh/VincentCATILLON/xcodeversion)

## Installation

```console
npm install xcodeversion
# or
yarn add xcodeversion
```

## Usage

Create a `.xcodeversionrc` file on your project root:

```console
xcodeversion init
```

_**Note**: This will create a .xcodeversionrc file with your Xcode current version_

##### Check

To check that your Xcode version matches the current one specified in `.xcodeversionrc`:

```console
xcodeversion check
```

or in your `package.json`:

```json
{
  "postinstall": "xcodeversion check"
}
```

##### Use

To use the version specified in your `.xcodeversionrc` file:

```console
xcodeversion use
```

_**Note**: This commands needs to be root._

## Available versions
