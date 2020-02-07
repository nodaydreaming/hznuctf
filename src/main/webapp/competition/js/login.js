var number = document.getElementById("number");
var numhint = document.getElementById("numberhint");
var usr = document.getElementById("username");
var usrhint = document.getElementById("usernamehint");
var pwd = document.getElementById("password");
var pwdhint = document.getElementById("passwordhint");

var flag = 0;
var reg = /^[A-Za-z0-9]{3,20}$/;
var numreg = /^[0-9]{3,20}$/;

number.onblur = function(){
	if (number.value == "" || number.value == null) {
        numhint.innerHTML = '赛事编号不能为空！';
        numhint.style.color = "red";
        number.style.border = "2px solid red";
        flag = 0;
    }
    else{
        number.style.border = "2px solid #00ccff";
        numhint.innerHTML = '';
        flag = 1;
    }
}

usr.onblur = function(){
    if (usr.value == "" || usr.value == null) {
        usrhint.innerHTML = '账号不能为空！';
        usrhint.style.color = "red";
        usr.style.border = "2px solid red";
        flag = 0;
    }

    else if(!reg.test(usr.value)) {
        usrhint.innerHTML = '账号必须是3-20个小写字母或数字';
        usrhint.style.color = "red";
        usr.style.border = "2px solid red";
        flag = 0;
    }
    else{
        usr.style.border = "2px solid #00ccff";
        usrhint.innerHTML = '';
        flag = 1;
    }
}

pwd.onblur = function(){
    if (pwd.value == '' || pwd.value == null) {
        pwdhint.innerHTML = '密码不能为空！';
        pwdhint.style.color = "red";
        pwd.style.border = "2px solid red";
        flag = 0;
    } 
    else if (!reg.test(pwd.value)) {
        pwdhint.innerHTML = '密码必须是3-20个小写字母或数字';
        pwdhint.style.color = "red";
        pwd.style.border = "2px solid red";
        flag = 0;
    }
    else{
        pwd.style.border = "2px solid #00ccff";
        flag = 1;
        pwdhint.innerHTML = '';
    }
}

function login(){
	if(flag == 0){
		var txt=  "信息有误";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
        $('.ok').click(function(){
            window.location.reload();
        });
	}
	else{
		$.ajax ({
            url : '../../contest/login',
            data : {
                "userAccount": usr.value,
                "userPassword": pwd.value,
                "competitionNumber":number.value
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
                    window.location.href = 'competition.html';
                }
            },
            error : function () {
                console.log("请求失败！");
            }
        });
	}
}