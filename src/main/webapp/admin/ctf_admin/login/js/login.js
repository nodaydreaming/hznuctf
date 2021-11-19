function btn_login() {
    var userName = $("#username").val();
    var pwd = $("#password").val();
    
    if(userName == null || userName == ""){
        layer.tips("请输入账号" , "#username");
    }
    else if(pwd == null || pwd == ""){
        layer.tips("请输入密码" , "#password");
    }
    else{

        //console.log(userName);
        //console.log(pwd);
        //验证账号和密码
        $.ajax({
            url : '../../../admin/adminLogin',   //登录
            type : 'post',
            data : {
                "adminAccount" : userName,
                "adminPassword" : pwd
                },
            scriptCharset : 'utf-8',
            success : function (result) {
                //账号或密码错误，提示错误信息
                if (result.status == "error") {
                    var textMessage = result.message.toString();
                    layer.open({
                        type: 1,
                        offset: 'auto', 
                        id: 'layerDemo1', //防止重复弹出
                        content: '<div style="padding: 20px 100px;">' + textMessage + '</div>',
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
                    window.location.href = '../platform/announcement.html'
                }
            },
            error : function () {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1',
                    content: '<div style="padding: 20px 100px;">' + "请求失败，请重试！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
    }

}
