window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url: '../../../admin/getAdminMap', //获取管理员个人信息
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
            //判断是否是教师
            if (loginAdmin.adminState == 2) {
                layer.open({
                type: 1,
                offset: 'auto', 
                id: 'layerDemo', //防止重复弹出
                content: '<div style="padding: 20px 50px;">' + "教师不可以添加管理员" + '</div>',
                btn: '确定',
                btnAlign: 'c', //按钮居中
                shade: 0.5, //不显示遮罩
                title: "添加管理员",
                yes : function () {
                    window.location="admin_list.html";
                },
            }); 
            }
        },
        error: function () {
            layer.msg("请求失败！");
        }
    });
}

function passwordLimit(){
    var input = window.event.target;
    input.value = input.value.substring(0,16); if(window.event.keyCode == 13) return false;
    var pwd = document.getElementById("password");
    if(pwd.value.toString() != input.value.toString()){
        layer.tips("两次密码不相同！", "#confirmPwd");
    }
}

layui.use('form', function(){
    var form = layui.form;
    form.render();
    form.verify();
});

var photo = null;
var username, password, confirmPwd, nickname, telephone, admin_type, type, name;
var uploadInst;

function add_admin(){
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    confirmPwd = document.getElementById('confirmPwd').value;
    admin_type = $("input[name='admin_type']:checked").val();
    //console.log(admin_type);
    nickname = document.getElementById('nickname').value;
    telephone = document.getElementById('phone').value;
    name=document.getElementById('name').value;

    var reg1 = /^.{5,16}$/; //密码5-16位字符组合
    var reg2 = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码
    var reg3 = /^[a-zA-Z][A-Za-z0-9]{4,15}$/;  //用户名5-16位字母数字组合,字母开头
    var reg4 = /^[\u4e00-\u9fa5]{2,15}$/;  //2-15个中文

    if(admin_type == '普通管理员'){
        type = 1;
    }
    else{
        type = 2;
    }

    if(username == "" || username == null){
        //document.getElementById("tips").innerHTML="用户名不能为空！";
        layer.tips("用户名不能为空！", "#username");
    }
    else if(!reg3.test(username)){
        layer.tips("用户名不合法,5-16位字母数字组合,字母开头", "#username");
    }

    else if(name == "" || name == null){
        layer.tips("真实姓名不能为空！", "#name");
    }
    else if(!reg4.test(name)){
        layer.tips("真实姓名不合法,2-15位中文", "#name");
    }

    else if(password == null || password == ""){
        layer.tips("密码不能为空！", "#password");
    }
    else if(!reg1.test(password)){
        layer.tips("密码不合法，5-16位字符组合", "#password");
    }

    else if(confirmPwd == null || confirmPwd == ""){
        layer.tips("请再次输入密码！", "#confirmPwd");
    }
    else if(password != confirmPwd){
        layer.tips("两次密码不相同！", "#confirmPwd");
    }

    else if(nickname == "" || nickname == null){
        layer.tips("昵称不能为空！", "#nickname");
    }

    else if(telephone == "" || telephone == null){
        layer.tips("手机号不能为空！", "#phone");
    }
    else if(!reg2.test(telephone)){
        layer.tips("请注意手机号格式！", "#phone");
    }

    else if(photo != null) {
        uploadInst.upload();
    }
    else {
        add_Admin(photo, username, password, nickname, telephone, type, name);
    }
}
layui.use('upload', function() {
    var $ = layui.jquery, upload = layui.upload;//得到 upload 对象
    //普通图片上传使用layui上传图片
    //创建一个上传组件
    uploadInst = upload.render({
        elem: '#upload'  //绑定元素(上传图片的按钮)
        , url: '../../../file/uploadImg'  //添加管理员头像的单独的url
        , accept : 'images'   //指定允许上传时校验的文件类型
        , multiple : false
        , auto : false       //选择文件后不自动上传
        /*, bindAction: '#submitbtn'*/
        , field : 'file'
        , choose: function (obj) { +  //choose：选择文件后的回调函数，在文件被选择后触发
            //预读本地文件示例，不支持ie8 +
            obj.preview(function (index, file, result) {
                //console.log(index); //得到文件索引
                //console.log(file); //得到文件对象
                //console.log(result); //得到文件base64编码，比如图片
                $('.layui-upload').css("height", "10%");
                $('.layui-upload').css("marginButtom", "10px");
                $('#demo1').attr('src', result); //图片链接（base64）
                $('#demo1').css("maxWidth", "10%");
                $('#demo1').css("marginRight", "10px");
                photo = result;
            });
        }
        , done: function (res) {     //执行上传请求后的回调
            //如果上传失败
            if (res.status == "error") {
                return layer.msg('上传失败');
            }
            //上传成功
            else
            {
                photo = res.src;
                $('#demo1').attr('src', photo);
                add_Admin(photo, username, password, nickname, telephone, type, name);
            }
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
    }
    });
});
function add_Admin(photo, username, password, nickname, telephone, type, name){

    $.ajax({
        url : '../../../admin/insert',  //请求添加管理员用户的接口
        data : {"adminAccount":username,
                "adminName" :name,
                "adminNickname":nickname,
                "adminPassword":password,
                "adminTel":telephone,
                "adminImage":photo,
                "adminState":parseInt(type)},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                $('.layui-btn-primary').click();
                $('#demo1').removeAttr("src");  //removeAttr() 方法从被选元素中移除属性
            }
            else{
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + result.message + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }

        },
        error : function () {
            layer.msg("请求添加管理员失败！")
        }
    });
}
/*window.onload = function () {
     var state=2;   
     if (state == 2) {
        
        layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "教师不可以添加管理员" + '</div>',
        btn: '确定',
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "添加管理员",
        yes : function () {
            window.location="admin_list.html";
        },
    });
        }   
        } */