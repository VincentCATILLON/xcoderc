// @flow

/* eslint-disable jest/no-jest-import */
// $FlowFixMe imported from flow-typed
import type {JestMockFn} from 'jest';
/* eslint-enable jest/no-jest-import */

export const mock = (mockFn: any): JestMockFn => mockFn;
