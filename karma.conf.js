module.exports = function (config)
{
    config.set({
        frameworks: ['jasmine'],
        files: ['test/main.js'],
        preprocessors: {
            'test/main.js': ['webpack', 'sourcemap']
        },
        webpack: require('./config/webpack.test.js'),
        reporters: [
            'progress',
            'kjhtml',
            'coverage-istanbul'
        ],
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'Safari'],
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
