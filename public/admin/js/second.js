// 发送ajax请求,渲染书局
var page = 1;
render(1);
function render(page){
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data:{
            page : page,
            pageSize : 5,
        },
        success: function(res){
            // 结合模板
            $('tbody').html(template('tmp', res));
            // 渲染分页
            pageRender(res)
        }
    })
}


// 给添加分类注册`点击事件,点击时弹出1模态框
$('.addBtn').on('click', function(){
    $('#addModal').modal('show');

})

// 发送请求,动态渲染模板一级列表
$.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
        page:1,
        pageSize : 100,
    },
    success: function(res){
        // 结合模板
        $('.dropdown-menu').html(template('tmp2', res));
    }
})

// 给一级分类里所有的li注册点击事件
$('.dropdown-menu').on('click', 'li', function(){
    // 点击每一个li获取其自身文本,更改按钮文本值
   var txt = $(this).children().text();
//    更改按钮文本值
    $('#dropdownText').text(txt);
    $('[name=categoryId]').val($(this).data('id'));

    // 更改校验结果
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
})
  
    $('#fileupload').fileupload({
        dataType: 'json',
        done:function(e,data){
            console.log(data)
            var picAddr = data.result.picAddr;
            // 设置图片地址
            $('#imgBox img').attr("src", picAddr);
            // 将图片地址存在隐藏域中
            $('[name="brandLogo"]').val( picAddr );
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
})

//   表单验证
  var icon = {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
};
$("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: icon,//加载图标
    fields:{
        brandName:{
            validators:{
                notEmpty: {//检测非空,radio也可用
                    message: '请输入二级分类'
                }
            }
        },
        categoryId:{
            validators:{
                notEmpty: {//检测非空,radio也可用
                    message: '请选择一级分类'
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty: {//检测非空,radio也可用
                    message: '请选择图片'
                }
            }
        }
    }
})

// 表单校验成功触发
$('#form').on('success.form.bv', function(e){
    // 阻止浏览器默认事件
    e.preventDefault();
    // 发送Ajax
    $.ajax({
        type: 'post',
        url: '/category/addSecondCategory',
        data:$('#form').serialize(),
        success: function(res){
            if( res.success){
                // 关闭模态框
                $('#addModal').modal('hide')
                render(page);
                pageRender(res);
            }
        }
    })
})