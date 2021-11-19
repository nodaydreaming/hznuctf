let usr = document.getElementById('username');
let usrhint = document.getElementById('usrhint');

let pwd = document.getElementById('password');
let pwdhint = document.getElementById('pwdhint');

let nick = document.getElementById('nickname');
let nickhint = document.getElementById('nickhint');

let phone = document.getElementById('phone');
let phonehint = document.getElementById('phonehint');

let email = document.getElementById('email');
let emailhint = document.getElementById('emailhint');

let classname = document.getElementById('classname');
let classhint = document.getElementById('classhint');

let gender = $('input[name=gender]:checked').val();
let academy = document.getElementById('academy');
let real = document.getElementById('realname');
let stunum = document.getElementById('studentnumber');

var reg = /^[A-Za-z0-9]+$/;
var flag = 1;
var userinfo;

let login = document.getElementsByClassName('nav-right-a')[0];

$.ajax ({
    url : '../../user/getUserMap',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.loginUser == null) {
            nologin(result);
            cantsee();
        }
        else{
            islogin(result.loginUser);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
//判断是否登陆的请求

function nologin(result) {
    let unLogin_0 = document.createElement('a');
    unLogin_0.className = 'unLogin nav-right-a-first';
    unLogin_0.innerText = '登 录';
    unLogin_0.href = 'login.html';
    login.appendChild(unLogin_0);

    let unLogin_1 = document.createElement('a');
    unLogin_1.className = 'unLogin';
    unLogin_1.innerText = '注 册';
    unLogin_1.href = 'register.html';
    login.appendChild(unLogin_1);
}

function cantsee(){
    var txt = "请先登录！";
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
    $('.ok').click(function(){
        location.href = 'login.html';
    });
}

function islogin(loginUser){
    let isLogin_1 = document.createElement('a');
    isLogin_1.className = 'nav-info isLogin';
    isLogin_1.href = 'javascript:void(0)';
    login.appendChild(isLogin_1);
    let isLogin_1img = document.createElement('img');
    isLogin_1img.src = '../img/loginout.png';
    isLogin_1.title = "退出登录";
    isLogin_1.appendChild(isLogin_1img);

    let isLogin_0 = document.createElement('a');
    isLogin_0.className = 'isLogin';
    isLogin_0.innerText = loginUser.userNickname;
    isLogin_0.href = 'myself.html';
    isLogin_0.title = "个人信息";
    login.appendChild(isLogin_0);

    isLogin_1.addEventListener('click', () => {
        $.ajax({
            url: '../../user/back',
            type: 'post',
            scriptCharset: 'utf-8',
            success: function (result) {
                if (result.status == 'success') {
                    window.location.reload();
                }
                else{
                    console.log(result.message);
                }
            },
            error: function () {
                console.log("请求失败！");
            }
        });
    })
}
// 判断是否登录的函数


$.ajax({
    url:'../../user/getSelfInformation',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if(result.status == 'success'){
            userinfo = result.user;
            getValue();
        }
        else{
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
// 请求用户个人信息

function getValue(){
	usr.value = userinfo.userAccount;
	pwd.value = userinfo.userPassword;
	nick.value = userinfo.userNickname;
	phone.value = userinfo.userTel;
	email.value = userinfo.userEmail;
	classname.value = userinfo.userClass;
	academy.value = userinfo.userAcademy;
	real.value = userinfo.userName;
	stunum.value = userinfo.userStudentnumber;
	$("input[name='gender']").each(function(){
		if($(this).val()==userinfo.userGender)
			$(this).attr("checked","checked");
	});

}
// 将后端拿到的数据显示在输入框

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
// 用户名校验

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
// 密码校验

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
// 昵称校验

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
// 手机号校验

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
// 班级校验（是否为空）


function submit(){
	if(flag == 1){
    $.ajax({
        url:'../../user/update',
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
            	var txt = result.message;
            	window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
                $('.ok').click(function(){
    				window.location.reload();
    			});

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
// 如果flag=1，则提交信息

    else{
        var txt = "信息有误";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
    }
} 
// flag=0，提示错误信息
