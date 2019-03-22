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
    $('#modal2').modal('show');
    // 表单验证
  var icon = {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
};
$("#form").bootstrapValidator({
    feedbackIcons: icon,//加载图标
    fields:{
        categoryName:{
            validators:{
                notEmpty: {//检测非空,radio也可用
                    message: '文本框必须输入'
                }
            }
        }

    }
})

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
    $('.modalText').text(txt);
    $('#droText').val(txt);
})
  
// 给上传图片注册点击事件,实现图片预览
$('#submit').on('input', function(){
    var reads= new FileReader();
    console.dir($(this).context.files[0])
    f=$(this).context.files[0];
    reads.readAsDataURL(f);
        reads.onload=function (e) {
            document.querySelector('#bigImg img').src=this.result;
            document.querySelector('#imgLOgo').value = document.querySelector('#bigImg img').src;
            $('#imgLOgo').val(this.result);
        };
})