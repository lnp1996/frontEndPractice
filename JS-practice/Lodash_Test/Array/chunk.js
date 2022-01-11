// 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 
// 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
// 参数
// array (Array): 需要处理的数组
// [size=1] (number): 每个数组区块的长度
// 返回
// (Array): 返回一个包含拆分区块的新数组（注：相当于一个二维数组）。
function chunk(array, size) {
    var count = Math.ceil(array.length / size)
    var lastEnd = 0
    var list = []
    for (var i = 0; i < count; i++) {
        var array2 = array.slice(lastEnd, lastEnd + size)
        lastEnd += size
        list.push(array2)
    }
    return list
}

console.log(chunk(['a', 'b', 'c', 'd'], 2))
console.log(chunk(['a', 'b', 'c', 'd'], 1))