/*
 * @Author: your name
 * @Date: 2020-09-19 19:00:01
 * @LastEditTime: 2020-09-20 19:36:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端学习\js\showPic.js
 */
/**
 * @description: 展示图片 
 * @param : 
 * @return {type} 
 */
window.onload = test

function test(){
    if(!document.getElementsByTagName) {
        return false;
    }
    if(!document.getElementById){
        return false;
    }
    if(!document.getElementById("images")){
        return false;
    }
    var ul = document.getElementById("images")
    //此方法不能使用！！！！
    var alist = ul.getElementsByTagNameNS("*","a")
    for(var i=0; i<alist.length;i++){
        alist[i].onclick = function(){
            //该方法返回true时要阻止默认时间的发生，但是返回false时说明没有执行成功，不要阻止默认事件
            var result = showPic(this)? false:true;
            return result;
        }
    } 
}

function showPic(node){
    if(!document.getElementById("place_holder")){
        return false
    }
    if(!document.getElementById("place_holder_text")){
        return false
    }
    var href = node.getAttribute("href")
    var img = document.getElementById("place_holder")
    img.setAttribute("src",href)
    var title = node.getAttribute("title")
    var p = document.getElementById("place_holder_text")
    p.firstChild.nodeValue = title
    return true
}   

function countBodyChildren(){
    var body = document.getElementsByTagName("body")[0]
    alert(body.childNodes.length)
}

// 怎么为未知的浏览器适配方法,例如:我写了一个方法，但是我不能肯定用户的浏览器就一定支持我的这个js方法，
// 例如：document.getElementsByTagName()这个方法
//可以使用document.getElementsByTagName来进行检测判断，如果，用户的浏览器不支持这个方法就一定不会执行代码
//为了将重要的代码不被嵌套在最里层，我们需要把否定条件写在前面
// if(!document.getElementsByTagName || !document.getElementsByClassName) return false;
//使用document.getElementByTagName()
