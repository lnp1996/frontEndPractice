// """缓存装饰器"""
function sum(...args) { //使用了...的rest语法，进行收集不定个参数成为数组
    return args.reduce((pre, curr, arr) => pre + curr, 0);
}
// (缓存)装饰器函数
function decoratorFunc(func, hash) {
    let cache = new Map();
    function resultFunc() {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key)
        }
        let result = func(...arguments)
        cache.set(key, result)
        console.log("no cache")
        return result;
    }
    return resultFunc
}
// 生成缓存map的唯一key函数
function hash(args) {
    let result = Array.from(args)
    return result.join(",")
}
sum = decoratorFunc(sum, hash)
alert(sum(3, 5, 2)); // works
alert("Again " + sum(3, 5, 2)); // same (cached)


// """延时装饰器"""
function f(x) {
    alert(x);
}
// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // 在 1000ms 后显示 "test"
f1500("test"); // 在 1500ms 后显示 "test"

function delay(func, delayTime) {
    function resultFunc(...args) {
        setTimeout(() => func.apply(this, args), delayTime)
    }
    return resultFunc

}


//   """防抖装饰器"""
function debounce(func, ms) {
    let timeout;
    return function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func.apply(this, arguments), ms)
    };
}
let f = debounce(alert, 1000);
f("b");
console.log(setTimeout(() => f("b"), 200));
console.log(setTimeout(() => f("c"), 500));



// """节流装饰器"""
function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        //   冻结期间调用
        if (isThrottled) { // (2)
            // 保存最后一次调用参数和上下文
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        //   非冻结期间直接调用并冻结
        func.apply(this, arguments); // (1)
        isThrottled = true;
        // 调用执行，指定时间之后解除冻结，并再次递归
        setTimeout(function () {
            isThrottled = false; // (3)
            // 节流调用之后则停止递归
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                // 节流调用之后设置参数为空
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}