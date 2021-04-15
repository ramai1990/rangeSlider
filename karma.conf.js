module.exports = (config) => {
  config.set({
    files: ['src/test/**/*.test.js'],
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    preprocessors: {
      'src/test/**/*.test.js': ['webpack'],
    },
    plugins: [
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-webpack'
    ],
    browsers: ['Chrome'],
    singleRun: true,
    webpack: {
      mode: 'development'
    },
  })
}