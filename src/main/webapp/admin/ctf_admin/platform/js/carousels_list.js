/*var carousels_list = [{"carouselId" : 1,
                       "image" : "../images/jr.jpg",
                       "siSelected" : 1},

                       {"carouselId" : 2,
                       "image" : "../images/sms.jpg",
                       "siSelected" : 0},

                       {"carouselId" : 3,
                       "image" : "../images/zyl.jpg",
                       "siSelected" : 1},

                        {"carouselId" : 4,
                       "image" : "../images/sms.jpg",
                       "siSelected" : 1},

                        {"carouselId" : 5,
                       "image" : "../images/sms.jpg",
                       "siSelected" : 0}]*/
var carousels_list;
var carouselid_arr = new Array();

window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url: '../../../admin/getAdminMap',//获取管理员个人信息
        type: 'post',
        scriptCharset: 'utf-8',
        success: function (result) {
            // console.log(result);
            var loginAdmin = result.loginAdmin;
            //设置登陆用户的昵称
            if (loginAdmin.adminNickname != null) {
                ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminNickname;
            }
            //设置登陆用户的头像
            if (loginAdmin.adminImage != null) {
                $('.layui-nav-img').attr("src", loginAdmin.adminImage);
            }
        },
        error: function () {
            layer.msg("请求失败！");
        }
    });
    //fillcarousels();   //测试完毕改成get_carousels();
    get_carousels();
}

function get_carousels(){

    $.ajax({
        url : '../../../carousel/listCarousel', //得到所有轮播图的列表
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.status =="success"){
               carousels_list = result.carouselList;
               fillcarousels();
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求轮播图列表失败！");
        } 
    });
}

function fillcarousels(){

    for(var i = 0; i < carousels_list.length; ++i){
        j=i+1;
        carousel = carousels_list[i];
        
        //如果图片是选中状态，则把图片id放到所有选中图片的id数组carouselid_arr里
        if (carousel.isSelected == 1){
            var ChooseCarouselids = carousel.carouselId.toString();
            carouselid_arr.push(ChooseCarouselids);
        }

        var content = '<tr>'+

                        '    <td style="text-align: center; padding-top : 0px; " class="layui-input-block">    '+
                        '        <input type="checkbox" value="'+carousel.carouselId+'" class="'+carousel.carouselId+'"  lay-skin="primary"  lay-filter="checkboxs"> '+
                        '    </td>'+

                        '    <td style="text-align: center;">'+ j +' </td>'+
                        '    <td style="text-align: center; overflow-wrap: break-word;">  '+
                        '        <img src="'+ carousel.image+'" style="width:60px;height:60px">'+
                        '    </td>'+
                        
                        '    <td style="text-align: center; padding : 0px;"> '+
                        '        <a class="layui-btn layui-btn-danger layui-btn-xs" onclick = "del_carousel('+carousel.carouselId+')">'+
                        '            <i class="layui-icon layui-icon-delete"></i>'+
                        '            "删除"'+
                        '        </a>'+
                        '    </td>'+
                        '</tr>'
        $("#carouseltbody").append(content)

        layui.use('form', function(){
            var form = layui.form;
            
            if (carousel.isSelected == 1){
                $('.'+carousel.carouselId).prop('checked',true);
              }

            form.render('checkbox');
            form.on('checkbox(checkboxs)', function (data) {
                var carouselid = data.elem.value; 
                var changestate = data.elem.checked;
                //console.log(data.elem.checked)

               if (changestate == true){
                   carouselid_arr.push(carouselid);
               }
               else if (changestate == false){
                   var index = carouselid_arr.indexOf(carouselid);
                   //console.log(question0id);
                   //console.log(index)
                   carouselid_arr.splice(index, 1); 
                   //console.log(question0id);
                   // console.log(changestate);
               }
                //console.log(carouselid_arr);
            });
        });
    }
}

function add_carousels(){
    carouselsStr = carouselid_arr[0];
    for(var m=1; m<carouselid_arr.length; ++m){
        carouselsStr += "," + carouselid_arr[m];
    }
    //console.log(carouselsStr)
    //console.log(carouselsStr.length);
    var carouselSplitList = carouselsStr.split(",");
    if(carouselSplitList.length>3){
        layer.open({
            type: 1,
            offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            id: 'layerDemo2', //防止重复弹出
            content: '<div style="padding: 20px 100px;">' + "轮播图不能超过三张！" + '</div>',
            btn: '关闭',
            btnAlign: 'c', //按钮居中
            shade: 0.5, //不显示遮罩
            title: "HZNUCTF",
            yes: function () {
                layer.closeAll();
            }
        });
    }
    else{
        $.ajax({
            url : '../../../carousel/update', //选中为轮播图
            type : 'post',
            data :{"id" : carouselsStr},    //参数名需要修改
            scriptCharset : 'utf-8',
            success : function (result) {
                console.log(result);
                if(result.status == "success") {
                    layer.open({
                        type: 1,
                        offset: 'auto', 
                        id: 'layerDemo2', //防止重复弹出
                        content: '<div style="padding: 20px 100px;">' + "设置成功！" + '</div>',
                        btn: '关闭',
                        btnAlign: 'c', //按钮居中
                        shade: 0.5, //不显示遮罩
                        title: "HZNUCTF",
                        yes: function () {
                            layer.closeAll();
                            window.location.reload();
                        }
                    });
                    get_carousels();
                }
                else{
                    layer.msg(result.message);
                }
            },
            error : function () {
                layer.msg('请求接口失败！');
            }
        });
    }
}

function del_carousel(id){
    //console.log(id);

    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + '确定删除该轮播图吗？' + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除轮播图",
        btn1 : function () {
            delCarousel(id);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delCarousel(id){
    //console.log(id);
    $.ajax({
        url : '../../../carousel/delete', //删除轮播图
        data : {"carouselId" : id },
        scriptCharset : "utf-8",
        type : "post",
        success : function(result){
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "删除成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                        window.location.reload();
                    }
                });
                get_carousels();
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg("请求接口失败");
        }
    });
}