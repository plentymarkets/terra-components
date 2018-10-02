

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'test/main.js', watched: false }
        ],
        exclude: [],
        preprocessors: {
            'test/main.js': ['webpack', 'sourcemap'],
            '**/src/*.js': 'coverage'
        },
        webpack: require('./config/webpack.test')({env: 'test'}),
        reporters: [
            'progress',
            'kjhtml',
            'coverage'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'Safari'],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    })
};
