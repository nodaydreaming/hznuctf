var str = window.location.pathname;
var le = str.length;
var res = str.slice(-13);
if(res=='register.html'){
    $("#register").css("color","#00ccff");
}

let usr = document.getElementById('username');
let usrhint = document.getElementById('usrhint');

let pwd = document.getElementById('password');
let pwdhint = document.getElementById('pwdhint');

let gender = $('input[name=gender]:checked').val();
let academy = document.getElementById('academy');

let nick = document.getElementById('nickname');
let nickhint = document.getElementById('nickhint');

let real = document.getElementById('realname');
let realhint = document.getElementById('realhint');

let phone = document.getElementById('phone');
let phonehint = document.getElementById('phonehint');

let email = document.getElementById('email');
let emailhint = document.getElementById('emailhint');

let stunum = document.getElementById('studentnumber');
let stuhint = document.getElementById('stuhint');

let classname = document.getElementById('classname');
let classhint = document.getElementById('classhint');

let hint = document.getElementById('hint');
var flag = 0;
var reg = /^[A-Za-z0-9]+$/;

usr.onblur = function(){
    if (usr.value == "" || usr.value == null) {
        usrhint.innerHTML = '账号不能为空！';
        usrhint.style.color = "red";
        usr.style.border = "1px solid red";
        flag = 0;
    }

    else if(usr.value.length < 3 || usr.value.length > 20 || !reg.test(usr.value)) {
        usrhint.innerHTML = '账号必须是3-20个小写字母或数字';
        usrhint.style.color = "red";
        usr.style.border = "1px solid red";
        flag = 0;
    }
    else{
        usr.style.border = "1px solid green";
        usrhint.innerHTML = '';
        flag = 1;
    }
}

pwd.onblur = function(){
    if (pwd.value == '' || pwd.value == null) {
        pwdhint.innerHTML = '密码不能为空！';
        pwdhint.style.color = "red";
        pwd.style.border = "1px solid red";
        flag = 0;
    } 
    else if (pwd.value.length < 3 || pwd.value.length > 20 || !reg.test(pwd.value)) {
        pwdhint.innerHTML = '密码必须是3-20个小写字母或数字';
        pwdhint.style.color = 'red';
        pwd.style.border = '1px solid red';
        flag = 0;
    }
    else{
        pwd.style.border = '1px solid green';
        flag = 1;
        pwdhint.innerHTML = '';
    }
}

nick.onblur = function(){
    if (nick.value == '' || nick.value == null) {
         nickhint.innerHTML = '昵称不能为空！';
         nickhint.style.color = 'red';
         nick.style.border = '1px solid red';
         flag = 0;
     } 
     else if (nick.length < 1 || nick.length > 15 ) {
         nickhint.innerHTML = '昵称必须是1-15个字符';
         nickhint.style.color = 'red';
         nick.style.border = '1px solid red';
         flag = 0;
    }
    else{
        nick.style.border = '1px solid green';
        flag = 1;
        nickhint.innerHTML = '';
    }
}

real.onblur = function(){
    var namereg = /^[\u4e00-\u9fa5]{1,18}$/;
    if(real.value == '' || real.value == null){
        realhint.innerHTML = '真实姓名不能为空！';
        realhint.style.color = 'red';
        real.style.border = '1px solid red';
        flag = 0;
    }
    else if(!namereg.test(real.value)){
        realhint.innerHTML = '真实姓名为1-18个中文字符';
        realhint.style.color = 'red';
        real.style.border = '1px solid red';
        flag = 0;
    }
    else{
        real.style.border = '1px solid green';
        flag = 1;
        realhint.innerHTML = '';
    }
}

phone.onblur = function(){
    var phonereg = /^[0-9]{11}$/;
    if(phone.value == '' || phone.value == null){
        phonehint.innerHTML = '手机号不能为空！';
        phonehint.style.color = 'red';
        phone.style.border = '1px solid red';
        flag = 0;
    }
    else if(!phonereg.test(phone.value)){
        phonehint.innerHTML = '手机号码必须是11位长号';
        phonehint.style.color = 'red';
        phone.style.border = '1px solid red';
        flag = 0;
    }
    else{
        phone.style.border = '1px solid green';
        flag = 1;
        phonehint.innerHTML = '';
    }

}

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

stunum.onblur = function(){
    var stureg = /^[0-9]{13}$/;
    if(stunum.value == '' || stunum.value == null){
        stuhint.innerHTML = '学号不能为空！';
        stuhint.style.color = 'red';
        stunum.style.border = '1px solid red';
        flag = 0;
    }
    else if(!stureg.test(stunum.value)){
        console.log(stureg.test(stunum.value));
        stuhint.innerHTML = '学号格式不正确';
        stuhint.style.color = 'red';
        stunum.style.border = '1px solid red';
        flag = 0;
    }
    else{
        stunum.style.border = '1px solid green';
        flag = 1;
        stuhint.innerHTML = '';
    }
}

classname.onblur = function(){
    if(classname.value == '' || classname.value == null){
        classhint.innerHTML = '班级不能为空！';
        classhint.style.color = 'red';
        classname.style.border = '1px solid red';
        flag = 0;
    }
    else{
        classname.style.border = '1px solid green';
        flag = 1;
        classhint.innerHTML = '';
    }
}

register = function(){
    gender = $('input[name=gender]:checked').val();
    academy = document.getElementById('academy');
    if(flag == 1){
        $.ajax({
            url:'../../user/register',
            data:{
                'userAccount':usr.value,
                'userPassword':pwd.value,
                'userNickname':nick.value,
                'userAcademy':academy.value,
                'userClass':classname.value,
                'userStudentnumber':stunum.value,
                'userName':real.value,
                'userEmail':email.value,
                'userGender':gender,
                'userTel':phone.value
            },
            type : 'post',
            scriptCharset : 'utf-8',
            success : function (result) {
                if(result.status == 'success'){
                    window.location.href = 'login.html';
                } 
                else{
                    var txt = result.message;
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
                }
            },
            error : function () {
                console.log("请求失败！");
            }
        });
    }    
    else{
        var txt = "信息有误";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
        $('.ok').click(function(){
            window.location.reload();
        });
    }
} 