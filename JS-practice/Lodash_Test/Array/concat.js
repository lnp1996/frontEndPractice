// 创建一个新数组，将array与任何数组 或 值连接在一起。
// 参数
// array (Array): 被连接的数组。
// [values] (...*): 连接的值。
// 返回值
// (Array): 返回连接后的新数组。

function concat(array, ...args) {
    var result = array.concat(...args)
    return result
}

console.log(concat([1], 2, [3], [
    [4]
]))