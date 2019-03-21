// 发送ajax请求获取用户数据
var page = 1;
    render(1)
    function render(page){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data:{
                page: page,
                pageSize: 5
            },
            success: function(res){
                console.log(res)
                // 结合模板
                $('tbody').html(template('tmp', res));
                // 写分页
                pageRender(res)
               
            }
        })
    }

    // 給禁用按钮和启用按钮注册点击事件
    // 点击按钮后,获取当前td身上的id,,弹出模态框
    var userid;
    var text;
    $('tbody').on('click', '.btn', function(){
        // 获取当前id
        userid = $(this).parent().data('id');
        text = $(this).text() == '禁用' ? 0 : 1;
        console.log(text);
        // 展示模态框
        $('#modal2').modal('show');
    })
    // 给模态框确定注册点击事件
    $('.ensure').on('click', function(){
        // 关闭模态框,发送ajax请求给后台
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data:{
                id: userid,
                isDelete: text ,
            },
            success: function(res){
                if( res.success){
                    $('#modal2').modal('hide');
                    render(page);
                }
            }
        })

       
    })


    