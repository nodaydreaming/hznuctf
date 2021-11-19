/*var user_username,user_password, user_comfirmPwd, user_nickname, user_phone, user_academy;
var user_Class, user_studentnumber, user_name, user_email, user_gender;
*/
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

var user_username,user_password, user_comfirmPwd, user_nickname, user_phone, user_academy;
var user_Class, user_studentnumber, user_name, user_email, user_gender;

function add_user(){
    user_username = document.getElementById('username').value;
    user_password = document.getElementById('password').value;
    user_comfirmPwd = document.getElementById('confirmPwd').value;
    user_nickname = document.getElementById('nickname').value;
    user_phone = document.getElementById('phone').value;
    user_academy = $("#academys").find('.layui-this').attr("lay-value");
    user_Class = document.getElementById('Class').value;
    user_studentnumber = document.getElementById('studentnumber').value;
    user_name=document.getElementById('name').value;
    user_email = document.getElementById('email').value;
    user_gender = $("input[name='sex']:checked").val();

   
    var reg1 = /^[A-Za-z0-9]{3,20}$/;  //用户名密码3-20位字符
    var reg2 = /^[0-9]{11}$/;  //手机号码
    var reg3 = /^[0-9]{13}$/; //学号13位数字
    var reg4 = /^[\u4e00-\u9fa5]{1,18}$/;  //真实姓名1-18个中文
    var reg5= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  //邮箱

    if(user_gender == '男'){
        gender = 1;
    }
    else{
        gender = 0;
    }
    if(user_username == "" || user_username == null){
        //document.getElementById("tips").innerHTML="用户名不能为空！";
        layer.tips("用户名不能为空！", "#username");
    }
    else if(!reg1.test(user_username)){
        layer.tips("用户名不合法,3-20位字符组合", "#username");
    }

    else if(user_password == null || user_password == ""){
        layer.tips("密码不能为空！", "#password");
    }
    else if(!reg1.test(user_password)){
        layer.tips("密码不合法，3-20位字符组合", "#password");
    }

    else if(user_comfirmPwd == null || user_comfirmPwd == ""){
        layer.tips("请再次输入密码！", "#confirmPwd");
    }
    else if(user_comfirmPwd != user_password){
        layer.tips("两次密码不相同！", "#confirmPwd");
    }

    else if(user_nickname == "" || user_nickname == null){
        layer.tips("昵称不能为空！", "#nickname");
    }

    else if(user_phone == "" || user_phone == null){
        layer.tips("手机号不能为空！", "#phone");
    }
    else if(!reg2.test(user_phone)){
        layer.tips("请注意手机号格式！", "#phone");
    }

    else if(user_academy == "" || user_academy == null){
        layer.tips("学院不能为空！", "#academy");
    }

    else if(user_Class == "" || user_Class == null){
        layer.tips("班级不能为空！", "#Class");
    }

    else if(user_name == "" || user_name == null){
        layer.tips("真实姓名不能为空", "#name");
    }
    else if(!reg4.test(user_name)){
        layer.tips("真实姓名不合法,2-15位中文", "#name");
    }

    else if(user_studentnumber == null || user_studentnumber == ""){
        layer.tips("学号不能为空！！", "#studentnumber");
    }  
    else if(!reg3.test(user_studentnumber)){
        layer.tips("学号不合法,13位数字", "#studentnumber");
    }

    else if(user_email == "" || user_email == null){
        layer.tips("邮箱不能为空！", "#email");
    }
    else if(!reg5.test(user_email)){
        layer.tips("邮箱格式不合法", "#email");
    }

    else if(user_gender == null || user_gender == ""){
        layer.tips("性别不能为空！", "#gender");
    }
    else {
        add_User(user_username,user_password, user_nickname, user_phone, user_academy,user_Class, user_studentnumber, user_name, user_email, user_gender);
    }
}

function add_User(user_username,user_password, user_nickname, user_phone, user_academy,user_Class, user_studentnumber, user_name, user_email, user_gender){
    // console.log("准备添加管理员。。。");
    //请求添加管理员用户的接口
    $.ajax({
        url : '../../../user/register',//添加用户
        data : {"userAccount":user_username,
                "userPassword":user_password,
                "userNickname":user_nickname,
                "userTel":user_phone,
                "userAcademy":user_academy,
                "userClass":user_Class,
                "userName":user_name,
                "userStudentnumber":user_studentnumber,
                "userEmail":user_email,
                "userGender":parseInt(gender)},
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
                        window.location.reload();
                    }
                });
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