var str = window.location.pathname;
var le = str.length;
var res = str.slice(-13);
if(res=='lookback.html'){
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
var highlightList
$.ajax({
  url:'../../Highlight/queryByCompetitionId',
  type : 'post',
  data:{'competitionId':id},
  scriptCharset : 'utf-8',
  success : function (result) {
      if (result.status == 'success') {
          highlightList = result.highlightList;
          getHighlight();
      }
      else{
          var txt = "该场比赛的精彩瞬间板块暂未开放！";
          window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
          $('.ok').click(function(){
            location.href = 'challenges.html';
          });                   
      }
  },
  error: function () {
      console.log("请求失败！");
  }
});

function getHighlight(){
    $('.title').append(highlightList[0].competitionTitle);
    var intro = '<p class="introduction">'+highlightList[0].highlightIntro+'</p>'
    $('.content').append(intro);

    $('.content-ul>.content-ul-li').eq(0).on("click",function(){
        $(".content").html("");
        var intro = '<p class="introduction">'+highlightList[0].highlightIntro+'</p>'
        $('.content').append(intro);
    })
    // 点击第一个改变带 .words样式的内容



    $('.content-ul>.content-ul-li').eq(1).on("click",function(){
        $(".content").html("");
        var image = new Array();
        var imageIntro = new Array();
        for(var i = 0; i < highlightList.length; i++) {
            if(highlightList[i].forGrade == 1){
                var num = highlightList.length - 1;
            }
            else{
                image.push(highlightList[i].image);
                imageIntro.push(highlightList[i].imageIntro);
                var num = highlightList.length;
            }
        }

        if(num%2 == 0){
            rowNum = num/2;
        }
        else{
            rowNum = (num+1)/2 ;
        }

        for(var k=0; k<rowNum; k++){
            var s=2*k+1;
            var Picture =
                '<div class="row">'+
                '<div class="flip-container">'+

                '<div class="flipper" >'+
                '<div class="front">'+
                '<img class = "album'+k*2+'" src="" style="width:70%">'+
                '</div>'+
                '<div class="back">'+
                '<h4><p class="information'+k*2+'"></p></h4>'+
                '</div>'+
                '</div>'+
                '</div>'+

                '<div class="flip-container" style = "" >'+
                '<div class="flipper" >'+
                '<div class="front">'+
                '<img class = "album'+s+'" src="" style="width:70%">'+
                '</div>'+
                '<div class="back">'+
                '<h4><p class="information'+s+'"></p></h4>'+
                '</div>'+
                '</div>'+
                '</div>'+

                '</div>'+
                '</div>';

            $('.content').append(Picture);
        }
        for(var j = 0; j<image.length; j++){
            $('.album'+j).attr("src",image[j]);
            $('.information'+j).append(imageIntro[j]);
        }
    })


    $('.content-ul>.content-ul-li').eq(2).on("click",function(){
        //写图片时，写html写的标签就可以，html这个方法可以帮助你识别html中的标签，自动转换html标签
        $(".content").html("");
        var sub =
            '<div id="reward">'+
            '<h4 class="subtitle">表彰奖励</h4><p class= "subwords"></p>'+
            '<div class="image"><img class="gradeimage" src="" style="width:70%;margin-left:150px;margin-right:150px;margin-top:20px;text-align:center;"></div>'+
            '</div>'
        var image = "";
        for(var i = 0; i < highlightList.length; i++) {
            if(highlightList[i].forGrade == 1){
                image = highlightList[i].image;
                reward = highlightList[i].reward;
                $('.content').append(sub);
                $('.subwords').append(reward);
                $('.gradeimage').attr("src",image);
            }
        }
    })

}