var path = require("path");
module.exports = function karmaConfig(config) {
    config.set({

        browsers: [ 'Chrome' ],

        singleRun: true,

        frameworks: [ 'mocha' ],

        files: [
            'web/client/libs/Cesium/Build/Cesium/Cesium.js',
            'tests-travis.webpack.js',
            { pattern: './web/client/test-resources/**/*', included: false },
            { pattern: './web/client/translations/**/*', included: false }
        ],

        preprocessors: {
            'tests-travis.webpack.js': [ 'webpack', 'sourcemap' ]
        },

        reporters: [ 'mocha', 'coverage', 'coveralls' ],

        junitReporter: {
            outputDir: './web/target/karma-tests-results',
            suite: ''
        },

        coverageReporter: {
            dir: './coverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                { type: 'lcovonly', subdir: '.' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },

        webpack: {
            devtool: 'eval',
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /(__tests__|node_modules|legacy|libs\\Cesium|libs\\html2canvas)\\|(__tests__|node_modules|legacy|libs\/Cesium|libs\/html2canvas)\/|webpack\.js|utils\/(openlayers|leaflet)/,
                        enforce: "pre",
                        use: [
                            {
                                loader: 'babel-istanbul-loader'
                            }
                        ]
                    },
                    {
                        test: /\.jsx?$/,
                        exclude: /(ol\.js$|node_modules)/,
                        use: [
                            {
                                loader: 'babel-loader'
                            }
                        ],
                        include: path.join(__dirname, "web", "client")
                    },
                    {
                        test: /\.css$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }]
                    },
                    {
                        test: /\.less$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }, {
                            loader: 'less-loader'
                        }]
                    },
                    {
                        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                mimetype: "application/font-woff"
                            }
                        }]
                    },
                    {
                        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: "[name].[ext]"
                            }
                        }]
                    },
                    {
                        test: /\.(png|jpg|gif|svg)$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                name: "[path][name].[ext]",
                                limit: 8192
                            }
                        }] // inline base64 URLs for <=8k images, direct URLs for the rest
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.json', '.jsx']
            }
        },

        webpackServer: {
            noInfo: true
        }

    });
};
