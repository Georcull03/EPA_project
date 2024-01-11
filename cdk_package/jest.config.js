module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // }
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  preset: 'ts-jest',

};
