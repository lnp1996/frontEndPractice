s = "MCMXCIV"
map = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000]
])
list = []
for (var i = 0; i < s.length; i++) {
    // if (map.get(s[i]) < map.get(s[i + 1])) {
    //     return map.get(s[i + 1]) - map.get(s[i])
    // }
    list.push(map.get(s[i]))
}
result = 0
for(var i=0;i<list.length;i++){
    result += list[i]
}
console.log(result)
// return list
