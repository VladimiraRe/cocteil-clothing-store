const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const cssLoaders = (extra) => {
    const loaders = [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // Extract css to separate file
        'css-loader', // translates CSS into CommonJS
        'postcss-loader' // parse CSS and add vendor prefixes to CSS rules
    ];

    if (extra) loaders.push(extra);
    return loaders;
};

module.exports = {
    // Входной файл
    entry: ['./src/js/index.js'],

    // Выходной файл
    output: {
        filename: './js/bundle.js'
    },

    // Source maps для удобства отладки
    devtool: 'source-map',

    plugins: [
        // Подключаем файл html, стили и скрипты встроятся автоматически
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),

        // Кладем стили в отдельный файлик
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),

        // Копируем картинки
        new CopyWebpackPlugin({
            patterns: [{ from: './src/img', to: 'img' }]
        }),

        // Копируем json
        new CopyWebpackPlugin({
            patterns: [{ from: './src/db', to: 'db' }]
        })
    ],
    module: {
        rules: [
            // Транспилируем js с babel
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            // Работа с CSS
            {
                test: /\.css$/,
                use: cssLoaders()
            },

            // Компилируем SCSS в CSS
            {
                test: /\.scss$/,
                use: cssLoaders('sass-loader') // compiles Sass to CSS, using Node Sass by default
            },

            // Подключаем шрифты из css
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/inline'
            },

            // Подключаем картинки из css
            {
                test: /\.(svg|png|jpg|jpeg|webp)$/,
                type: 'asset/resource'
            }
        ]
    }
};
