module.exports = {
  moduleDirectories: [
    'node_modules',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/esm/',
    '/.vscode/',
    '/.history/',
  ],
  timers: 'fake',
  collectCoverage: true,
  coverageDirectory: './coverage/jest',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
