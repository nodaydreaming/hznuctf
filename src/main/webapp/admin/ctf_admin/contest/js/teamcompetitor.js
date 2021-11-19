/*var teamcompetitor_list = [{"teamcompetitiorId" : "1",
                           "team" : "长城长城你真美！",
                           "name" : "郭长城",
                            "userState" : 0,
                            "score" : "56"},
                           {"teamcompetitiorId" : "2",
                            "team" : "未经允许擅自特别。。。！",
                           "name" : "费渡",
                            "userState" : 1,
                            "score" : "86"},
                           {"teamcompetitiorId" : "3",
                            "team" : "警界一枝花！",
                            "name" : "骆闻舟",
                            "userState" : 0,
                            "score" : "96"}]*/

var teamcompetitor_list, teamcompetitor;

var url=location.href;
var index=url.lastIndexOf("\=");
competitionid=url.substring(index+1,url.length);
//console.log(competitionid);
// 获取url里面的id

window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url: '../../../admin/getAdminMap',//获取管理员个人信息
        type: 'post',
        scriptCharset: 'utf-8',
        success: function (result) {
            // console.log(result);
            var loginAdmin = result.loginAdmin;
            //设置登陆用户的昵称
            if (loginAdmin.adminNickname != null) {
                ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminNickname;
            }
            //设置登陆用户的头像
            if (loginAdmin.adminImage != null) {
                $('.layui-nav-img').attr("src", loginAdmin.adminImage);
            }
        },
        error: function () {
            layer.msg("请求失败！");
        }
    });
    //fillteamcompetitors();     //测试完毕改成get_teamcompetitors();！！！！！
    get_teamcompetitors();
};

function get_teamcompetitors(){
    $.ajax({
        url : '../../../Teamcompetitor/ListCompetitor', //得到某一未结束赛事的选手列表
        data: {"competitionId" : competitionid},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.status =="success"){
               teamcompetitor_list = result.teamcompetitorList;
               fillteamcompetitors();
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求选手列表失败！");
        }
    });
}

function fillteamcompetitors(){
    /*var tbody = document.getElementsByTagName('tbody')[0]; 
    $('tbody').html("");*/

    for(var i = 0; i < teamcompetitor_list.length; ++i){
        j=i+1;
        teamcompetitor = teamcompetitor_list[i];
        /*id = teamcompetitor.id
        console.log(id)*/
        var content = '<tr>'+
                        '    <td style="text-align: center;">'+ j +' </td>'+
                        '    <td style="text-align: center; overflow-wrap: break-word;"> '+ teamcompetitor.teamName+'  </td>'+
                        '    <td style="text-align: center; overflow-wrap: break-word;"> '+ teamcompetitor.userName+' </td>'+
                        '    <td style="text-align: center; overflow-wrap: break-word;"> '+ teamcompetitor.score+' </td>'+

                        '    <td style="text-align: center; padding-top : 0px; " class="layui-input-block">    '+
                        '        <input type="checkbox" value="'+teamcompetitor.teamcompetitorId+'" class="'+teamcompetitor.teamcompetitorId+'" name="switch" lay-skin="switch" lay-text="正常|禁赛" lay-filter="switch"> '+
                        '    </td>'+
                        
                        '    <td style="text-align: center; padding : 0px;"> '+
                        '        <a id="' +j+ '" class="layui-btn layui-btn-danger layui-btn-xs" onclick = "del_teamcompetitor('+teamcompetitor.teamcompetitorId+')";>'+
                        '            <i class="layui-icon layui-icon-delete"></i>'+
                        '            "删除"'+
                        '        </a>'+
                        '    </td>'+
                        '</tr>'
        $("tbody").append(content)

        layui.use('form', function(){
          var form = layui.form;

          if (teamcompetitor.userState == 0){
                //console.log(0);
                $('.'+teamcompetitor.teamcompetitorId).prop('checked',true);
              }

          form.render();
          form.on('switch(switch)', function (data) {
                var teamcompetitorid = data.elem.value; 
                var changestate = data.elem.checked;
                //console.log(data.elem.checked)
                edit_choice(changestate, teamcompetitorid);
            });
        });
    }
}

function edit_choice(changestate, teamcompetitorid){
    //console.log(changestate);
    //console.log(teamcompetitorid);
    if (changestate == true){
        var state = 0;
    }
    else if (changestate == false){
        var state = 1;
    }
    //console.log(state);
    $.ajax({
        url : '../../../Teamcompetitor/update', //修改选手状态（禁赛、解禁）
        data : {"teamcompetitorId" : teamcompetitorid,
                "userState" : state},
        scriptCharset : "utf-8",
        type : "post",
        success : function(result){
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "修改选手状态成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                $("tbody").html("");
                get_teamcompetitors();
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

function del_teamcompetitor(id){
    //console.log(id);
    for(var k = 0; k < teamcompetitor_list.length; ++k){
        teamcompetitor = teamcompetitor_list[k];
        if(teamcompetitor.teamcompetitorId == id ){
            var name = teamcompetitor.userName;
        }
    }

    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + '确定删除&nbsp'+name+'&nbsp吗？' + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除选手",
        btn1 : function () {
            delTeamcompetitor(id);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delTeamcompetitor(id){
    $.ajax({
        url : '../../../Teamcompetitor/delete', //删除选手
        data : {"teamcompetitorId" : id },
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
                get_teamcompetitors();
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
function Export(){　　　　
    $("#competitorGradeTable").table2excel({            //exceltable为存放数据的table
    // 不被导出的表格行的CSS class类
    exclude: ".noExl",
    // 导出的Excel文档的名称
    name: "表格-" + new Date().getTime(),
    // Excel文件的名称
    filename: "表格-" + new Date().getTime() + ".xls",
    bootstrap: false
});
}
function ExportTranscript(){
    window.location.href = "../../../Teamcompetitor/exportTranscript?competitionId="+competitionid;
}