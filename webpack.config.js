module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['es2015', 'react'] }}
        ]
    },
    devServer: {
        contentBase: '.'
    }
};