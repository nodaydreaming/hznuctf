var str = window.location.pathname;
var le = str.length;
var res = str.slice(-15);
if(res=='scoreboard.html'){
    $("#scoreboard").css("color","#00ccff");
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

var type = new Array();
// 定义一个全局变量数组，将所有type类型存入
var result;
$.ajax ({
    url : '../../Questiontype/ListQuestiontype',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            typeList = result.typeList;
            getType();
            getTable();
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }

});
//题目类型

function getType(){
    for(var i = 0; i < typeList.length; ++i){
        type.push(typeList[i].questionType);
        var content = '<li class="nav-item">'+
        '<a class="nav-link" data-toggle="tab" href="#'+typeList[i].questionType+'" onclick="getScore()">'+typeList[i].questionType+'</a>'+
        '</li>';
        $('.type').append(content);
    }
}
// 获取题目类型的函数

function getTable(){
    for(var i = 0; i < type.length; ++i){
        var content = '<div id="'+type[i]+'" class="tab-pane">'+
            '<table class="table table-hover table-striped table-bordered">'+
              '<thead>'+
                '<tr>'+
                  '<th class="col-sm-2 col-md-2 col-lg-2" style="text-align: center;">排 名</th>'+
                  '<th class="col-sm-6 col-md-6 col-lg-6" style="text-align: center;">用户昵称</th>'+
                  '<th class="col-sm-2 col-md-2 col-lg-2" style="text-align: center;">解题数</th>'+
                  '<th class="col-sm-2 col-md-2 col-lg-2" style="text-align: center;">积 分</th>'+
                '</tr>'+          
              '</thead>'+
              '<tbody class="'+type[i]+'">'+
              '</tbody>'+          
              '</table>'+
              '<div id="'+type[i]+'Page" style="text-align: center;margin: 20px;"></div>'
            '</div>';
        $('.tab-content').append(content);        
    };
}
// 获取积分榜表头函数

//前后端连接后删除部分
// var result = {
//     'status':'success',
//     'message':'返还成功',
//     'Misc':[{'nickname':'aa','acNum':13,'totalScore':145},
//     {'nickname':'ab','acNum':12,'totalScore':125},
//     {'nickname':'sd','acNum':12,'totalScore':125},
//     {'nickname':'sd','acNum':12,'totalScore':125},
//     ],

//     'Web':[{'nickname':'bb','acNum':14,'totalScore':142},
//     {'nickname':'bd','acNum':12,'totalScore':132},
//     {'nickname':'sd','acNum':12,'totalScore':125},
//     ],

//     'Crypto':[{'nickname':'cc','acNum':13,'totalScore':145},
//     {'nickname':'sd','acNum':12,'totalScore':125},
//     {'nickname':'sd','acNum':12,'totalScore':125},
//     {'nickname':'sd','acNum':12,'totalScore':125},
//     ],

//     'Reverse':[{'nickname':'dd','acNum':13,'totalScore':145},
//     {'nickname':'agfg','acNum':12,'totalScore':125},
//     {'nickname':'dd','acNum':13,'totalScore':145},
//     {'nickname':'dd','acNum':13,'totalScore':145},
//     ],

//     'Pwn':[{'nickname':'ee','acNum':13,'totalScore':145},
//     {'nickname':'sds','acNum':12,'totalScore':125},
//     {'nickname':'sds','acNum':12,'totalScore':125},
//     {'nickname':'sds','acNum':12,'totalScore':125},
//     ],

//     'Code':[{'nickname':'ff','acNum':13,'totalScore':145},  
//     {'nickname':'ff','acNum':13,'totalScore':145},
//     {'nickname':'ff','acNum':13,'totalScore':145},
//     {'nickname':'ff','acNum':13,'totalScore':145},
//     {'nickname':'ff','acNum':13,'totalScore':145},
//     {'nickname':'dfa','acNum':12,'totalScore':125}],
// }
//前后端连接后删除部分


