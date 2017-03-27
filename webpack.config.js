/**
 * Created by zwy on 17-3-24.
 */
const path = require('path');

module.exports = {
    entry: './frontsrc/index.js',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'front')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};