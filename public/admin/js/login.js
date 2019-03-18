$(function(){
    // 初始化字体图标
    var $form = $('#form');
    var icon = {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    };
    $form.bootstrapValidator({
        feedbackIcons: icon,//加载图标
        // live: 'disabled',
        // 表单域配置
        fields: {
            // 用户名配置
            username : {
                validators: {
                    notEmpty: { message: '请输入用户名'},
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3~6位之间'
                    },
                    callback:{
                        message: '用户名错误'
                    }
                }
            },
            // 密码配置
            password : {
                validators: {
                    notEmpty: { message: '请输入密码'},
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6~12位之间'
                    },
                    callback: {
                        message: '密码错误',
                    }
                }
            }
        }
    })
    $form.on("success.form.bv",function(e){
        // 阻止浏览器默认跳转
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            dataType: 'json',
            data: $form.serialize(),
            success: function(res){
                console.log(res);
                if( res.error === 1000){
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }else if( res.error === 1001){
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }else if(res.success){
                    location.href = 'index.html';
                }
            }
        })
    })
})