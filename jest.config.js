module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.css$" // Ignore CSS files
  ],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/RegisterPage.css.js",
    // eslint-disable-next-line no-dupe-keys
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/ConfirmationPage.css.js",
    // eslint-disable-next-line no-dupe-keys
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/Footer.css.js"

  }
};
