let range = {
    from: 1,
    to:5
}

// 为普通对象添加Symbol.iterator方法
range[Symbol.iterator] = function(){
    // 返回可迭代对象
    return {
        curr:this.from,
        last:this.to,
        next() {
            // 返回 {done:.., value :...} 格式的对象
            if(this.curr<=this.last){
                return {done:false,value:this.curr++}
            }else{
                return {done:true}
            }
        }
    }
}
// 现在它可以运行了！
for (let num of range) {
    alert(num); // 1, 然后是 2, 3, 4, 5
  }