module.exports = {
    env: {
        browser: true, //浏览器环境定义
        // commonjs: true, //CommonJS 环境定义
        // es6: true, //启用所有 ECMAScript 6 特性（该设置会自动设置 ecmaVersion 解析器选项到 6）
        node: true //Node.js 环境定义
    },
    //解析项
    parserOptions: {
        ecmaVersion: 6, //es语法版本 默认是5 设置为6 如果要使用es6的新特性
        sourceType: 'module', //脚本或模块 默认是脚本 script或module
        ecmaFeatures: { //es的其他新特性
            // jsx: true // 开启jsx语法 如果是react
        }
    },
    //具体检查规则
   //  "off" 或 0 - 关闭规则
   //  "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    rules: {
        'no-var': "error", //不允许使用 var 声明变量，要求使用 let 或 const 代替
    },
    //继承其他规则 开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则
    extends: ['eslint:recommended']
}
