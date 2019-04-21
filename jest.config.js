// @flow

module.exports = {
  setupFiles: ['./jest-setup.js'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
  ],
  coverageThreshold: {
    'global': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  verbose: true
};
