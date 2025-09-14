module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/?(*.)+(spec|test).(ts|tsx|js)'],
  moduleNameMapper: {
    '\\.svg\\?url$': '<rootDir>/__mocks__/svgMock.js',
    '\\.png$': '<rootDir>/__mocks__/imageMock.js',
  },
};