$.ajax ({
    url : '../../ScoreList/queryEverytypeList',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            window.result = result;
            getScore();
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }

});
// 获取各类型积分榜

function getScore(){
    for(var i = 0; i < type.length; ++i){
        var types = result[type[i]];
        // 获取result中的某一type数组
        if(types.length < 15){
                $('.'+type[i]).html("");
            for(var j = 0; j < types.length; ++j){
                var rank = j+1;
                var content = 
                '<tr>'+
                  '<td>'+rank+'</td>'+
                  '<td>'+types[j].userNickname+'</td>'+
                  '<td>'+types[j].acNum+'</td>'+
                  '<td>'+types[j].score+'</td>'+
                '</tr>';
                $('.'+type[i]).append(content);
            }
        }
        else if(types.length >= 15){
            $('.'+type[i]).html("");
            for(var k = 0; k < 15; ++k){
                var rank = k+1;
                var content = 
                '<tr>'+
                  '<td>'+rank+'</td>'+
                  '<td>'+types[k].userNickname+'</td>'+
                  '<td>'+types[k].acNum+'</td>'+
                  '<td>'+types[k].score+'</td>'+
                '</tr>';

                $('.'+type[i]).append(content);
            }
            $("#"+type[i]+"Page").sPage({
                page:1,//当前页码，必填
                total:types.length,//数据总条数，必填
                pageSize:15,//每页显示多少条数据，默认10条
                totalTxt:'共'+types.length+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                showTotal:false,//是否显示总条数，默认关闭：false
                showSkip:true,//是否显示跳页，默认关闭：false
                showPN:true,//是否显示上下翻页，默认开启：true
                prevPage:"上一页",//上翻页文字描述，默认“上一页”
                nextPage:"下一页",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                    var nowTypeIndex;
                    nowtype = $(".tab-pane.active").attr("id");
                    for(var j = 0; j < type.length; j++){
                        if(type[j] == nowtype){
                            var nowTypeIndex = j;
                            var onetype = result[type[nowTypeIndex]];
                            var alllength = onetype.length;
                            var lastpage = parseInt(onetype.length/15)+1;
                            break;
                        }
                    }
                    if(page<lastpage){
                        $('.'+nowtype).html("");
                        for(var k = (page-1)*15; k < page*15; k++){
                            var rank = k+1;
                            var content = 
                            '<tr>'+
                              '<td>'+rank+'</td>'+
                              '<td>'+onetype[k].userNickname+'</td>'+
                              '<td>'+onetype[k].acNum+'</td>'+
                              '<td>'+onetype[k].score+'</td>'+
                            '</tr>';
                            $('.'+nowtype).append(content);
                        }
                    }
                    else if(page == lastpage){
                        $('.'+nowtype).html("");
                        for(var k = (page-1)*15; k < alllength; k++){
                            var rank = k+1;
                            var content = 
                            '<tr>'+
                              '<td>'+rank+'</td>'+
                              '<td>'+onetype[k].userNickname+'</td>'+
                              '<td>'+onetype[k].acNum+'</td>'+
                              '<td>'+onetype[k].score+'</td>'+
                            '</tr>';
                            $('.'+nowtype).append(content);
                        }
                    }
                }
            });
        }
    }
}
// 获取各类型积分榜排名的函数
var all;
$.ajax ({
    url : '../../ScoreList/queryTotalScore',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            all = result.ScoreList;
            getAll();
        }
        else{
            console.log(result.message);
        }
    },
    error : function () {
        console.log("请求失败！");
    }

});


