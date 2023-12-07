const common = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');


module.exports = merge(common, {
    output: {
        filename: 'js/[name].[contenthash:12].js',
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            '...', //keep existing minimizers
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {removeAll: true}
                        }
                    ]
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, '../src/')}/**/*`,
                {nodir: true}
            )
        })
    ]
})