const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testPathIgnorePatterns: ["<rootDir>/.next", "<rootDir>/node_modules"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/config/(.*)$": "<rootDir>/tests/config/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  modulePaths: ["<rootDir>"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
