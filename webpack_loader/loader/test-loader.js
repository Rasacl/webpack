/*
* loader就是一个函数
* 接受的是loader的参数，第一个参数是内容字符串 后面是当前文件的路径和配置项
*   content  当前文件的内容
*   map  当前文件的SourceMap
*   meta  别的loader传递过来的数据
*
* 返回值是新的字符串或者Buffer
* 返回的字符串会被作为模块的请求者
* 返回的Buffer会被转为字符串
* 如果返回undefined，那么这个loader就无效了
* 如果返回false，那么这个loader也无效了，但是会传递到下一个loader
* 如果返回数组，数组中的所有元素都会作为请求来处理
* 如果返回对象，那么loader的结果就是这个对象
* 如果返回Promise，那么loader的结果就是这个Promise的结果
* 如果返回错误，那么loader的结果就是这个错误
* 如果返回函数，那么loader的结果就是这个函数
* 如果返回空字符串，那么loader的结果就是空字符串
* 如果返回null，那么loader的结果就是null
* 如果返回undefined，那么loader的结果就是undefined
* 如果返回true，那么loader的结果就是true
* 如果返回false，那么loader的结果就是false
* 如果返回数字，那么loader的结果就是这个数字
* 如果返回正则表达式，那么loader的结果就是这个正则表达式
* */
module.exports = function (content, map, meta){
    console.log(content)
    return content
}
