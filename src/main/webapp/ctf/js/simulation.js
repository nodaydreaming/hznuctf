var str = window.location.pathname;
var le = str.length;
var res = str.slice(-15);
if(res=='simulation.html'){
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
var competitionList;
$.ajax({
    url: '../../competition/listCompetition',
    type: 'post',
    data:{
        'competitionId':id
    },
    scriptCharset: 'utf-8',
    success: function (result) {
        console.log(result);
        if (result.status == 'success') {
            competitionList = result.competitionList;
            getCompetition();
        }
        else {
            console.log(result.message);
        }
    },
    error: function () {
        console.log("请求失败！");
    }
});
// 获得赛事详情

// 连接后删除部分
// var competitionList = [
//     {'competitionId':0,
//     'competitionTitle':'杭州师范大学第一届网络与信息安全大赛',
//     'canregister':0,
//     'intro':'为了更好地宣传网络信息安全知识，增强大学生对网络信息安全技术的兴趣与热情，提高大学生的网络信息安全意识，加强大学生网络安全技术水平、创新实践与综合设计能力，同时为选拔人才进行更深层次的技能培养，参加更高层次的比赛，传播科学正能量，现决定于近期开展“杭州师范大学第一届网络与信息安全竞赛”的活动，欢迎各年级同学积极参加。',
//     'image':'../img/nofacehacker.png',
//     'holder':'1、主办单位：杭州师范大学学科竞赛委员会 2、承办单位：杭州国际服务工程学院 3、竞赛委员会：由教务处、杭州国际服务工程学院（信息科学与工程学院）等单位人员组成，负责制定竞赛方案、设计评审标准、审定竞赛奖次、处理竞赛异议以及其它重大问题的决定 4、竞赛专家库：为确保评审工作的科学性与公正性，竞赛的评审由竞赛评审专家组负责',
//     'target':'面对杭州师范大学在读本科生、研究生；本次比赛以小组形式（每组不超过3人）进行报名、参赛。本次比赛采用CTF（Capture the Flag）的解题模式，包括逆向工程Reverse、杂项Misc、密码学Crypto、Web等题型。标题',        
//     'plan':'1、报名 2、模拟赛 3 、决赛',
//     'rule':'1.决赛期间所用的电脑需要选手自带，相应的解题工具自备，可以携带参考资料。 2.决赛参赛队员需携带学生证或身份证参赛，迟到30分钟将取消比赛资格。 3.决赛期间，只提供内网，选手需通过内网进入比赛平台。',
//     'reward':'大赛按照最终排名设立一、二、三等奖，各奖项数为：一等奖5%，二等奖15%，三等奖25%。其中第1-9名奖金由“华为资助中国大学生竞赛公益项目（信息科学与工程学院竞赛专项 基金）捐赠款”支持。',
//     'registration':' 请在2019年4月30日（星期二）24：00前，在172.22.227.99:8080/hznuctf网站上进行注册登录，并进入challenge页面创建或者加入队伍完成报名。'
//     },
//     {'competitionId':1,
//     'competitionTitle':'杭州师范大学第二届网络与信息安全大赛',
//     'canregister':1,
//     'intro':'为了更好地宣传网络信息安全知识，增强大学生对网络信息安全技术的兴趣与热情，提高大学生的网络信息安全意识，加强大学生网络安全技术水平、创新实践与综合设计能力，同时为选拔人才进行更深层次的技能培养，参加更高层次的比赛，传播科学正能量，现决定于近期开展“杭州师范大学第一届网络与信息安全竞赛”的活动，欢迎各年级同学积极参加。',
//     'image':'../img/nofacehacker.png',
//     'holder':'1、主办单位：杭州师范大学学科竞赛委员会 2、承办单位：杭州国际服务工程学院 3、竞赛委员会：由教务处、杭州国际服务工程学院（信息科学与工程学院）等单位人员组成，负责制定竞赛方案、设计评审标准、审定竞赛奖次、处理竞赛异议以及其它重大问题的决定 4、竞赛专家库：为确保评审工作的科学性与公正性，竞赛的评审由竞赛评审专家组负责',
//     'target':'面对杭州师范大学在读本科生、研究生；本次比赛以小组形式（每组不超过3人）进行报名、参赛。本次比赛采用CTF（Capture the Flag）的解题模式，包括逆向工程Reverse、杂项Misc、密码学Crypto、Web等题型。标题',        
//     'plan':'1、报名 2、模拟赛 3、决赛',
//     'rule':'1.决赛期间所用的电脑需要选手自带，相应的解题工具自备，可以携带参考资料。 2.决赛参赛队员需携带学生证或身份证参赛，迟到30分钟将取消比赛资格。 3.决赛期间，只提供内网，选手需通过内网进入比赛平台。',
//     'reward':'大赛按照最终排名设立一、二、三等奖各奖项数为：一等奖5%，二等奖15%，三等奖25%。其中第1-9名奖金由“华为资助中国大学生竞赛公益项目（信息科学与工程学院竞赛专项 基金）捐赠款”支持。',
//     'registration':' 请在2019年4月30日（星期二）24：00前，在172.22.227.99:8080/hznuctf网站上进行注册登录，并进入challenge页面创建或者加入队伍完成报名。'
//     }]
// 连接后删除部分



function getCompetition(){
    for(var i = 0; i < competitionList.length; ++i){
        if(competitionList[i].competitionId == id){
            holder = competitionList[i].holder.replace(/\s/g,"<br>");
            plan = competitionList[i].plan.replace(/\s/g,"<br>");
            rule = competitionList[i].rule.replace(/\s/g,"<br>");
            $('.title').append(competitionList[i].competitionTitle);
            $('.intro').append(competitionList[i].intro);
            $('.number').append(competitionList[i].competitionNumber);
            $('.image').attr('src',competitionList[i].image);
            $('.organize').append(holder);
            $('.form').append(competitionList[i].target);
            $('.content').append(plan);
            $('.rule').append(rule);
            $('.reward').append(competitionList[i].reward);
            $('.register').append(competitionList[i].registration);
            if(competitionList[i].canregister == 1){
                $('#finish').hide();
            }

        }
    }
}
