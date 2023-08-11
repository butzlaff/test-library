const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', "<rootDir>/__tests__/helpers",
  "<rootDir>/__tests__/__mocks__", "<rootDir>/__tests__/__utils__", "<rootDir>/__tests__/__fixtures__"],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)