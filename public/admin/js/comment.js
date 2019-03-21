$(function(){
    // 二级菜单
    $(function(){
        $('.category').on('click', function(){
            $(this).next().stop().slideToggle();
        })
    })

    // 左侧导航点击事件
    $('.nav a').on('click', function(){
        $('.nav a').removeClass('current');
        $(this).addClass('current');
    })

    // 点击头部菜单按钮收起侧边栏
    $('.main-left').on('click', function(){
        $('.lt_aside').toggleClass('now');
        $('.lt_topbar').toggleClass('now');
        $('.lt_main').toggleClass('now');
    })

    // 头部退出点击
    $('.main-right').on('click',function(){
        // 点击弹出模态框
        $('#modal').modal('show');
    })

    // 給模态框的确定按钮注册事件,点击是发送请求给后台
    $('.confirm').on('click', function(){
        $.ajax({
            type : 'get',
            url: '/employee/employeeLogout',
            success : function(res){
               if(res.success){
                   location.href = 'login.html';
               }
            }
        })
    })

    // 进度条
    NProgress.start();
    setTimeout(function(){
        NProgress.done();
    },500)
    $(document).ajaxStart(function(){
        NProgress .start();
    })
    $(document).ajaxStop(function(){
       setTimeout(function(){
           NProgress.done();
       },500)
    })
})
