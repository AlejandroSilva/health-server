var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  [
        // WebpackDevServer host and port
        'webpack-dev-server/client?http://0.0.0.0:3000/',
        // "only" prevents reload on syntax errors
        'webpack/hot/only-dev-server',
        // Appʼs entry point
        './app/client/index.jsx'
    ],
    output: {
        path:     path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //resolve: {
    //    modulesDirectories: ['node_modules', 'shared'],
    //    extensions:         ['', '.js', '.jsx']
    //},
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    //devtool: 'inline-source-map',
    //devServer: {
    //    hot: true,
    //    proxy: {
    //        //'*': 'http://localhost:' + (process.env.PORT || 8888)
    //        '*': 'http://localhost:' + 8888
    //    }
    //}
};