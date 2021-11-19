var str = window.location.pathname;
var le = str.length;
var res = str.slice(-15);
if(res=='problemset.html'){
    $("#problemset").css("color","#00ccff");
}
// 判断是否在当前页 是则导航栏样式改变

var type = new Array();
// 定义一个全局变量数组，将所有type类型存入

var text = document.getElementById("search");
var login = document.getElementsByClassName('nav-right-a')[0];

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
    isLogin_0.href = 'html/myself.html';
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


var typeList;
var type;
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
            '<a class="nav-link" data-toggle="tab" href="#'+typeList[i].questionType+'">'+typeList[i].questionType+'</a>'+
            '</li>';
        $('.type').append(content);
    }
}
// 获取题目类型的函数

function getTable(){
    for(var i = 0; i < type.length; ++i){
        var content = '<div id="'+type[i]+'" class="tab-pane fade">'+
            '<table class="table table-hover table-striped table-bordered">'+
            '<thead>'+
            '<tr>'+
            '<th class="col-sm-2 col-md-2 col-lg-2" style="text-align: center;">题 号</th>'+
            '<th class="col-sm-6 col-md-6 col-lg-6" style="text-align: center;">题目名称</th>'+
            '<th class="col-sm-2 col-md-2 col-lg-2" style="text-align: center;">分 值</th>'+
            '<th class="col-sm-2 col-md-2 col-lg-2" style="text-align: center;">答题情况</th>'+
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

// 获取题目表头函数

var donequestionList;

$.ajax ({
    url : '../../questionList/listAcQuestionList',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            donequestionList = result.AcquestionList;
        }
        else{
        }
    },
    error : function () {
        console.log("请求失败！");
    }

});
var questionList;
$.ajax ({
    url : '../../questionList/queryQuestionList',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success') {
            questionList = result.questionList;
            getQuestion();
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
//题目详情

function getAll(){
    if(questionList.length == 0){
        var content = '<div style="text-align:center;"><label>暂无该类型题目</label></div>';
        $('table').after(content);
    }
    else{
        if(questionList.length < 15){
            for(var i = 0; i < questionList.length; i++){
                var content =
                    '<tr>'+
                    '<td>'+questionList[i].questionId+'</td>'+
                    '<td>'+questionList[i].questionType+'</td>'+
                    '<td class="'+i+'">'+
                    '<a href="problem.html?id='+questionList[i].questionId+'">'+questionList[i].questionTitle+'</a>&nbsp;'+
                    '</td>'+
                    '<td>'+questionList[i].questionPoint+'</td>'+
                    '<td>'+questionList[i].acNum+'/'+questionList[i].subNum+'</td>'+
                    '</tr>';
                $('.allpro').append(content);

                if(donequestionList!=null){
                    for(j = 0; j < donequestionList.length; j++){
                        if(donequestionList[j].questionId == questionList[i].questionId){
                            var done = '<i class="fa fa-check-circle"></i>';
                            $('.'+i).append(done);
                            break;
                        }
                    }
                }
            }
        }
        else if(questionList.length >= 15){
            for(var i = 0; i < 15; i++){
                var content =
                    '<tr>'+
                    '<td>'+questionList[i].questionId+'</td>'+
                    '<td>'+questionList[i].questionType+'</td>'+
                    '<td class="'+i+'">'+
                    '<a href="problem.html?id='+questionList[i].questionId+'">'+questionList[i].questionTitle+'</a>&nbsp;'+
                    '</td>'+
                    '<td>'+questionList[i].questionPoint+'</td>'+
                    '<td>'+questionList[i].acNum+'/'+questionList[i].subNum+'</td>'+
                    '</tr>';
                $('.allpro').append(content);

                if(donequestionList!=null){
                    for(j = 0; j < donequestionList.length; j++){
                        if(donequestionList[j].questionId == questionList[i].questionId){
                            var done = '<i class="fa fa-check-circle"></i>';
                            $('.'+i).append(done);
                            break;
                        }
                    }
                }
            }
            $("#allPage").sPage({
                page:1,//当前页码，必填
                total:questionList.length,//数据总条数，必填
                pageSize:15,//每页显示多少条数据，默认10条
                totalTxt:'共'+questionList.length+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                showTotal:false,//是否显示总条数，默认关闭：false
                showSkip:true,//是否显示跳页，默认关闭：false
                showPN:true,//是否显示上下翻页，默认开启：true
                prevPage:"上一页",//上翻页文字描述，默认“上一页”
                nextPage:"下一页",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                    //点击分页按钮回调函数，返回当前页码
                    $('.allpro').html("");
                    var lastpage = parseInt(questionList.length/15)+1;
                    if(page<lastpage){
                        for(var i = (page-1)*15; i < page*15; i++){
                            var content =
                                '<tr>'+
                                '<td>'+questionList[i].questionId+'</td>'+
                                '<td>'+questionList[i].questionType+'</td>'+
                                '<td class="'+i+'">'+
                                '<a href="problem.html?id='+questionList[i].questionId+'">'+questionList[i].questionTitle+'</a>&nbsp;'+
                                '</td>'+
                                '<td>'+questionList[i].questionPoint+'</td>'+
                                '<td>'+questionList[i].acNum+'/'+questionList[i].subNum+'</td>'+
                                '</tr>';
                            $('.allpro').append(content);

                            if(donequestionList!=null){
                                for(j = 0; j < donequestionList.length; j++){
                                    if(donequestionList[j].questionId == questionList[i].questionId){
                                        var done = '<i class="fa fa-check-circle"></i>';
                                        $('.'+i).append(done);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if(page == lastpage){
                        $('.allpro').html("");
                        for(var i = (page-1)*15; i < questionList.length; i++){
                            var content =
                                '<tr>'+
                                '<td>'+questionList[i].questionId+'</td>'+
                                '<td>'+questionList[i].questionType+'</td>'+
                                '<td class="'+i+'">'+
                                '<a href="problem.html?id='+questionList[i].questionId+'">'+questionList[i].questionTitle+'</a>&nbsp;'+
                                '</td>'+
                                '<td>'+questionList[i].questionPoint+'</td>'+
                                '<td>'+questionList[i].acNum+'/'+questionList[i].subNum+'</td>'+
                                '</tr>';
                            $('.allpro').append(content);
                            if(donequestionList!=null){
                                for(j = 0; j < donequestionList.length; j++){
                                    if(donequestionList[j].questionId == questionList[i].questionId){
                                        var done = '<i class="fa fa-check-circle"></i>';
                                        $('.'+i).append(done);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}

var typename = {};
function getQuestion(){
    for(var i = 0; i < type.length; i++){
        typename[type[i]] = [];
        for(var j = 0;j<questionList.length;j++){
            if(type[i] == questionList[j].questionType){
                typename[type[i]].push(questionList[j]);
            }
        }
    }
    for(var i = 0; i < type.length; i++){
        var mytype = type[i];
        if(typename[type[i]].length == 0){
            // var content = '<div style="text-align:center;"><label>暂无该类型题目</label></div>';
            // $('table').after(content);
        }
        else{
            if(typename[type[i]].length < 15){
                for(var j = 0; j < typename[type[i]].length; ++j){
                    var content =
                        '<tr>'+
                        '<td>'+typename[type[i]][j].questionId+'</td>'+
                        '<td class="'+type[i]+''+j+'">'+
                        '<a href="problem.html?id='+typename[type[i]][j].questionId+'">'+typename[type[i]][j].questionTitle+'</a>&nbsp;'+
                        '</td>'+
                        '<td>'+typename[type[i]][j].questionPoint+'</td>'+
                        '<td>'+typename[type[i]][j].acNum+'/'+typename[type[i]][j].subNum+'</td>'+
                        '</tr>';
                    $('.'+mytype).append(content);

                    if(donequestionList!=null){
                        for(var x = 0; x < donequestionList.length; ++x){
                            if(donequestionList[x].questionId == typename[type[i]][j].questionId){
                                var done = '<i class="fa fa-check-circle"></i>';
                                $('.'+type[i]+j).append(done);
                                break;
                            }
                        }
                    }
                }
            }
            else if(typename[type[i]].length >= 15){
                for(var j = 0; j < 15; ++j){
                    var content =
                        '<tr>'+
                        '<td>'+typename[type[i]][j].questionId+'</td>'+
                        '<td class="'+type[i]+''+j+'">'+
                        '<a href="problem.html?id='+typename[type[i]][j].questionId+'">'+typename[type[i]][j].questionTitle+'</a>&nbsp;'+
                        '</td>'+
                        '<td>'+typename[type[i]][j].questionPoint+'</td>'+
                        '<td>'+typename[type[i]][j].acNum+'/'+typename[type[i]][j].subNum+'</td>'+
                        '</tr>';
                    $('.'+mytype).append(content);

                    if(donequestionList!=null){
                        for(var x = 0; x < donequestionList.length; ++x){
                            if(donequestionList[x].questionId == typename[type[i]][j].questionId){
                                var done = '<i class="fa fa-check-circle"></i>';
                                $('.'+type[i]+j).append(done);
                                break;
                            }
                        }
                    }
                }
                $("#"+type[i]+"Page").sPage({
                    page:1,//当前页码，必填
                    total:typename[type[i]].length,//数据总条数，必填
                    pageSize:15,//每页显示多少条数据，默认10条
                    totalTxt:'共'+typename[type[i]].length+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                    showTotal:false,//是否显示总条数，默认关闭：false
                    showSkip:true,//是否显示跳页，默认关闭：false
                    showPN:true,//是否显示上下翻页，默认开启：true
                    prevPage:"上一页",//上翻页文字描述，默认“上一页”
                    nextPage:"下一页",//下翻页文字描述，默认“下一页”
                    backFun:function(page){
                        var nowTypeIndex;
                        nowtype = $(".tab-pane.active").attr("id");
                        for(var k = 0;k < type.length; k++){
                            if(type[k] == nowtype){
                                var nowTypeIndex = k;
                                var alllength = typename[type[k]].length;
                                var lastpage = parseInt(typename[type[k]].length/15)+1;
                                break;
                            }
                        }
                        if(page < lastpage){         //不是最后一页
                            $('.'+nowtype).html("");
                            for(var j = (page-1)*15; j < page*15; ++j){
                                var content =
                                    '<tr>'+
                                    '<td>'+typename[type[nowTypeIndex]][j].questionId+'</td>'+
                                    '<td class="'+type[nowTypeIndex]+''+j+'">'+
                                    '<a href="problem.html?id='+typename[type[nowTypeIndex]][j].questionId+'">'+typename[type[nowTypeIndex]][j].questionTitle+'</a>&nbsp;'+
                                    '</td>'+
                                    '<td>'+typename[type[nowTypeIndex]][j].questionPoint+'</td>'+
                                    '<td>'+typename[type[nowTypeIndex]][j].acNum+'/'+typename[type[nowTypeIndex]][j].subNum+'</td>'+
                                    '</tr>';
                                $('.'+nowtype).append(content);

                                if(donequestionList!=null){
                                    for(var x = 0; x < donequestionList.length; ++x){
                                        if(donequestionList[x].questionId == typename[type[nowTypeIndex]][j].questionId){
                                            var done = '<i class="fa fa-check-circle"></i>';
                                            $('.'+type[nowTypeIndex]+j).append(done);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        else if(page == lastpage){        //最后一页
                            $('.'+nowtype).html("");
                            for(var j = (page-1)*15; j < alllength; ++j){
                                var content =
                                    '<tr>'+
                                    '<td>'+typename[type[nowTypeIndex]][j].questionId+'</td>'+
                                    '<td class="'+type[nowTypeIndex]+''+j+'">'+
                                    '<a href="problem.html?id='+typename[type[nowTypeIndex]][j].questionId+'">'+typename[type[nowTypeIndex]][j].questionTitle+'</a>&nbsp;'+
                                    '</td>'+
                                    '<td>'+typename[type[nowTypeIndex]][j].questionPoint+'</td>'+
                                    '<td>'+typename[type[nowTypeIndex]][j].acNum+'/'+typename[type[nowTypeIndex]][j].subNum+'</td>'+
                                    '</tr>';
                                $('.'+nowtype).append(content);

                                if(donequestionList!=null){
                                    for(var x = 0; x < donequestionList.length; ++x){
                                        if(donequestionList[x].questionId == typename[type[nowTypeIndex]][j].questionId){
                                            var done = '<i class="fa fa-check-circle"></i>';
                                            $('.'+type[nowTypeIndex]+j).append(done);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }
}


function searchProblem(){
    if(text.value != null){
        $.ajax ({
            url : '../../questionList/FuzzyQuery',
            type : 'post',
            data:{'text':text.value},
            scriptCharset : 'utf-8',
            success : function (result) {
                if (result.status == 'success') {
                    questionList = result.questionList;
                    $(".nav-item.active").removeClass("active");
                    $(".problemtype").find("ul li:first-child").addClass('active');
                    $(".tab-pane.active").removeClass("active in")
                    $("#All").addClass("active");
                    $(".allpro").html("");
                    $("#allPage").html("");
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
    }
}
// 点击查询go发送请求，获得查询列表

