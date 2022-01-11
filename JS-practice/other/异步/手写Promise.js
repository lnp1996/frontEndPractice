function MyPromise(func) {
    // preomise的状态
    this.promiseState = "pending"
    // promise的值 
    this.promiseResult = undefined
    // 用来注册then中的callback
    this.thenCallback = undefined
    // 用来注册catch中的callback
    this.catchCallback = undefined
    // 用来注册finally中的callback
    this.finallyCallback = undefined

    var _this = this

    var resolve = function (value) {
        if (_this.promiseState == "pending") {
            _this.promiseState = "fulfilled"
            _this.promiseResult = value
            if (value instanceof MyPromise) {
                // 内部调用一下then 来解析MyPromise对象类型的值
                value.then(function (res) {
                    if (_this.thenCallback) {
                        _this.thenCallback(res)
                    }
                })
            } else {
                // 异步来获取后面then的回调函数
                setTimeout(function () {
                    // console.log(_this)
                    if (_this.thenCallback) {
                        _this.thenCallback(value)
                    } else if (_this.catchCallback) {
                        // promise对象后面跟的是then,也触发catch回调，继续向下传递(保证resolve能够继续传递到finally)
                        _this.catchCallback(value)
                    } else if (_this.finallyCallback) {
                        _this.finallyCallback()
                    }
                });
            }
        }
    }

    var reject = function (errValue) {
        if (_this.promiseState == "pending") {
            _this.promiseState = "rejected"
            _this.promiseResult = errValue
            if (errValue instanceof MyPromise) {
                errValue.catch(function (res) {
                    if (_this.catchCallback) {
                        _this.catchCallback(res)
                    }
                })
            } else {
                setTimeout(function () {
                    if (_this.catchCallback) {
                        _this.catchCallback(errValue)
                    } else if (_this.thenCallback) {
                        // promise对象后面第一个跟的是then,没有注册catch回调，也触发then回调，向下传递(保证能执行到catch)
                        _this.thenCallback(errValue)
                    } else if (_this.finallyCallback) {
                        _this.finallyCallback()
                    } else {
                        // 没有注册异常回调则报错
                        throw ("catch is not defined")
                    }
                })
            }
        }
    }

    if (func) {
        func(resolve, reject)
    }

}

MyPromise.prototype.then = function (callback) {
    var _this = this
    return new MyPromise(function (resolve, reject) {
        _this.thenCallback = function (value) {
            // 在使用链式调用的时候，可能第一个调用的不是catch，
            // 所以我们在检测时借助then来继续将catch信息向下传递，
            // 所以我们检测到状态是rejected时，我们就继续调用下一个状态的reject
            if (_this.promiseState == "rejected") {
                // reject执行rejeced状态下触发then回调, 不回调，跳过then
                reject(value)
            } else {
                // resolve执行fulfilled状态下触发then回调，正常回调
                var result = callback(value)
                // 自动进行后面then链式调用
                if (result instanceof MyPromise && result.promiseState == "rejected") {
                    // 中断执行功能：捕获catch防止报错，去找后面的catch进行执行
                    result.catch(function (err) {
                        reject(err)
                    })
                } else {
                    resolve(result)
                }
            }
        }
    })
}
MyPromise.prototype.catch = function (callback) {
    var _this = this
    return new MyPromise(function (resolve, reject) {
        _this.catchCallback = function (value) {
            // 在使用链式调用的时候，执行catch之后也要继续传递到finally，
            // 所以我们在检测时借助then来将新的Promise继续向下传递，
            // 所以我们检测到状态是fulfilled时，我们就要跳过catch的执行，调用下一个状态的resolve，
            // 以至于将新的Promise传递到finally,从而触发finally的执行
            if (_this.promiseState == "fulfilled") {
                // resolve执行后fulfilled状态下触发catch回调, 不回调，跳过catch
                resolve(value)
            } else {
                // reject执行rejected状态下触发catch回调，正常回调
                var result = callback(value)
                resolve(result)
            }
        }
    })
}

MyPromise.prototype.finally = function (callback) {
    var _this = this
    return new MyPromise(function (resolve, reject) {
        _this.finallyCallback = function () {
            var result = callback()
            resolve(result)
        }
    })
}

MyPromise.resolve = function (value) {
    return new MyPromise(function (resolve, reject) {
        resolve(value)
    })
}
MyPromise.reject = function (value) {
    return new MyPromise(function (resolve, reject) {
        reject(value)
    })
}
MyPromise.all = function (arr) {
    let resArr = []
    return new MyPromise(function (resolve, reject) {
        arr.forEach((item, index) => {
            console.log(item)
            item.then(function (res) {
                resArr[index] = res
                var allResolve = arr.every(_item => {
                    return _item.promiseState == "fulfilled"
                })
                if (allResolve) {
                    resolve(resArr)
                }
            }).catch(function (err) {
                reject(err)
            })
        });
    })
}
MyPromise.race = function (arr) {
    return new MyPromise(function (resolve, reject) {
        arr.forEach((item, index) => {
            item.then(function (res) {
                resolve(res)
            }).catch(function (err) {
                reject(err)
            })
        });
    })
}

