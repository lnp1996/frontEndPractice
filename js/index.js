$(function () {

    //持久化存储中加载数据
    function loadData() {
        var list = localStorage.getItem('list')
        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    }

    //渲染数据
    load();

    function load(){
        var todocount = 0;
        var donecount = 0;
        var todoStr = '';
        var doneStr = ''
        var list = loadData()
        if (list && list.length > 0) {
            //有数据
            list.forEach(function (data, i) {
                if (data.done) {
                    //已经完成
                    doneStr += ` 
                      <li>
                        <input checked='checked' type='checkbox' index=${i} >
                        <p id='p${i}'>${data.title}</p>
                        <a href='javascript:;'>-</a>      
                      </li>`
                    donecount++;
                } else {
                    todoStr += `
                    <li> 
                        <input index=${i} type='checkbox'>
                        <p id='p${i}'>${data.title}</p>   
                        <a href='javascript:;'>-</a>    
                    </li>`
                    //尚未完成
                    todocount++;
                }
                $('#todolist').html(todoStr);
                $('#donelist').html(doneStr);
                $('#todocount').text(todocount);
                $('#donecount').text(donecount);
            })
        } else {

            //无数据
            $('#todolist').empty();
            $('#donelist').empty();
            $('#todocount').text(todocount);
            $('#donecount').text(donecount);
        }

    }

    //保存数据方法
    function saveData(data) {
        localStorage.setItem('list', JSON.stringify(data));
    }

    //添加数据的方法
    $('#title').keydown(function (event) {

        if (event.keyCode === 13) {
            //获取输入框中的值
            var val = $(this).val();
            if (!val) {
                alert('不能为空，请重新输入！')
            } else {
                var list = loadData()
                //将元素添加到数组的开头
                list.unshift({
                    title: val,
                    done: false
                });
                //清空数据框中的值
                $(this).empty();
                //保存数据
                saveData(list);
                load()
            }
        }
    })

    //事件代理的方式绑定事件,删除
    $('#todolist').on('click', 'a', function () {
        var i = $(this).siblings('input').attr('index');
    
        //拿出数据删除
        list = loadData()
        list.splice(i, 1);
        saveData(list) 
        load()

    })
    //事件代理的方式绑定事件,删除
    $('#donelist').on('click', 'a', function () {
        var i = $(this).siblings('input').attr('index');
        //拿出数据删除
        list = loadData()
        list.splice(i, 1);
        saveData(list)  
        load()

    })


    $('#todolist').on('change', 'input[type=checkbox]', function () {

        var i = parseInt($(this).attr('index'))
        update(i, 'done', true);
    })


    $('#donelist').on('change', 'input[type=checkbox]', function () {

        var i = parseInt($(this).attr('index'))
        update(i, 'done', false);
    })

    //更新数据方法
    function update(i, key, value) {
        //取出元素
        var list = loadData()
        var tmp = list.splice(i, 1)[0];
        tmp[key] = value;
        list.splice(i, 0, tmp);
        saveData(list)
        load()
    }

    //编辑操作
    $('#todolist').on('click', 'p', function () {
        var i = $(this).parent().index(); 
        var title = $(this).text();        
        var $p = $(this);
        $(this).html(
            `
            <input type='text' id='input-${i}' value=${title}>
            `
        )
        //选中
        $(`#input-${i}`)[0].setSelectionRange(0, $(`#input-${i}`).val().length)
        //获取焦点
        $(`#input-${i}`).focus();

        //失去焦点保存数据
        $(`#input-${i}`).blur(function () {
            if ($(this).val().trim().length === 0) {
                alert('内容不能为空')
                $(this).parent().html(title);
            } else {
                update(i, 'title', $(this).val())
            }
        })
        //防止input点击冒泡到p
        $(`#p${i}`).on('click','input',function(event){
            event.stopPropagation();
        })
    })

})