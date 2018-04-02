const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    mode: 'development',
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'FELLOWSEBLAB_API_URL': JSON.stringify('https://szkg4s33n0.execute-api.eu-west-1.amazonaws.com/dev')
        })
    ]
});
