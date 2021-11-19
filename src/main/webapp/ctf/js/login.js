var str = window.location.pathname;
var le = str.length;
var res = str.slice(-10);
if(res=='login.html'){
    $("#login").css("color","#00ccff");
}


var logbtn = document.getElementById('logbtn');
var usr = document.getElementById('username');
var pwd = document.getElementById('password');
var usrhint = document.getElementById('usrhint');
var pwdhint = document.getElementById('pwdhint');
var flag = [false,false];
var reg = /^[A-Za-z0-9]+$/;
// 定义变量

usr.onblur = function(){
    if (usr.value == "" || usr.value == null) {
        usrhint.innerHTML = '账号不能为空！';
        usrhint.style.color = "red";
        usr.style.border = "1px solid red";
        flag[0] = false;
    }

    else if(usr.value.length < 3 || usr.value.length > 20 || !reg.test(usr.value)) {
        usrhint.innerHTML = '账号必须是3-20个小写字母或数字';
        usrhint.style.color = "red";
        usr.style.border = "1px solid red";
        flag[0] = false;
    }
    else{
        usr.style.border = "1px solid green";
        usrhint.innerHTML = '';
        flag[0] = true;
    }
}

pwd.onblur = function(){
    if (pwd.value == '' || pwd.value == null) {
        pwdhint.innerHTML = '密码不能为空！';
        pwdhint.style.color = "red";
        pwd.style.border = "1px solid red";
        flag[1] = false;
    } 
    else if (pwd.value.length < 3 || pwd.value.length > 20 || !reg.test(pwd.value)) {
        pwdhint.innerHTML = '密码必须是3-20个小写字母或数字';
        pwdhint.style.color = "red";
        pwd.style.border = "1px solid red";
        flag[1] = false;
    }
    else{
        pwd.style.border = "1px solid green";
        flag[1] = true;
        pwdhint.innerHTML = '';
    }
}

check = function(){
    if(flag[0]==true&&flag[1]==true)
    {
        //检测通过，数据发送
        $.ajax ({
            url : '../../user/login',
            data : {
                "userAccount": usr.value,
                "userPassword": pwd.value
            },
            type : 'post',
            scriptCharset : 'utf-8',
            success : function (result) {
                if(result.status == 'error') {
                    var txt = result.message;
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
                    $('.ok').click(function(){
                        window.location.reload();
                    });
                } 
                else{
                    window.location.href = '../home.html';
                }
            },
            error : function () {
                console.log("请求失败！");
            }
        });
    }
    else{
        var txt=  "信息有误";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
        $('.ok').click(function(){
            window.location.reload();
        });
    }
}

