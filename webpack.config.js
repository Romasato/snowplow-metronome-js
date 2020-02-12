const path = require('path');
const webpack = require('webpack');
const WebpackCopyPlugin = require('copy-webpack-plugin');

const webpackConfig = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist/'),
        publicPath: './dist'
    },
    module: {
        rules: [
           /* {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },*/
            {
                test: /\.(tsx?|jsx?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.spa.json'
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: './fonts'
                        }
                    }
                ]
            },
            {
                test: /.(mp3|ogg|mp4)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'audio/',
                            publicPath: './audio'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackCopyPlugin([
            { from: 'www', to: './' }
        ]),
    ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts'
        ]
    }
};

module.exports = webpackConfig;
