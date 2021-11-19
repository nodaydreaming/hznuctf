var str = window.location.pathname;
var le = str.length;
var res = str.slice(-13);
if(res=='teaminfo.html'){
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


var url=location.href;
var index=url.lastIndexOf("\=");
id=url.substring(index+1,url.length);
// 获取url里面的id
var myteam;
$.ajax ({
    url : '../../myTeam/queryMyteamByCompetitionId',
    type : 'post',
    data:{
        'competitionId': id
    },
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
        	myteam = result.myTeam;
            getTeaminfo();
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});


//前后端连接后删除部分
// var myteam = {
// 	'competitionTitle':'杭州师范大学第一届网络与信息安全竞赛',
// 	'teamId':1,
// 	'teamName':'dsakflkvnklsd小队',
// 	'captainName':'陈CC',
// 	'captainTel':'17376594108',
// 	'captainNumber':'2017212212239',
// 	'captainClass':'计算机172',
// 	'teamInvitationCode':'dklfsdlkhalkfa12s',
// 	'FirstMemberId':34,
// 	'FirstMemberName':'Eva',
// 	'SecondMemberId':45,
// 	'SecondMemberName':'Amy',
// 	'isCaptain':1
// }
//前后端连接后删除部分


function getTeaminfo(){
	var member1 = myteam.firstMemberName;
	var member2 = myteam.secondMemberName;
	$(".title").html(myteam.competitionTitle);
	$(".jointeam").html(myteam.teamName);
	$(".leadername").html(myteam.captainName);
	$(".phone").html(myteam.captainTel);
	$(".stunum").html(myteam.captainNumber);
	$(".classname").html(myteam.captainClass);
	$(".code").html(myteam.teamInvitationCode);

	if(member1 == null && member2 == null){
		$(".info").html("暂无队员！");
        var content = 
        '<div class="button" style="text-align: center;">'+
            '<a class="btn operation" style="font-weight: bolder;background-color: #0099ff;color: #fff" onclick="disband()">解散队伍</a>'+
        '</div>';
        $(".memberinfo").append(content);
	}
	else if(member1 != null && member2 == null){
		var content = 
		'<label class="member1 col-xs-6 col-sm-6 col-md-6 col-lg-6">队员一：'+
            '<span class="member1name">'+member1+'</span>'+
            '<span class="delete"><a onclick="del('+myteam.firstMemberId+')">'+
            '<i class="fa fa-trash-o"></i></a></span>'+
        '</label>'+
        '<div class="button" style="text-align: center;">'+
            '<a class="btn operation" style="font-weight: bolder;background-color: #0099ff;color: #fff" onclick="disband()">解散队伍</a>'+
        '</div>';
        $(".memberinfo").append(content);
        if(myteam.isCaptain == 0){
        	$(".delete").addClass("fade");
            $(".operation").html("退出队伍");
        }
	}
	else if(member1 == null && member2 != null){
		var content = 
		'<label class="member1 col-xs-6 col-sm-6 col-md-6 col-lg-6">队员一：'+
            '<span class="member1name">'+member2+'</span>'+
            '<span class="delete"><a onclick="del('+myteam.secondMemberId+')">'+
            '<i class="fa fa-trash-o"></i></a></span>'+
        '</label>'+
        '<div class="button" style="text-align: center;">'+
            '<a class="btn operation" style="font-weight: bolder;background-color: #0099ff;color: #fff" onclick="disband()">解散队伍</a>'+
        '</div>';
        $(".memberinfo").append(content);
        if(myteam.isCaptain == 0){
        	$(".delete").addClass("fade");
            $(".operation").html("退出队伍");
        }
	}
	else{
		var content = 
		'<label class="member1 col-xs-6 col-sm-6 col-md-6 col-lg-6">队员一：'+
            '<span class="member1name">'+member1+'</span>'+
            '<span class="delete"><a onclick="del('+myteam.firstMemberId+')">'+
            '<i class="fa fa-trash-o"></i></a></span>'+
        '</label>'+
        '<label class="member2 col-xs-6 col-sm-6 col-md-6 col-lg-6">队员二：'+
            '<span class="member2name">'+member2+'</span>'+
            '<span class="delete"><a onclick="del('+myteam.secondMemberId+')">'+
            '<i class="fa fa-trash-o"></i></a></span>'+
        '</label>'+
        '<div class="button" style="text-align: center;">'+
            '<a class="btn operation" style="font-weight: bolder;background-color: #0099ff;color: #fff" onclick="disband()">解散队伍</a>'+
        '</div>';
        $(".memberinfo").append(content);
        if(myteam.isCaptain == 0){
        	$(".delete").addClass("fade");
            $(".operation").html("退出队伍");
        }
	}

}


function del(member){
	$.ajax ({
    url : '../../Teamcompetitor/delete',
    type : 'post',
    data:{
        'userId': member,
        'teamId':myteam.teamId
    },
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
        	var txt = result.message;
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
			$('.ok').click(function(){
				window.location.reload() ;
			});
        }
        else{
            console.log(result.message);            
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
}
// 删除函数

function disband(){
    $.ajax ({
    url : '../../Team/dismissOrSignOut',
    type : 'post',
    data:{
        'teamId':myteam.teamId
    },
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            var txt = result.message;
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
            $('.ok').click(function(){
               location.href = 'challenges.html' ;
            });
        }
        else{
            console.log(result.message);            
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
}