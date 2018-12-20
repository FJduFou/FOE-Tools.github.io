module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    // process js with `babel-jest`
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1"
  },
  setupFiles: ["<rootDir>/test/unit/setup"],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/pages/**",
    "!**/test/**",
    "!**/*.config.js",
    "!**/components/**/script.js",
    "!**/layouts/**/script.js",
    "!**/pages/**/script.js"
  ],
  coverageReporters: ["html", "text", "text-summary"]
};