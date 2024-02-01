const common = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    output: {
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist'),
            directory: path.resolve(__dirname, '../images')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true,
        },
        client: {
            overlay: true
        },
        liveReload: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[md4:hash:7]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|svg|png)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: './images/[name].[ext]'
                }
            }
        ]
    }
})
