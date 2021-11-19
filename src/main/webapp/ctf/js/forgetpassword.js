var usr = document.getElementById('username');
let usrhint = document.getElementById('usrhint');
var email = document.getElementById('email');
let emailhint = document.getElementById('emailhint');
var flag = 0;
var usrreg = /^[A-Za-z0-9]{3,20}$/;
var emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

usr.onblur = function(){
    if (usr.value == "" || usr.value == null) {
        usrhint.innerHTML = '账号不能为空！';
        usrhint.style.color = "red";
        usr.style.border = "1px solid red";
        flag[0] = false;
    }

    else if(!usrreg.test(usr.value)) {
        usrhint.innerHTML = '请正确填写您的账号';
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
// 账号校验

email.onblur = function(){
    var emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(email.value == '' || email.value == null){
        emailhint.innerHTML = '邮箱不能为空！';
        emailhint.style.color = 'red';
        email.style.border = '1px solid red';
        flag = 0;
    }
    else if(!emailreg.test(email.value)){
        emailhint.innerHTML = '请输入正确的邮箱地址';
        emailhint.style.color = 'red';
        email.style.border = '1px solid red';
        flag = 0;
    }
    else{
        email.style.border = '1px solid green';
        flag = 1;
        emailhint.innerHTML = '';
    }

}
// 邮箱校验

function submit(){
    if(flag == 1){
        $.ajax ({
            url : '../../user/resetPassowrd',
            data : {
                "userAccount": usr.value,
                "userEmail": email.value
            },
            type : 'post',
            scriptCharset : 'utf-8',
            success : function (result) {
                if(result.status=="success"){
                    var txt = result.message;
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
                    $('.ok').click(function(){
                        location.href = 'login.html';
                    });
                }
                else{
                    var txt = result.message;
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
                    $('.ok').click(function(){
                        window.location.reload();
                    });
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