// 测试race API
// var p1 = new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         // resolve("第1个promise执行完毕")
//         reject("第1个promise执行失败")
//     }, 1000);
// })
// var p2 = new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve("第2个promise执行完毕")
//     }, 2000);
// })
// var p3 = new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve("第3个promise执行完毕")
//     }, 300);
// })

// MyPromise.race([p1, p3, p2]).then(function (res) {
//     console.log(res)
// }).catch(function (err) {
//     console.error(err)
// })

// 测试all API----------------------------------------
// var p1 = new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         // resolve("第1个promise执行完毕")
//         reject("第1个promise执行失败")
//     }, 1000);
// })
// var p2 = new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve("第2个promise执行完毕")
//     }, 2000);
// })
// var p3 = new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve("第3个promise执行完毕")
//     }, 3000);
// })

// MyPromise.all([p1, p3, p2]).then(function (res) {
//     console.log(res)
// }).catch(function (err) {
//     console.error(err)
// })



// 测试finally--------------------------
var p = new MyPromise(function (resolve, reject) {
    // reject("错误的值")
    resolve("值")
})
// console.log(p)
var p1 = p.then(function (res) {
    console.log(res)
    console.log("0then执行")
    return 0
}).then(function (res) {
    console.log(res)
    console.log("1then执行")
    return MyPromise.reject("中断他")
}).catch(function (err) {
    console.log(err)
    console.log("catch执行")
    return 456
}).finally(function () {
    console.log("finally执行")
})

// console.log(p1)

// 测试catch--------------------------
// var p = new MyPromise(function (resolve, reject) {
//     // reject("错误的值")
//     resolve("值")
// })
// console.log(p)
// var p1 = p.then(function (res) {
//     console.log(res)
//     console.log("0then执行")
//     return 0
// }).then(function (res) {
//     console.log(res)
//     console.log("1then执行")
//     return MyPromise.reject("中断他")
// }).then(function (res) {
//     console.log(res)
//     console.log("2then执行")
//     return 2
// }).catch(function (err) {
//     console.log(err)
//     console.log("catch执行")
//     return 456
// })
// console.log(p1)


// 测试then-----------------------------
// var p = new MyPromise(function (resolve, reject) {
//     // reject("错误的值")
//     resolve("值")
// })
// console.log(p)
// var p1 = p.then(function (res) {
//     console.log(res)
//     console.log("then执行")
//     return 123
// }).then(function (res) {
//     console.log(res)
//     console.log("then执行")
// }).then(function (res) {
//     console.log(res)
//     console.log("then执行")
//     return MyPromise.resolve("我是第3个promise的值")
// }).then(function (res) {
//     console.log(res)
//     console.log("then执行")
// })

// 测试异步流程控制----------------------
// var p1 = p.then(function (res) {
//     console.log("第一个then执行")
//     return new MyPromise(function (resolve, reject) {
//         setTimeout(() => {
//             resolve()
//         }, 1000);
//     })
// }).then(function (res) {
//     console.log(res)
//     console.log("第二个then执行")
//     return new MyPromise(function (resolve, reject) {
//         setTimeout(() => {
//             resolve()
//         }, 1000);
//     })
// }).then(function (res) {
//     console.log(res)
//     console.log("then执行")
//     return MyPromise.resolve("我是第3个promise的值")
// }).then(function (res) {
//     console.log(res)
//     console.log("then执行")
// })


// 注意点：
// 1. 如何在调用resolve的时候触发then的执行（并且是异步的）？
//     答：在resolve执行时，then还没有执行，因此无法获取到then的回调函数，所以对于同步来说是一个伪命题，
//     因此可以考虑异步，我们知道异步代码将在所有同步执行完之后执行，因此在resolve函数中设置settimeout宏任务，
//     这个宏任务将在then执行后再执行，因此在宏任务执行时就可以知道then的回调函数，就可以进行回调了。
// 2. 如何实现链式调用 ？
//     答：链式调用的基础思想要掌握，就是返回自身或者相同的对象，Pormise就采用，
//     返回一个新的Promise对象来实现链式调用
// 3. 如何处理resolve参数/then返回值的各种类型的兼容？
//     答：参数为Promise对象的时候，不能把对象往后面传，而是要把Promise的resolve的结果往后面传；
//     当然了，then的返回值也是同样的道理，因为链式调用要求then执行完毕之后的新的Promise对象自动调用resolve，
//     并将then回调的返回值作为参数，因此，只要处理resolve参数类型兼容即可
// 4. 用户没写catch要报错?
//     答：异步任务监听注册的回调函数，如果没有，就抛出异常
// 5. 先写then后写catch，reject就不能触发catch的执行？
//     答：第一个直接连着p对象的不管是then也好，catch也好，才会被直接注册到预设的回调函数中,
//     因此想要执行catch也要经过之前的then，需要进行跳过；
//     因此我们也得到结果：then回调执行的时候有可能两种状态：fulfiiled/rejected
