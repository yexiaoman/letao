
// 发送ajax请求,获取数据信息
var page = 1;
render(1)
   function render(page){
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data:{
            page: page,
            pageSize:5
        },
        success: function(res){
            console.log(res)
            // 联合模板
            $('tbody').html(template('tmp', res));
            // 渲染分页
            pageRender(res);
        }
    })
   }
   // 給添加分类注册点击事件
   $('.addBtn').on('click', function(){
       // 点击显示模态框
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

   $('#form').on("success.form.bv",function(e){
       e.preventDefault();

       $.ajax({
           type: 'post',
           url: '/category/addTopCategory',
           data: $('#form').serialize(),
           success: function(res){
            // 关闭模态框
            $('#modal2').modal('hide');
            render(1)
           }
       })
       $('#form').data('bootstrapValidator').resetForm();
   })



