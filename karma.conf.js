

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'test/main.js', watched: false }
        ],
        exclude: [],
        preprocessors: {
            'test/main.js': ['webpack', 'sourcemap']
        },
        webpack: require('./config/webpack.test')({env: 'test'}),
        reporters: [
            'progress'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
};
