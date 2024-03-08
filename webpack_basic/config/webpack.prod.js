const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");
// nodejs核心模块，直接使用
const os = require("os");  // 获取cpu核数 多线程打包
// cpu核数
const threads = os.cpus().length;

function getStyleLoader(pre){
    return [ // 执行顺序 从右到左（从下到上）
        MiniCssExtractPlugin.loader, //提取css到同一个文件
        'css-loader',
        { //处理css的兼容性问题
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre
    ].filter(Boolean)
}
module.exports = {
    //入口
    entry: "./src/main.js",
    //输出
    output: {
        //文件输出路劲
        path: path.resolve(__dirname,'../dist'), //所有文件输出目录
        //文件名
        filename: "js/main.js",
        clean: true, // 自动清除上次打包内容
    },
    //loader加载器
    module: {
        rules: [
            // loader配置
            {
                oneOf: [ // 匹配规则 匹配成功则停止匹配
                    {
                        test: /\.css$/, //只检测css文件
                        use:getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader('less-loader')
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp)$/, //处理图片资源
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 30 * 1024, // 10kb 以下使用 base64 格式 优点：减少请求数量，减少请求时间 缺点：会增大文件体积
                                // mimeType: "image/png", //只处理 png 类型的图
                            }
                        },
                        generator: {
                            filename: "asset/images/[name][ext]" //配置图片文件打包路径 "images/[hash:10][ext]"
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/, //处理字体图标
                        type: "asset/resource",
                        generator: {
                            filename: "asset/font/[name][ext]" //配置图片文件打包路径 "images/[hash:10][ext]"
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // 排除node_modules代码不编译
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"], // 或者在babel.config里面写
                                    cacheDirectory: true, // 开启babel编译缓存
                                    cacheCompression: false, // 缓存文件不要压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                }
                            }
                        ]
                    },
                ]
            }
        ]
    },
    //插件
    plugins: [
        // 插件配置
        new EslintPlugin({
            context:path.resolve(__dirname,'../src'), // 指定要检查的目录
            // extensions: '.js,.vue',// 检查文件扩展名
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        }),
        //css压缩
        new CssMinimizerPlugin(),
        // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
        new TerserPlugin({
            parallel: threads // 开启多进程
        })
    ],
    // optimization: { // 压缩也可以放在这里
    //     minimize: true,
    //     minimizer: [
    //         // css压缩也可以写到optimization.minimizer里面，效果一样的
    //         new CssMinimizerPlugin(),
    //         // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
    //         new TerserPlugin({
    //             parallel: threads // 开启多进程
    //         })
    //     ],
    // },
    //模式
    mode: 'production',
    devtool: "source-map",
}
