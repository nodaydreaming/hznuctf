var str = window.location.pathname;
var le = str.length;
var res = str.slice(-12);
if(res=='problem.html'){
    $("#problemset").css("color","#00ccff");
}
var loginUser;
let login = document.getElementsByClassName('nav-right-a')[0];
// 判断是否在当前页 是则导航栏样式改变
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
            loginUser = result.loginUser;
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
// 判断是否登录
// 登录图标显示以及退出登录

var url=location.href;
var index=url.lastIndexOf("\=");
id=url.substring(index+1,url.length);
// 获取url里面的id

var donequestionList = new Array();

$.ajax ({
    url : '../../questionList/listAcQuestionList',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
    if (result.status == 'success') {
        donequestionList = result.AcquestionList;
    }
    else{
        console.log(result.message);
    }
},
    error : function () {
        console.log("请求失败！");
    }
});
// 获取已做的题目list
var questionList;
$.ajax ({
    url : '../../questionList/queryQuestionList',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
    if (result.status == 'success') {
        questionList = result.questionList;
        questionList.forEach(element => {
            if(element.questionLinks != ""){
                var resource1 = element.questionLinks;
                var res1 = resource1.split(",");
                var resource2 = res1[0];
                element.questionLinks = resource2;
            }
            else{
                var resource1 = element.questionResources;
                var res1 = resource1.split(",");
                var resource2 = res1[0];
                var res2 = resource2.split("/");
                element.questionResources = "/hznuctf/downloadResource?filename=" + res2[res2.length - 1];
            }
        });
        getQuestion();
    }
    else{
        console.log(result.message);
    }
},
    error : function () {
        console.log("请求失败！");
    }
});
// 获取题目list

function getQuestion(){
    if(donequestionList.length != 0){
        for(var i = 0; i < questionList.length; ++i){
            if(questionList[i].questionId == id){
                var link;
                if(questionList[i].questionLinks != ""){
                    link = '<a href="http://'+questionList[i].questionLinks+'" target="_blank">'+ questionList[i].questionResources +'</a>';
                }
                else {
                    link = '<a href="'+questionList[i].questionResources+'">点击下载题目附件</a>';
                }
                $('.problemid').append(questionList[i].questionId);
                $('.problemtitle').append(questionList[i].questionTitle);
                $('.count').append(questionList[i].questionPoint);
                $('.source').append(questionList[i].questionAuthor);
                $('.attend').append(questionList[i].subNum);
                $('.getflag').append(questionList[i].acNum);
                $('.passrate').append(questionList[i].rate);
                $('.introduce').append(questionList[i].questionBody);
                $('.annex').append(link);

            for(var j = 0; j < donequestionList.length; ++j){
                if (id == donequestionList[j].questionId) {
                    var content = '<i class="fa fa-check-circle"></i>';
                    $('.done').append(content);
                    break;
                }
            }
            }
        }
    }
    else{
        for(var i = 0; i < questionList.length; ++i){
            if(questionList[i].questionId == id){
                var link;
                if(questionList[i].questionLinks != ""){
                    link = '<a href="'+questionList[i].questionResources+'" target="_blank">'+ questionList[i].questionResources +'</a>';
                }
                else {
                    link = '<a href="'+questionList[i].questionResources+'">点击下载题目附件</a>';
                }
                $('.problemid').append(questionList[i].questionId);
                $('.problemtitle').append(questionList[i].questionTitle);
                $('.count').append(questionList[i].questionPoint);
                $('.source').append(questionList[i].questionAuthor);
                $('.attend').append(questionList[i].subNum);
                $('.getflag').append(questionList[i].acNum);
                $('.passrate').append(questionList[i].rate);
                $('.introduce').append(questionList[i].questionBody);
                $('.annex').append(link);
            }
        }
    }
}


var answer = document.getElementById('answer');
function submit(){
    if(loginUser != null){
        $.ajax ({
            url : '../../question/judge',
            data: {'questionId':id,
                'answer':answer.value},
            type : 'post',
            scriptCharset : 'utf-8',
            success : function (result) {
                if (result.status == 'success') {
                    var txt = result.message;
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
                    $('.ok').click(function(){
                        window.location.reload();
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
        var txt = "请先登录！";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
        $('.ok').click(function(){
            location.href = 'login.html';
        });
    }
}