function getAll(){
    if(all.length <= 15){
        $(".all").html("");
        for(var i = 0; i < all.length; ++i){
            var rank = i+1;
            var content = 
            '<tr>'+
                '<td>'+rank+'</td>'+
                '<td>'+all[i].userNickname+'</td>'+
                '<td>'+all[i].acNum+'</td>'+
                '<td>'+all[i].score+'</td>'+
            '</tr>';
            $('.all').append(content);
        }
    }
    else if(all.length > 15){
        $('.all').html("");
        for(var j = 0; j < 15; ++j){
            var rank = j+1;
            var content = 
            '<tr>'+
                '<td>'+rank+'</td>'+
                '<td>'+all[j].userNickname+'</td>'+
                '<td>'+all[j].acNum+'</td>'+
                '<td>'+all[j].score+'</td>'+
            '</tr>';
            $('.all').append(content);
        }
        $("#allPage").sPage({
            page:1,//当前页码，必填
            total:all.length,//数据总条数，必填
            pageSize:15,//每页显示多少条数据，默认10条
            totalTxt:'共'+all.length+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
            showTotal:false,//是否显示总条数，默认关闭：false
            showSkip:true,//是否显示跳页，默认关闭：false
            showPN:true,//是否显示上下翻页，默认开启：true
            prevPage:"上一页",//上翻页文字描述，默认“上一页”
            nextPage:"下一页",//下翻页文字描述，默认“下一页”
            backFun:function(page){
                var lastpage = parseInt(all.length/15)+1;
                if(page < lastpage){
                    $('.all').html("");
                    for(var k = (page-1)*15; k < page*15; k++){
                        var rank = k+1;
                        var content = 
                        '<tr>'+
                            '<td>'+rank+'</td>'+
                            '<td>'+all[k].userNickname+'</td>'+
                            '<td>'+all[k].acNum+'</td>'+
                            '<td>'+all[k].score+'</td>'+
                        '</tr>';
                        $('.all').append(content); 
                    }
                }
                else if(page == lastpage){
                    $('.all').html("");
                    for(var k = (page-1)*15; k < all.length; k++){
                        var rank = k+1;
                        var content = 
                        '<tr>'+
                            '<td>'+rank+'</td>'+
                            '<td>'+all[k].userNickname+'</td>'+
                            '<td>'+all[k].acNum+'</td>'+
                            '<td>'+all[k].score+'</td>'+
                        '</tr>';
                        $('.all').append(content); 
                    }
                }
            }
        });
        
    }
}
// 获取总榜排名的函数

function searchScore(){
    var user = document.getElementById("username");
    var idname = $(".tab-pane.active").attr("id");
    if(idname == "all"){
        var flag = 0;
        $('.all').html("");
        $('#allPage').html("");
        for(var i = 0; i < all.length; ++i){
            if(user.value == all[i].userNickname){
                flag = 1;
                var rank = i+1;
                var content = 
                '<tr>'+
                    '<td>'+rank+'</td>'+
                    '<td>'+all[i].userNickname+'</td>'+
                    '<td>'+all[i].acNum+'</td>'+
                    '<td>'+all[i].score+'</td>'+
                '</tr>';
                
                $('.all').append(content);
                // break;
            }
            else if(user.value != all[i].userNickname && i == all.length - 1 && flag == 0){
                var txt = "无结果！";
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
            }
        }
    }
    if(idname != "all"){
        var flag = 0;
        $('.'+idname).html("");
        $("#"+idname+"Page").html("");
        for(var i = 0; i < type.length; ++i){
            var types = result[type[i]];                       
        
            if(idname == type[i]){
            for(var j = 0; j < types.length; j++){
                if(user.value == types[j].userNickname){
                    flag = 1;
                    var rank = j+1;
                    var content = 
                    '<tr>'+
                      '<td>'+rank+'</td>'+
                      '<td>'+types[j].userNickname+'</td>'+
                      '<td>'+types[j].acNum+'</td>'+
                      '<td>'+types[j].score+'</td>'+
                    '</tr>';
                    $('.'+idname).append(content);
                }
                else if(j == types.length - 1 && user.value != types[j].userNickname && flag == 0){
                        var txt = "无结果！";
                        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
                   
                }
            }
            }
        }
    }
}
// 搜索某人排名