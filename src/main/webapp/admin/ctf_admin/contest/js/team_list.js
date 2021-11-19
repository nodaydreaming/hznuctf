/*var team_list = [{"teamId" : 1,"teamName" : "长城长城你真美！","teamPoint" : 100,"invitationCode" : "56588","teamState" : 1},
                 {"teamId" : 3,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 1},
                {"teamId" : 4,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                {"teamId" : 6,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 1},
                {"teamId" : 10,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0}
                ];

var allTeams_list = [{"teamId" : 1,"teamName" : "长城长城你真美！","teamPoint" : 100,"invitationCode" : "56588","teamState" : 1},
                    {"teamId" : 2,"teamName" : "皮皮的默读！","teamPoint" : 95,"invitationCode" : "19980416","teamState" : 0},
                    {"teamId" : 3,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 1},
                    {"teamId" : 4,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 5,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 6,"teamName" : "警界一枝花！","teamPoint" :100.2 , "invitationCode" : "1999","teamState" : 1},
                    {"teamId" : 7,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 8,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 9,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 10,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 11,"teamName" : "警界一枝花！","teamPoint" :100.2 ,"invitationCode" : "1999","teamState" : 0},
                    {"teamId" : 12,"teamName" : "警界一枝花！","teamPoint" :99 , "invitationCode" : "1256","teamState" : 0}
                    ];
var contest_list = [{"competitionId" : "1.1",
                     "competitionTitle" : "杭州师范大学第一届CTF竞赛模拟赛",
                     "start" : "2017-02-28",
                     "end" : "2017-02-10",
                     "createtime" : "2017.2.1",
                     "competitionNumber" : "HZNU_00",
                     "canregister" : 1,
                     "isteam" : 1 ,
                     "publisher" : "骆闻舟",
                     "holder" : "费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡",
                      "intro" : "aaaaaaaaaaaaaaaa",
                      "target" : "bbbbbbbbbbbb",
                      "plan" : "cccccccccc",
                      "rule" : "ddddddddd",
                      "reward" : "eeeeeeeeeeeeeeee",
                      "registration" : "ffffffffffff",
                      "image" : "1"
                      },
                     {"competitionId" : "2.2",
                     "competitionTitle" : "杭州师范大学第一届CTF竞赛决赛",
                     "start" : "2017-03.08",
                     "end" : "2017.3.10",
                     "createtime" : "2017.3.1",
                     "competitionNumber" : "2",
                     "canregister" : 0,
                     "isteam" : 0 ,
                     "publisher" : "骆",
                     "holder" : "费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡",
                     "intro" : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                      "target" : "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                      "plan" :"cccccccccccccccccccccccccc",
                      "rule" : "ddddddddddddddddddddddddddddd",
                      "reward" : "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                      "registration" : "fffffffffffffffffffffffffffffff",
                      "image" : "1"},
                      {"competitionId" : "3.3",
                     "competitionTitle" : "杭州师范大学第二届CTF竞赛模拟赛",
                     "start" : "2017-03.08",
                     "end" : "2017.3.10",
                     "createtime" : "2017.3.1",
                     "competitionNumber" : "2",
                     "canregister" : 0,
                     "isteam" : 0 ,
                     "publisher" : "骆闻",
                     "holder" : "费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡费渡",
                     "intro" : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                      "target" : "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                      "plan" :"cccccccccccccccccccccccccc",
                      "rule" : "ddddddddddddddddddddddddddddd",
                      "reward" : "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                      "registration" : "fffffffffffffffffffffffffffffff",
                      "image" : "1"}]; */
var team_list , team;
var allTeams_list, teamsStr;
var team0id, changestate;
var teamsid_arr = new Array();  //声明添加时选中的队伍id数组
var chooseteamid_arr = new Array();  //声明已选队伍的id数组
var contest_list;
var url=location.href;
var index=url.lastIndexOf("\=");
competitionid=url.substring(index+1,url.length);
//console.log(id);
// 获取url里面的id

window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url : '../../../admin/getAdminMap',//获取管理员个人信息
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            var loginAdmin = result.loginAdmin;
            //设置登陆用户的昵称
            if(loginAdmin.adminNickname != null){
                ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminNickname;
            }
            //设置登陆用户的头像
            if(loginAdmin.image != null){
                $('.layui-nav-img').attr("src", loginAdmin.image);
            }
        },
        error : function () {
            layer.msg("请求失败！");
        }
    });
    //fillteam();     //测试完毕改成get_team();！！！！！
    get_team();
};

function get_team(){
    $.ajax({
        url : '../../../Team/queryTeamByCompetitionId', //得到某一未结束赛事的选手列表
        data: {"competitionId" : competitionid},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.status =="success"){
               team_list = result.teamList;
               fillteam();
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求队伍列表失败！");
        }
    });
}

