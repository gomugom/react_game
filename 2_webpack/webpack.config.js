const path = require('path');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval', // 빠르게 하겠다
    
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client'],
    }, // input

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env', '@babel/preset-react'
                ]
            }
        }]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    } // output

};