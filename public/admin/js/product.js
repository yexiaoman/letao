// 发送请求,渲染页面
var page = 1;
var arr = [];
render(page)
function render(page){
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data:{
            page: page,
            pageSize: 2
        },
        success: function(res){
            // 结合模板
            $('tbody').html(template('tmp', res));
            pageRender(res);
        }
    })
}

// 给添加按钮注册点击事件
$('.addBtn').on('click', function(){
    // 弹出模态框
    $('#modal2').modal('show');
})

// 发送ajax获取二级分类
$.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    data:{
        page: 1,
        pageSize: 100
    },
    success: function(res){
        // 结合模板
        $('.dropdown-menu').html(template('tmp2', res));
    }
})

// 給下拉按钮注册点击事件,修改其文本值
$('.dropdown-menu').on('click','a', function(){
    console.log($(this).data('id'))
    // 給隐藏域赋值
    $('[name=brandId]').val($(this).parent().data('id'));
    // 給按钮文本修改内容
    $('.drop-text').text($(this).text());
    // 恢复表单校验
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
})
var imgUrl;
// 文件上传成功后触发
$('#file').fileupload({
    type: 'json',
    done: function(e, data){
        // 获取图片路径
        var tmp = data.result.picAddr;
        // console.log(tmp);
        
        // 把图片展示到页面上
        arr.unshift(data.result);
        // console.log(arr);
        
        $('#imgBox').prepend('<img src="'+ tmp +'" alt="" width="100" style="margin:0 5px">');
        if($('#imgBox').children().length > 3){
            $('#imgBox').children().eq(3).remove()
            // $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
        }
        imgUrl = JSON.stringify(arr);
        if( arr.length > 3){
            arr.pop();
        } 
        if(arr.length === 3){

            $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
        }else{
            $('#form').data("bootstrapValidator").updateStatus("picStatus","INVALID")
            // console.log(1);
            
        }

        // 恢复默认样式
        $('.drop-text').text('请选择二级分类');
    }
})

// 表单校验
$('#form').bootstrapValidator({
    // 取消隐藏域不进行校验
    excluded: [],
    // 加载错误图标
    // 配置图标
 feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        proName:{
            validators:{
                notEmpty:{
                    message: '请输入商品名称'
                }
            }
        },
        brandId:{
            validators:{
                notEmpty:{
                    message: '请选择二级分类'
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message: '请输入商品描述'
                }
            }
        },
        num:{
            validators:{
                notEmpty:{
                    message: '请输入商品描述'
                },
                regexp: {
                    regexp: /^[1-9]\d*$/,
                    message: '商品库存格式, 必须是非零开头的数字'
                  }
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message: '请输入商品描述'
                },
                regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '尺码格式, 必须是 32-40'
                  }
            }
        },
        oldPrice:{
            validators:{
                notEmpty:{
                    message: '请输入商品原价'
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message: '请输入商品现价'
                }
            }
        },
        picStatus:{
            validators:{
                notEmpty:{
                    message: '请选择三张图片'
                }
            }
        },
        
        
    }
})

// 表单校验成功后,发送ajax请求
$('#form').on('success.form.bv', function(e){
    e.preventDefault();
    var res = $('form').serialize();
    res += '&picArr=' + imgUrl;
    console.log(res);
    $('#imgBox').children().remove();
    // // 发送ajax请求
    $.ajax({
        type: 'post',
        url: '/product/addProduct',
        data: res,
        success: function(res){
            // 成功后关闭模态框
            $('#form').data('bootstrapValidator').resetForm(true);
            $('#modal2').modal('hide');
            render(page);
            pageRender(res);
        }
    })
})
