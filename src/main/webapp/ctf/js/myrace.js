var str = window.location.pathname;
var le = str.length;
var res = str.slice(-11);
if(res=='myrace.html'){
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


var joinedCompetitionList;

$.ajax ({
    url : '../../competition/listjoinedCompetition',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            joinedCompetitionList = result.joinedCompetitionList;
            getMyrace();
        }
        else{
            var content = '<h4 style="font-weight: bolder;text-align: center">暂无比赛</h4>';
            $('.all').html("");
            $(".all").append(content);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
// 获取参加过的赛事
function getMyrace(){
    var now = new Date();
    var count = 0;
    $(".now").html("");
    $(".finished").html("");
    $(".nowtitle").html("");
    $(".finishtitle").html("");
    if(joinedCompetitionList.length == 0){
        $(".nowtitle").append("进行中：暂未报名比赛");
        $(".finishtitle").append("已结束：暂无已结束比赛");
    }
    else if(joinedCompetitionList.length != 0){
        for(var i = 0; i < joinedCompetitionList.length; ++i){
            var start = new Date(joinedCompetitionList[i].start);
            var end = new Date(joinedCompetitionList[i].end);
            var s = joinedCompetitionList[i].start;
            var e = joinedCompetitionList[i].end;
            starttime = s;
            endtime = e;
            if(joinedCompetitionList[i].isteam==1){
                isteam='团队比赛';
            }
            else{
                isteam='个人比赛';
            }
            if(now < end){
                count++;
                if(now < start){
                    var content =
                        '<div class="container">'+
                        '<div class="contest row">'+
                        '<div class="img col-xs-2 col-sm-2 col-md-2 col-lg-2">'+
                        '<img src="../img/hacker.jpeg" alt="" class="img center-block" style="width: 200px;margin:10px;vertical-align: middle;">'+
                        '</div>'+
                        '<div class="news col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
                        '<ul>'+
                        '<li><h3 class="racename" style="font-weight: bold;">'+joinedCompetitionList[i].competitionTitle+'</h3></li>'+
                        '<li>比赛编号：<span class="raceNum">'+joinedCompetitionList[i].competitionNumber+'</span></li>'+
                        '<li>比赛形式：<span class="raceform">'+isteam+'</span></li>'+
                        '<li>竞赛时间：<span class="racetime">'+starttime+'至'+endtime+'</span></li>'+
                        '<li >查看比赛：<span class="racedetail"><a href="simulation.html?id='+joinedCompetitionList[i].competitionId+'">点击查看比赛</a></span></li>'+
                        '</ul>'+
                        '</div>'+
                        '<div class="nofinish '+joinedCompetitionList[i].competitionId+' apply col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                        '<a class="flag1 btn" href="teaminfo.html?id='+joinedCompetitionList[i].competitionId+'">&nbsp;查看队伍&nbsp;</a>&nbsp'+
                        '<i class="fa fa-bookmark fa-lg"> 已报名</i>';
                    '</div>'+
                    '</div>'+
                    '</div>';
                    $('.now').append(content);
                }
                // 比赛未开始：已报名
                else if(now >= start){
                    var content =
                        '<div class="container">'+
                        '<div class="contest row">'+
                        '<div class="img col-xs-2 col-sm-2 col-md-2 col-lg-2">'+
                        '<img src="../img/hacker.jpeg" alt="" class="img center-block" style="width: 200px;margin:10px;vertical-align: middle;">'+
                        '</div>'+
                        '<div class="news col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
                        '<ul>'+
                        '<li><h3 class="racename" style="font-weight: bold;">'+joinedCompetitionList[i].competitionTitle+'</h3></li>'+
                        '<li>比赛编号：<span class="raceNum">'+joinedCompetitionList[i].competitionNumber+'</span></li>'+
                        '<li>比赛形式：<span class="raceform">'+isteam+'</span></li>'+
                        '<li>竞赛时间：<span class="racetime">'+starttime+'至'+endtime+'</span></li>'+
                        '<li >查看比赛：<span class="racedetail"><a href="simulation.html?id='+joinedCompetitionList[i].competitionId+'">点击查看比赛</a></span></li>'+
                        '</ul>'+
                        '</div>'+
                        '<div class="nofinish '+joinedCompetitionList[i].competitionId+' apply col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                        '<a class="flag1 btn" href="../../competition/html/competition.html?id='+joinedCompetitionList[i].competitionId+'">&nbsp;进入比赛&nbsp;</a>&nbsp'+
                        '<i class="fa fa-bookmark fa-lg"> 已报名</i>';
                    '</div>'+
                    '</div>'+
                    '</div>';
                    $('.now').append(content);
                }
                // 比赛已开始：进入比赛
            }
            // 比赛未结束
        }
        if(count == 0){
            $(".nowtitle").append("进行中：暂未报名比赛");
        }
        // 比赛未结束的显示

        var endlength = joinedCompetitionList.length - count;
        // 获得已结束赛事的length
        if(endlength == 0){
            $(".finishtitle").append("已结束：暂无已结束比赛");
        }
        else if(endlength != 0){
            if(endlength <= 4){
                for(var i = 0; i < joinedCompetitionList.length; ++i){
                    var start = new Date(joinedCompetitionList[i].start);
                    var end = new Date(joinedCompetitionList[i].end);
                    var s = joinedCompetitionList[i].start;
                    var e = joinedCompetitionList[i].end;
                    starttime = s;
                    endtime = e;

                    if(joinedCompetitionList[i].isteam==1){
                        isteam='团队比赛';
                    }
                    else{
                        isteam='个人比赛';
                    }

                    if(now >= end){
                        var content =
                            '<div class="container">'+
                            '<div class="contest row">'+
                            '<div class="img col-xs-2 col-sm-2 col-md-2 col-lg-2">'+
                            '<img src="../img/hacker.jpeg" alt="" class="img center-block" style="width: 200px;margin:10px;vertical-align: middle;">'+
                            '</div>'+
                            '<div class="news col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
                            '<ul>'+
                            '<li><h3 class="racename" style="font-weight: bold;">'+joinedCompetitionList[i].competitionTitle+'</h3></li>'+
                            '<li>比赛编号：<span class="raceNum">'+joinedCompetitionList[i].competitionNumber+'</span></li>'+
                            '<li>比赛形式：<span class="raceform">'+isteam+'</span></li>'+
                            '<li>竞赛时间：<span class="racetime">'+starttime+'至'+endtime+'</span></li>'+
                            '<li >查看比赛：<span class="racedetail"><a href="simulation.html?id='+joinedCompetitionList[i].competitionId+'">点击查看比赛</a></span></li>'+
                            '</ul>'+
                            '</div>'+
                            '<div class="lookback col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                            '<a class="btn" href="">&nbsp;精彩回顾&nbsp;</a>'+
                            '<i class="fa fa-bookmark fa-lg"> 已结束</i>'+
                            '</div>'+
                            '</div>'+
                            '</div>';

                        $('.finished').append(content);
                    }
                }
            }
            // 长度小于4时,在第一页显示全部

            else if(endlength > 4){
                for(var i = 0; i < 4; ++i){
                    var start = new Date(joinedCompetitionList[i].start);
                    var end = new Date(joinedCompetitionList[i].end);
                    var s = joinedCompetitionList[i].start;
                    var e = joinedCompetitionList[i].end;
                    starttime = s;
                    endtime = e;

                    if(joinedCompetitionList[i].isteam==1){
                        isteam='团队比赛';
                    }
                    else{
                        isteam='个人比赛';
                    }

                    if(now >= end){
                        var content =
                            '<div class="container">'+
                            '<div class="contest row">'+
                            '<div class="img col-xs-2 col-sm-2 col-md-2 col-lg-2">'+
                            '<img src="../img/hacker.jpeg" alt="" class="img center-block" style="width: 200px;margin:10px;vertical-align: middle;">'+
                            '</div>'+
                            '<div class="news col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
                            '<ul>'+
                            '<li><h3 class="racename" style="font-weight: bold;">'+joinedCompetitionList[i].competitionTitle+'</h3></li>'+
                            '<li>比赛编号：<span class="raceNum">'+joinedCompetitionList[i].competitionNumber+'</span></li>'+
                            '<li>比赛形式：<span class="raceform">'+isteam+'</span></li>'+
                            '<li>竞赛时间：<span class="racetime">'+starttime+'至'+endtime+'</span></li>'+
                            '<li >查看比赛：<span class="racedetail"><a href="simulation.html?id='+joinedCompetitionList[i].competitionId+'">点击查看比赛</a></span></li>'+
                            '</ul>'+
                            '</div>'+
                            '<div class="lookback col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                            '<a class="btn" href="">&nbsp;精彩回顾&nbsp;</a>'+
                            '<i class="fa fa-bookmark fa-lg"> 已结束</i>'+
                            '</div>'+
                            '</div>'+
                            '</div>';

                        $('.finished').append(content);
                    }
                }
                $("#Page").sPage({
                    page:1,//当前页码，必填
                    total:endlength,//数据总条数，必填
                    pageSize:4,//每页显示多少条数据，默认10条
                    totalTxt:'共'+endlength+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                    showTotal:false,//是否显示总条数，默认关闭：false
                    showSkip:true,//是否显示跳页，默认关闭：false
                    showPN:true,//是否显示上下翻页，默认开启：true
                    prevPage:"上一页",//上翻页文字描述，默认“上一页”
                    nextPage:"下一页",//下翻页文字描述，默认“下一页”
                    backFun:function(page){
                        $('.finished').html("");
                        var lastPage = parseInt(joinedCompetitionList.length/4)+1;
                        if(page < lastPage){
                            $('.finished').html("");
                            for(var i = (page-1)*4; i < page*4; i++){
                                var start = new Date(joinedCompetitionList[i].start);
                                var end = new Date(joinedCompetitionList[i].end);
                                var s = joinedCompetitionList[i].start;
                                var e = joinedCompetitionList[i].end;
                                starttime = s;
                                endtime = e;

                                if(joinedCompetitionList[i].isteam==1){
                                    isteam='团队比赛';
                                }
                                else{
                                    isteam='个人比赛';
                                }

                                if(now >= end){
                                    var content =
                                        '<div class="container">'+
                                        '<div class="contest row">'+
                                        '<div class="img col-xs-2 col-sm-2 col-md-2 col-lg-2">'+
                                        '<img src="../img/hacker.jpeg" alt="" class="img center-block" style="width: 200px;margin:10px;vertical-align: middle;">'+
                                        '</div>'+
                                        '<div class="news col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
                                        '<ul>'+
                                        '<li><h3 class="racename" style="font-weight: bold;">'+joinedCompetitionList[i].competitionTitle+'</h3></li>'+
                                        '<li>比赛编号：<span class="raceNum">'+joinedCompetitionList[i].competitionNumber+'</span></li>'+
                                        '<li>比赛形式：<span class="raceform">'+isteam+'</span></li>'+
                                        '<li>竞赛时间：<span class="racetime">'+starttime+'至'+endtime+'</span></li>'+
                                        '<li >查看比赛：<span class="racedetail"><a href="simulation.html?id='+joinedCompetitionList[i].competitionId+'">点击查看比赛</a></span></li>'+
                                        '</ul>'+
                                        '</div>'+
                                        '<div class="lookback col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                                        '<a class="btn" href="">&nbsp;精彩回顾&nbsp;</a>'+
                                        '<i class="fa fa-bookmark fa-lg"> 已结束</i>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>';

                                    $('.finished').append(content);
                                }
                            }
                        }
                        // 非最后一页的显示

                        else if(page == lastPage){
                            $('.finished').html("");
                            for(var i = (page-1)*4; i < joinedCompetitionList.length; i++){
                                var start = new Date(joinedCompetitionList[i].start);
                                var end = new Date(joinedCompetitionList[i].end);
                                var s = joinedCompetitionList[i].start;
                                var e = joinedCompetitionList[i].end;
                                starttime = s;
                                endtime = e;

                                if(joinedCompetitionList[i].isteam==1){
                                    isteam='团队比赛';
                                }
                                else{
                                    isteam='个人比赛';
                                }
                                if(now >= end){
                                    var content =
                                        '<div class="container">'+
                                        '<div class="contest row">'+
                                        '<div class="img col-xs-2 col-sm-2 col-md-2 col-lg-2">'+
                                        '<img src="../img/hacker.jpeg" alt="" class="img center-block" style="width: 200px;margin:10px;vertical-align: middle;">'+
                                        '</div>'+
                                        '<div class="news col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
                                        '<ul>'+
                                        '<li><h3 class="racename" style="font-weight: bold;">'+joinedCompetitionList[i].competitionTitle+'</h3></li>'+
                                        '<li>比赛编号：<span class="raceNum">'+joinedCompetitionList[i].competitionNumber+'</span></li>'+
                                        '<li>比赛形式：<span class="raceform">'+isteam+'</span></li>'+
                                        '<li>竞赛时间：<span class="racetime">'+starttime+'至'+endtime+'</span></li>'+
                                        '<li >查看比赛：<span class="racedetail"><a href="simulation.html?id='+joinedCompetitionList[i].competitionId+'">点击查看比赛</a></span></li>'+
                                        '</ul>'+
                                        '</div>'+
                                        '<div class="lookback col-xs-4 col-sm-4 col-md-4 col-lg-4">'+
                                        '<a class="btn" href="">&nbsp;精彩回顾&nbsp;</a>'+
                                        '<i class="fa fa-bookmark fa-lg"> 已结束</i>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>';

                                    $('.finished').append(content);
                                }
                            }
                        }
                        // 最后一页显示


                    }
                });
            }
        }
    }
}

function searchCompetition(){
    var searchtext = document.getElementById("search");
    $.ajax ({
        url : '../../competition/fuzzyQueryCompetitionByUserId',
        data: {'text':searchtext.value},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if (result.status == 'success') {
                joinedCompetitionList = result.joinedCompetitionList;
                getMyrace();
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