function fillteam(){
    if(team_list != null) {
        for (var i = 0; i < team_list.length; ++i) {
            j = i + 1;
            team = team_list[i];
            //var state=team.teamState;

            // var ChooseTeamids = team.teamId.toString();
            // chooseteamid_arr.push(ChooseTeamids);
            // teamsid_arr.push(ChooseTeamids);
            // teamsStr = teamsid_arr[0];
            // for (var z = 1; z < teamsid_arr.length; ++z) {
            //     teamsStr += "," + teamsid_arr[z];
            // }

            var content = '<tr>' +
                '    <td style="text-align: center;">' + j + ' </td>' +
                '    <td style="text-align: center; overflow-wrap: break-word;"> ' + team.teamName + '  </td>' +
                '    <td style="text-align: center; overflow-wrap: break-word;"> ' + team.teamPoint + ' </td>' +
                '    <td style="text-align: center; overflow-wrap: break-word;"> ' + team.invitationCode + ' </td>' +

                '    <td style="text-align: center; padding-top : 0px; " class="layui-input-block">    ' +
                '        <input type="checkbox"  value="' + team.teamId + '" class="' + team.teamId + '" name="switch" lay-skin="switch" lay-text="正常|禁赛" lay-filter="switch"> ' +
                '    </td>' +

                '    <td style="text-align: center; padding : 0px;"> ' +
                '        <a class="layui-btn layui-btn-danger layui-btn-xs" onclick = "del_team(' + team.teamId + ')">' +
                '            <i class="layui-icon layui-icon-delete"></i>' +
                '            "删除"' +
                '        </a>' +
                '    </td>' +
                '</tr>'
            $("tbody").append(content)

            layui.use('form', function () {
                var form = layui.form;

                //console.log(team.teamState);
                if (team.teamState == 0) {
                    //console.log(2);
                    $('.' + team.teamId).prop('checked', true);
                }

                form.render('checkbox');
                form.on('switch(switch)', function (data) {
                    var teamid = data.elem.value;
                    var changestate = data.elem.checked;
                    //console.log(data.elem.checked)
                    edit_choice(changestate, teamid);
                });
            });
        }
    }
}

function edit_choice(changestate, teamid){

    if (changestate == true){
        var state = 0;
    }
    else if (changestate == false){
        var state = 1;
    }

    $.ajax({
        url : '../../../Team/update',  //赛事-队伍禁赛解禁
        data : {"teamId" : teamid,
                "teamState" : state},
        scriptCharset : "utf-8",
        type : "post",
        success : function(result){
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "修改队伍状态成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                $("tbody").html("");
                get_team();
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg("请求接口失败");
        }
    });
}

function del_team(id){
    //console.log(id);
    for(var k = 0; k < team_list.length; ++k){
        team = team_list[k];
        if(team.teamId == id ){
            var name = team.teamName;
        }
    }

    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + '确定删除&nbsp'+name+'&nbsp队伍吗？' + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除队伍",
        btn1 : function () {
            delTeam(id);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delTeam(id){
    $.ajax({
        url : '../../../Team/delete', //删除队伍
        data : {"teamId" : id },
        scriptCharset : "utf-8",
        type : "post",
        success : function(result){
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "删除成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                $("tbody").html("");
                get_team();
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg("请求接口失败");
        }
    });
}

function choose_contest(){
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo10', //防止重复弹出
        area: ['900px', '700px'],
        content:
            '    <div style="margin: 20px 20px 20px 20px">\n' +
            '      <form class="layui-form">\n' +
            '        <table class="layui-table" style="table-layout: fixed">\n' +
            '            <colgroup>\n' +
            '                <col width="10%">\n' +
            '                <col width="45%">\n' +
            '                <col width="15%">\n' +
            '                <col width="15%">\n' +
            '                <col width="15%">\n' +
            '            </colgroup>\n' +
            
            '            <thead>\n' +
            '            <tr>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">序号</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">赛事名称</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">发布者</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">编号</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">操作</th>\n' +
            '            </tr>\n' +           
            '            </thead>\n' +
            
            '            <tbody class="layui-text" id= "choose">\n' +
            '            </tbody>\n' +
            '        </table>\n' +
            '      </form>\n' +
            '    </div>',
        btn: ['取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "选择赛事",
        yes : function () {
            layer.closeAll();
            window.location.reload();
        }
    });
    //fillChooseContest();   //测试完毕删掉这个函数，删除ajax的注释！！！！！！！
    $.ajax({
        url : '../../../competition/listCompetition',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status =="success"){
                contest_list = result.competitionList;
                fillChooseContest();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求所有赛事列表失败！");
        }
    });
}

function fillChooseContest(){
    for(var i = 0; i < contest_list.length; ++i){
        j=i+1;
        contest0 = contest_list[i];
        //var state=team.teamState;
        var contenttwo = '<tr>'+

            '    <td style="text-align: center;">'+ j +' </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word;"> '+ contest0.competitionTitle+'  </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word;"> '+ contest0.publisher+'  </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word;"> '+ contest0.competitionNumber+' </td>'+
            '    <td style="text-align: center; padding : 0px;"> '+
            '        <a class="layui-btn layui-btn-normal layui-btn-xs" onclick = "Import_Team('+contest0.competitionId+')";>'+
            '            <i class="layui-icon layui-icon-group"></i>'+
            '            导入队伍'+
            '        </a>'+
            '    </td>'+            
            '</tr>'

        $("#choose").append(contenttwo);
    }
}Import_Team

