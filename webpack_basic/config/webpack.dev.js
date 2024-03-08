const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
// nodejs核心模块，直接使用
const os = require("os");  // 获取cpu核数 多线程打包
// cpu核数
const threads = os.cpus().length;
module.exports = {
    //入口
    entry: "./src/main.js",
    //输出
    output: {
        //文件输出路劲
        path: undefined, //所有文件输出目录 开发模式没有输出
        //文件名
        filename: "main.js",
        clean: true, // 自动清除上次打包内容
    },
    //loader加载器
    module: {
        rules: [
            // loader配置
            {
                oneOf: [ // 只匹配一个规则
                    {
                        test: /\.css$/, //只检测css文件
                        use: [ // 执行顺序 从右到左（从下到上）
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: ['style-loader','css-loader', 'less-loader']
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
                        // exclude: /node_modules/, // 排除node_modules代码不编译
                        include: path.resolve(__dirname, "../src"), // 也可以用包含
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
            exclude: "node_modules", // 默认值
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
        })
    ],
    // 开发服务器 不会输出资源 在内存中编译打包
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    },
    //模式
    mode: 'development',
    devtool: "cheap-module-source-map",
}
