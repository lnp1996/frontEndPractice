// 这个方法类似_.difference ，除了它接受一个 iteratee （注：迭代器）， 
// 调用array 和 values 中的每个元素以产生比较的标准。 
// 结果值是从第一数组中选择。iteratee 会调用一个参数：(value)。
// （注：首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值）。 
// 注意: 不像 _.pullAll，这个方法会返回一个新数组。
// 参数
// array (Array): 要检查的数组。
// [values] (...Array): 排除的值。
// [iteratee=_.identity] (Array|Function|Object|string): iteratee 调用每个元素。
// 返回值
// (Array): 返回一个过滤值后的新数组。
//搞不懂题目的迭代器！！！！！！！！！！！！！！！！！！！
function difference(array, args, iterator) {
    var result = []
    arrar2 = array.map((item, index, array) => {
        return iterator.apply()
    })
    for (var i of array) {
        if (args.indexOf(i) === -1) {
            result.push(i)
        }
    }

    return result
}

console.log(difference([3, 2, 1], 1))