function Import_Team(competitionid){
  //console.log(competitionid);
  layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo5', //防止重复弹出
        area: ['800px', '600px'],
        content:
            '    <div style="margin: 20px 20px 20px 20px">\n' +
            '      <form class="layui-form">\n' +
            '        <table class="layui-table" style="table-layout: fixed">\n' +
            '            <colgroup>\n' +
            '                <col width="10%">\n' +
            '                <col width="10%">\n' +
            '                <col width="45%">\n' +
            '                <col width="15%">\n' +
            '                <col width="20%">\n' +
            '            </colgroup>\n' +
            
            '            <thead>\n' +
            '            <tr>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">多选</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">序号</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">队伍名称</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">队伍分值</th>\n' +
            '                 <th style="text-align: center; word-wrap: break-word;">队伍邀请码</th>\n' +
            '            </tr>\n' +           
            '            </thead>\n' +
            
            '            <tbody class="layui-text" id= "ble">\n' +
            '            </tbody>\n' +
            '        </table>\n' +
            '      </form>\n' +
            '    </div>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "导入队伍",
        btn1 : function () {
            add_teams(competitionid);
            return false;
        },
        btn2 : function () {
            layer.close("#layerDemo5");
        }
    });

    $(".layui-layer-setwin").html('');

    //fillImportTeams();   //测试完毕删掉这个函数，删除ajax的注释！！！！！！！
    $.ajax({
        url : '../../../Team/queryTeamByCompetitionId',
        data : {"competitionId" : competitionid },
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status =="success"){
                allTeams_list = result.teamList;
                fillImportTeams();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求队伍信息列表失败！");
        }
    });
}

function fillImportTeams(){
    if(allTeams_list != null ) {
        for (var i = 0; i < allTeams_list.length; ++i) {
            j = i + 1;
            team0 = allTeams_list[i];
            //var state=team.teamState;
            var contentone = '<tr>' +
                '    <td style="text-align: center;" class="layui-input-block">    ' +
                '        <input type="checkbox" name="" lay-skin="primary" lay-filter="test" value="' + team0.teamId + '" class="' + team0.teamId + '"> ' +
                '    </td>' +

                '    <td style="text-align: center;">' + j + ' </td>' +
                '    <td style="text-align: center; overflow-wrap: break-word;"> ' + team0.teamName + '  </td>' +
                '    <td style="text-align: center; overflow-wrap: break-word;"> ' + team0.teamPoint + '  </td>' +
                '    <td style="text-align: center; overflow-wrap: break-word;"> ' + team0.invitationCode + ' </td>' +

                '</tr>'
            $("#ble").append(contentone);

            //遍历原本已选队伍数组，如果与所有队伍其中某队伍的id相等，则在添加弹框中默认选中
            // for (var z = 0; z < chooseteamid_arr.length; ++z) {
            //     var chooseteamid = chooseteamid_arr[z];
            //     if (team0.teamId == chooseteamid) {
            //         $('.' + team0.teamId).prop('checked', true);
            //     }
            // }

            layui.use('form', function () {
                var form = layui.form;

                form.render('checkbox');
                form.on('checkbox(test)', function (data) {
                    team0id = data.elem.value;
                    changestate = data.elem.checked;

                    //监听每一个复选框的状态，选中则将id放到数组中
                    if (changestate == true) {
                        teamsid_arr.push(team0id);
                    }
                    //取消选中则将id从数组总移除
                    else if (changestate == false) {
                        var index = teamsid_arr.indexOf(team0id);
                        teamsid_arr.splice(index, 1);
                    }
                    //将id数组转换成字符串放在questionsStr里
                    teamsStr = teamsid_arr[0];
                    for (var m = 1; m < teamsid_arr.length; ++m) {
                        teamsStr += "," + teamsid_arr[m];
                    }
                });
            });
        }
    }else{
        layer.msg("该场比赛下暂无队伍！");
    }
}

function add_teams(){
    $.ajax({
        url : '../../../Team/importTeam',
        type : 'post',
        data :{
            "teamIdList" : teamsStr,
            "competitionId" : competitionid
        },
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo66', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "导入成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        window.location.reload();
                        layer.closeAll();
                    }
                });
                get_team();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('请求导入失败！');
        }
    });
}
function Export(){
    $("#teamGradeTable").table2excel({            //exceltable为存放数据的table
        // 不被导出的表格行的CSS class类
        exclude: ".noExl",
        // 导出的Excel文档的名称
        name: "表格-" + new Date().getTime(),
        // Excel文件的名称
        filename: "表格-" + new Date().getTime() + ".xls",
        bootstrap: false
    });
}