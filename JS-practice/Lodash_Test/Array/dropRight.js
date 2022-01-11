// 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）

// 参数
// array (Array): 要查询的数组。
// [n=1] (number): 要去除的元素个数。
// 返回值
// (Array): 返回array剩余切片。
function dropRight(array, n = 1) {
    if (n >= array.length) {
        return []
    }
    var result = array.slice(0, array.length - n)
    return result
}
console.log(dropRight([1, 2, 3], 0))