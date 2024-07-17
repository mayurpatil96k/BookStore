module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json', 'jsx', 'tsx'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
};