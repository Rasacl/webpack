const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode:'production',
    entry:{
        main:'./src/main.js',
        app:'./src/app.js'
    },

    output:{
        path:  path.resolve(__dirname,'dist'), //所有文件输出目录
        //文件名
        filename: '[name].js',
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html')
        })
    ]
}
