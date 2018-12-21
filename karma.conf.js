
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['test/main.js'],
        exclude: [],
        preprocessors: {
            'test/main.js': ['webpack', 'sourcemap']
        },
        webpack: require('./config/webpack.test')({env: 'test'}),
        reporters: [
            'progress',
            'kjhtml',
            'coverage-istanbul'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'Safari'],
        singleRun: false,
        concurrency: Infinity,
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [
                    '--headless'
                ]
            }
        },
        coverageIstanbulReporter: {
            reports: ['html'],
            dir: 'coverage',
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: false
        }
    })
};
