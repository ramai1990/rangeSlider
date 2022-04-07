/* eslint-disable @typescript-eslint/no-var-requires */
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: [
      { pattern: 'src/**/*.spec.ts', watched: false },
      { pattern: 'node_modules/jquery/dist/jquery.min.js', watched: false },
    ],
    preprocessors: {
      'src/**/*.ts': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    logLevel: config.LOG_INFO,
    coverageIstanbulReporter: {
      reports: ['text', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    singleRun: true,
  });
};
