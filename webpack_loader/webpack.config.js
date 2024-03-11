const path = require('path')

const HtmlWebpack = require('html-webpack-plugin')
module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name].js',
        clean:true,
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'./loader/test-loader.js'
            }
        ]
    },
    plugins:[
        new HtmlWebpack({
            template:path.resolve(__dirname,'public/index.html')
        })
    ],
    mode:'development'
}
