module.exports = (config) => {
  config.set({
    file: ['src/test/**/*.test.js'],
    frameworks: ['jasmine'],
    reporter: ['mocha'],
    preprocessors: {
      'src/test/**/*.test.js': ['webpack'],
    },
    plugins: [
      'karma-jasmine',
      'karma-mocha-repoter',
      'karma-chrome-launcher',
      'karma-webpack',
    ],
    browsers: ['Chrome'],
    singleRun: true,
    webpack: {
      mode: 'development'
    }
  })
}