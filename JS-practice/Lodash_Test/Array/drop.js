// 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
// 参数
// array (Array): 要查询的数组。
// [n=1] (number): 要去除的元素个数。
// 返回值
// (Array): 返回array剩余切片。

function drop(array, number = 1) {
    var result = array.slice(number)
    return result
}

console.log(drop([1, 2, 3], 0))