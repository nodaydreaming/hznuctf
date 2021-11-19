var str = window.location.pathname;
var le = str.length;
var res = str.slice(-15);
if(res=='noticelist.html'){
    $("#home").css("color","#00ccff");
};
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


$.ajax ({
    url : '../../notice/listNotice',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            var informationList = result.noticeList;
            getNotice(informationList);
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
// 获取通知列表

function getNotice(informationList){
    if(informationList.length == 0){
        var content = '<div style="text-align:center;"><label>暂无通知</label></div>';
        $('table').after(content);
    }
    else{
        if(informationList.length < 15){
            for(var i = 0; i < informationList.length; ++i){
                var content =
                '<tr class="information">'+
                    '<td class="admin_id">'+informationList[i].adminName+'</td>'+
                    '<td class="information_title">'+
                    '<a href="notice.html?id='+informationList[i].informationId+'">'+informationList[i].informationTitle+'</a>'+
                    '</td>'+
                    '<td class="create_time">'+informationList[i].informationCreateTime+'</td>'+
                '</tr>';
                      
                $('tbody').append(content);
            }
        }
        else if(informationList.length >= 15){
            for(var j = 0; j < 15; ++j){
                var content =
                '<tr class="information">'+
                    '<td class="admin_id">'+informationList[j].adminName+'</td>'+
                    '<td class="information_title">'+
                    '<a href="notice.html?id='+informationList[j].informationId+'">'+informationList[j].informationTitle+'</a>'+
                    '</td>'+
                    '<td class="create_time">'+informationList[j].informationCreateTime+'</td>'+
                '</tr>';
                      
                $('tbody').append(content);
            }
            $("#Page").sPage({
                page:1,//当前页码，必填
                total:informationList.length,//数据总条数，必填
                pageSize:15,//每页显示多少条数据，默认10条
                totalTxt:'共'+informationList.length+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                showTotal:false,//是否显示总条数，默认关闭：false
                showSkip:true,//是否显示跳页，默认关闭：false
                showPN:true,//是否显示上下翻页，默认开启：true
                prevPage:"上一页",//上翻页文字描述，默认“上一页”
                nextPage:"下一页",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                    $('tbody').html("");
                    var lastpage = parseInt(informationList.length/15)+1;
                    if(page<lastpage){
                        for(var k = (page-1)*15; k < page*15; k++){
                            var content =
                            '<tr class="information">'+
                                '<td class="admin_id">'+informationList[k].adminName+'</td>'+
                                '<td class="information_title">'+
                                '<a href="notice.html?id='+informationList[k].informationId+'">'+informationList[k].informationTitle+'</a>'+
                                '</td>'+
                                '<td class="create_time">'+informationList[k].informationCreateTime+'</td>'+
                            '</tr>';
                                  
                            $('tbody').append(content);
                        }
                    }
                    else if(page == lastpage){
                        for(var k = (page-1)*15; k < informationList.length; k++){
                            var content = 
                            '<tr class="information">'+
                                '<td class="admin_id">'+informationList[k].adminName+'</td>'+
                                '<td class="information_title">'+
                                '<a href="notice.html?id='+informationList[k].informationId+'">'+informationList[k].informationTitle+'</a>'+
                                '</td>'+
                                '<td class="create_time">'+informationList[k].informationCreateTime+'</td>'+
                            '</tr>';
                                  
                            $('tbody').append(content);
                        }
                    }
                }
            });
        }
    }
}
// 通知列表函数


//前后端连接后删除部分
// getNotice();      
//前后端连接后删除部分      

var searchtext = document.getElementById("search");
function searchNotice(){
    if(searchtext.value != null){
        $.ajax ({
            url : '../../notice/FuzzyQuery',
            data: {'text':searchtext.value},
            type : 'post',
            scriptCharset : 'utf-8',
            success : function (result) {
                if (result.status == 'success') {
                    var informationList = result.noticeList;
                    $('tbody').html("");
                    $("#Page").html("");
                    getNotice(informationList);
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
}
// 搜索功能
