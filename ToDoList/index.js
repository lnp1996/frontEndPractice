// 页面加载完成时，刷新历史数据，用户在输入框中输入事件名称，按回车键，将用户新添加的事件加入到未完成列表，并且该事件数量加一，
// 数据存储在localstorage中
// 当用户点击事件前面的对勾时，将该事件添加到已完成列表(改变事件的状态)，点击删除按钮时，将此事件数据从存储中删除掉，并刷新页面
// 需要方法：
//     刷新页面，重新加载数据
//     添加事件
//     删除事件
//     修改事件名称
// 数据存储格式：
//     datas = [
//         "1":{
//             "title": "hello",
//             "done": 0
//         }
//     ]
window.onload = function () {

}
datas = [{
        "title": "hello01",
        "done": 0
    },
    {
        "title": "hello02",
        "done": 1
    }
]

function loadDatas() {
    htmlStr =""
    datas.forEach(function (data, i) {
        htmlStr += 
        `<li>
        <input class="fl" type="checkbox">
        <p class="fl"></p>
        <a href="#">-</a>
        </li>`
        toDoList = document.getElementById("toDoList")
    });
}