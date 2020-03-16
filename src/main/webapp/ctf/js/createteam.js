var str = window.location.pathname;
var le = str.length;
var res = str.slice(-15);
if(res=='createteam.html'){
    $("#challenges").css("color","#00ccff");
}


// 判断是否在当前页 是则导航栏样式改变
let login = document.getElementsByClassName('nav-right-a')[0];

$.ajax ({
    url : '../../user/getUserMap',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.loginUser == null) {
            nologin(result.loginUser);
        }
        else{
            islogin(result.loginUser);
        }
    },
    error : function () {
        console.log("请求失败！");
    }

});
//判断是否登陆

function nologin(result) {
    let unLogin_0 = document.createElement('a');
    unLogin_0.className = 'unLogin nav-right-a-first';
    unLogin_0.innerText = '登 录';
    unLogin_0.href = '../html/login.html';
    login.appendChild(unLogin_0);

    let unLogin_1 = document.createElement('a');
    unLogin_1.className = 'unLogin';
    unLogin_1.innerText = '注 册';
    unLogin_1.href = '../html/register.html';
    login.appendChild(unLogin_1);
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
    isLogin_0.href = '../html/myself.html';
    isLogin_0.title = "个人信息";
    login.appendChild(isLogin_0);

    isLogin_1.addEventListener('click', () => {
        $.ajax({
            url: '../../user/back',
            type: 'post',
            scriptCharset: 'utf-8',
            success: function (result) {
                if (result.status == 'success') {
                    location.href = 'challenges.html';
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
// 判断是否登录
// 登录图标显示以及退出登录

var team = document.getElementById('teamname');
var teamhint = document.getElementById('teamhint');


var flag = 0;

team.onblur = function(){
	if (team.value == "" || team.value == null) {
        teamhint.innerHTML = '队伍名不能为空！';
        teamhint.style.color = "red";
        team.style.border = "1px solid red";
        flag = 0;
    }

    else if(team.value.length < 3 || team.value.length > 20) {
        teamhint.innerHTML = '队伍名必须是3-20个字符';
        teamhint.style.color = "red";
        team.style.border = "1px solid red";
        flag = 0;
    }
    else{
        team.style.border = "1px solid green";
        teamhint.innerHTML = '';
        flag = 1;
    }
}
// 队名校验


var url=location.href;
var index=url.lastIndexOf("\=");
var id=url.substring(index+1,url.length);
// 获取url里面的id

$.ajax ({
    url : '../../competition/queryCompetitionById',
    type : 'post',
    data : {"competitionId" : id},
    scriptCharset : 'utf-8',
    success : function (result) {
        if(result.competition != null){
            $(".competition_title").text(result.competition.competitionTitle);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
    
});

create = function(){
    if(flag == 1){
    	$.ajax({
            url:'../../Team/insert',
            data:{
                'teamCompetitionId': id,
                'teamName':team.value
            },
            type : 'post',
            scriptCharset : 'utf-8',
            success : function (result) {
                if(result.status == 'success'){
                	var txt = result.message;
    			    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
    			    $('.ok').click(function(){
    					location.href = 'teaminfo.html?id='+id+'';
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
        var txt = "信息有误";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
        $('.ok').click(function(){
			window.location.reload();
		});
    }
}



