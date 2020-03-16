var str = window.location.pathname;
var le = str.length;
var res = str.slice(-9);
if(res=='home.html'){
    $("#home").css("color","#00ccff");
};
// 判断是否在当前页 是则导航栏样式改变

let login = document.getElementsByClassName('nav-right-a')[0];

$.ajax ({
    url : '../user/getUserMap',
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
    unLogin_0.href = 'html/login.html';
    login.appendChild(unLogin_0);

    let unLogin_1 = document.createElement('a');
    unLogin_1.className = 'unLogin';
    unLogin_1.innerText = '注 册';
    unLogin_1.href = 'html/register.html';
    login.appendChild(unLogin_1);
}
function islogin(loginUser){
    let isLogin_1 = document.createElement('a');
    isLogin_1.className = 'nav-info isLogin';
    isLogin_1.href = 'javascript:void(0)';
    login.appendChild(isLogin_1);
    let isLogin_1img = document.createElement('img');
    isLogin_1img.src = 'img/loginout.png';
    isLogin_1.title = "退出登录";
    isLogin_1.appendChild(isLogin_1img);

    let isLogin_0 = document.createElement('a');
    isLogin_0.className = 'isLogin';
    isLogin_0.innerText = loginUser.userNickname;
    isLogin_0.href = 'html/myself.html';
    isLogin_0.title = "个人信息";
    login.appendChild(isLogin_0);

    isLogin_1.addEventListener('click', () => {
        $.ajax({
            url: '../user/back',
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

$.ajax ({
    url : '../carousel/listSelectedCarousel',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            var carouselList = result.carouselList;
            getCarousel(carouselList);
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});  
// 轮播图的显示 

function getCarousel(carouselList){
    for(var i = 0; i < carouselList.length; ++i){
        if(i==0){
            var content = '<div class="item active">'+
            '<img src="'+carouselList[i].image+'" class="center-block" alt="First slide">'+
            '</div>';
            $(".carousel-inner").append(content);
        }
        else{
            var content = '<div class="item">'+
            '<img src="'+carouselList[i].image+'" class="center-block" alt="slide">'+
            '</div>';
            $(".carousel-inner").append(content);
        }
    }
};
// 轮播图函数

$.ajax ({
    url : '../notice/listNotice',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            var informationList = result.noticeList;
            getList(informationList);
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});    
//获取通知栏的信息

function getList(informationList){
    var length = informationList.length > 3 ? 3 : informationList.length;
    for(var i = 0; i < length; ++i){
        var content = 
        '<div class="title">'+
            '<h4><a href="html/notice.html?id='+informationList[i].informationId+'">'+informationList[i].informationTitle+'</a></h4>'+
        '</div>'+
        '<div class="abstract">'+
            '<p class="words">'+informationList[i].informationDetail+'</p>'+
        '</div>';
        $('.notice-info').append(content);
    }
}
//通知栏信息

$.ajax ({
    url : '../Questiontype/ListQuestiontype',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            var typeList = result.typeList;
            getType(typeList);
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
// 获取题目类型
function getType(typeList){
    if(typeList.length % 2 == 0){
        for(var i = 0; i < typeList.length; i+=2){
            if(i != typeList.length-1){
                var content = '<ul class="instro-ul">'+
                    '<li>'+typeList[i].questionType+'</li>'+
                    '<li>'+typeList[i+1].questionType+'</li></ul>'+
                    '<ul class="instro-hide-ul">'+
                    '<li class="first"><b>'+typeList[i].questionType+'：</b>'+typeList[i].typeIntro+'</li>'+
                    '<li class="second"><b>'+typeList[i+1].questionType+'：</b>'+typeList[i+1].typeIntro+'</li>'+
                    '</ul>';
                $(".intro").append(content);
            }
        }
    }
    else{
        for(var i = 0; i < typeList.length-1; i+=2){
            if(i != typeList.length-1){
                var content = '<ul class="instro-ul">'+
                    '<li>'+typeList[i].questionType+'</li>'+
                    '<li>'+typeList[i+1].questionType+'</li></ul>'+
                    '<ul class="instro-hide-ul">'+
                    '<li class="first"><b>'+typeList[i].questionType+'：</b>'+typeList[i].typeIntro+'</li>'+
                    '<li class="second"><b>'+typeList[i+1].questionType+'：</b>'+typeList[i+1].typeIntro+'</li>'+
                    '</ul>';
                $(".intro").append(content);
            }

        }
        var content = '<ul class="instro-ul">'+
            '<li>'+typeList[typeList.length-1].questionType+'</li>'+
            '</ul>'+
            '<ul class="instro-hide-ul">'+
            '<li class="first"><b>'+typeList[typeList.length-1].questionType+'：</b>'+typeList[i].typeIntro+'</li>'+
            '</ul>';
        $(".intro").append(content);
    }
    //题目类型显示

    if(typeList.length%2==0){
        var length = typeList.length/2;
        for (var i = 0; i < length; ++i){
            let instroUl = $(`.instro-ul:eq(${i})`);
            let instroHideUl = $(`.instro-hide-ul:eq(${i})`);
            instroUl.children(':first').click(function () {
                instroHideUl.children(':first').slideToggle();
            });
            instroUl.children(':last').click(function () {
                instroHideUl.children(':last').slideToggle();
            });
        }
    }
    else{
        var length = parseInt(typeList.length/2+1);
        for (var i = 0; i < length; ++i){
            if(i != length-1){
                let instroUl = $(`.instro-ul:eq(${i})`);
                let instroHideUl = $(`.instro-hide-ul:eq(${i})`);
                instroUl.children(':first').click(function () {
                    instroHideUl.children(':first').slideToggle();
                });
                instroUl.children(':last').click(function () {
                    instroHideUl.children(':last').slideToggle();
                });
            }
            else{
                let instroUl = $(`.instro-ul:eq(${i})`);
                let instroHideUl = $(`.instro-hide-ul:eq(${i})`);
                instroUl.children().click(function () {
                    instroHideUl.children(':first').slideToggle();
                });
            }
        }
    }
    // 弹出介绍
}
// 题目类型显示以及介绍的弹出
// 题目类型显示以及介绍的弹出
