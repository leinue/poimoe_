module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './dist/build.js'
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.css'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
        }
    }
}
