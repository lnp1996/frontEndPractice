
function User(name) {
    this.name = name;
    this.isAdmin = false;
}
let user = new User("lnp")
console.log(user.name,user.isAdmin)

// 模拟new
"use strict"
// 构造函数
function User(name) {
    this.name = name;
    this.isAdmin = false;
}
// new函数
function new2(func,arg){
    func.call(this,arg)
    return this
}
let user = new2.call({},User,"lnp")
console.log(user.name,user.isAdmin)