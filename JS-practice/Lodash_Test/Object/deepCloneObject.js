let user = {
    name:"lnp",
    sizes: {
        height:182,
        width:50
    }
}
newUser = clone(user)
console.log(newUser)
newUser.sizes.height = 200
console.log(newUser)
console.log(user)

/**
 * 深拷贝对象 ,之后可能扩展到数组
 * @param {object} obj 
 * return newObj
 */
 function clone(obj) {
    let newObj = {}
    for(let key in obj){
        if(typeof(obj[key]) === "object"){
            newObj[key] = clone(obj[key])
        }else{
            newObj[key] = obj[key]
        }
    }
    return newObj
}

