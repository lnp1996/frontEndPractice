// 创建一个新数组，包含原数组中所有的非假值元素。
// 例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
// 参数
// array (Array): 待处理的数组
// 返回值
// (Array): 返回过滤掉假值的新数组。


function compact(array) {
    var result = array.filter((item, index, array) => {
        if (item) {
            return item
        }
    })
    return result
}
console.log(compact([1, false, null, 0, "", undefined, NaN, 4]))