module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',  
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    roots:['<rootDir>/dist/'],
    testMatch: ["**/?(*.)+(spec|test).js"],
    reporters: ['default','jest-github-actions-reporter'],
    testLocationInResults: true
  };