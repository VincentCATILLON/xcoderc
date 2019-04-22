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

## Prerequisite

You need a `.xcodeversionrc` file on your project root to lock the Xcode version.

```console
xcodeversion --init
```

For your information, the file content should look like: `9.4`

_**Note**: This will create a .xcodeversionrc file with your Xcode current version_

## Usage

##### Check

To check that your Xcode version matches the current one specified in `.xcodeversionrc`:

```console
xcodeversion
```

or in your `package.json`:

```json
{
  "postinstall": "xcodeversion"
}
```

##### Use

To use the version specified in your `.xcodeversionrc` file:

```console
xcodeversion --use
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
