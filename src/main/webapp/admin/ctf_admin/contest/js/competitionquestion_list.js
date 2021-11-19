/*var qustions_list=[{
	               "questionId" : 1,
	               "questionTitle" : "第一道题目名",
	               "questionBody" : "第一道题目题目描述第一道题目题目描述第一道题目题目描述第一道题目题目描述第一道题目题目描述"},
	               {
	               "questionId" : 2,
	               "questionTitle" : "第二道题目名",
	               "questionBody" : "第二道题目题目描述第二道题目题目描述第二道题目题目描述第二道题目题目描述第二道题目题目描述"},
	               {
	               	"questionId" : 5,
	               "questionTitle" : "第三道题目名",
	               "questionBody" : "第三道题目题目描述第三道题目题目描述第三道题目题目描述第三道题目题目描述第三道题目题目描述"
	               }]
var aLLQuestion_List = [{"questionId" : 1,
                         "questionTitle" : "总题目第一题标题",
                         "questionType" : "总一类型",
                         "questionBody" : "总题目第一题题目描述",
                         "questionLevel" : 80},
                         {"questionId" : 2,
                         "questionTitle" : "总题目第二题标题",
                         "questionType" : "总二类型",
                         "questionBody" : "总题目第二题题目描述",
                         "questionLevel" : 50},
                         {"questionId" : 3,
                         "questionTitle" : "总题目第三题标题",
                         "questionType" : "总三类型",
                         "questionBody" : "总题目第三题题目描述",
                         "questionLevel" : 100},
                         {"questionId" : 4,
                         "questionTitle" : "总题目第二题标题",
                         "questionType" : "总二类型",
                         "questionBody" : "总题目第二题题目描述",
                         "questionLevel" : 50},
                         {"questionId" : 5,
                         "questionTitle" : "总题目第二题标题",
                         "questionType" : "总二类型",
                         "questionBody" : "总题目第二题题目描述",
                         "questionLevel" : 50},
                         {"questionId" : 6,
                         "questionTitle" : "总题目第二题标题",
                         "questionType" : "总二类型",
                         "questionBody" : "总题目第二题题目描述",
                         "questionLevel" : 50},
                         {"questionId" : 7,
                         "questionTitle" : "总题目第二题标题",
                         "questionType" : "总二类型",
                         "questionBody" : "总题目第二题题目描述",
                         "questionLevel" : 50}];*/

var qustions_list, qustion;
var aLLQuestion_List, questionsStr;
var question0id, changestate;
var questionsid_arr = new Array();  //声明添加时选中的题目id数组
var choosequstionid_arr = new Array();  //声明已选题目的id数组


var url=location.href;
var index=url.lastIndexOf("\=");
competitionid=url.substring(index+1,url.length);
//console.log(competitionid);
// 获取url里面的id

window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url: '../../../admin/getAdminMap',  //获取管理员个人信息
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
    //fillquestions();     //测试完毕改成get_questions();！！！！！
    get_questions();
};

function get_questions(){
    $.ajax({
        url : '../../../questionList/listQuestionByCompetitionId',
        data: {"competitionId" : competitionid},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status =="success"){
                qustions_list = result.questionList;
                fillquestions();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求已选赛题列表失败！");
        }
    });
}

function fillquestions(){
    /*var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");*/

    for(var i = 0; i < qustions_list.length; ++i){
        j=i+1;
        qustion = qustions_list[i];

        var ChooseQustionids = qustion.questionId.toString();
        choosequstionid_arr.push(ChooseQustionids);
        questionsid_arr.push(ChooseQustionids);
        questionsStr = questionsid_arr[0];
        for(var z=1; z<questionsid_arr.length; ++z){
            questionsStr += "," + questionsid_arr[z];
        }

        //将原先已选的题目id放到两个数组

       var content = '<tr>'+
                        '    <td style="text-align: center;">'+ j +' </td>'+
                        '    <td style="text-align: center; overflow-wrap: break-word;"> '+ qustion.questionTitle+'  </td>'+
                        '    <td style="text-align: center; overflow-wrap: break-word;"> '+ qustion.questionType+'  </td>'+
                        '    <td style="overflow-wrap: break-word;"> '+ qustion.questionBody+' </td>'+   

                        '    <td style="text-align: center; padding-top : 0px; " class="layui-input-block">    '+
                        '        <input type="checkbox" value="'+qustion.questionId+'" class="'+qustion.questionId+'" name="switch" lay-skin="switch" lay-text="解锁|未解锁" lay-filter="switch"> '+
                        '    </td>'+ 

                        '    <td style="text-align: center; padding : 0px;"> '+
                        '        <a class="layui-btn layui-btn-danger layui-btn-xs" onclick = "del_question('+qustion.questionId+')";>'+
                        '            <i class="layui-icon layui-icon-delete"></i>'+
                        '            "删除"'+
                        '        </a>'+
                        '    </td>'+
                        '</tr>'

        $("#body").append(content);

        layui.use('form', function(){
            var form = layui.form;

            if (qustion.isUnlocked == 1){ //1解锁  0锁定
                $('.'+qustion.questionId).prop('checked',true);
              }

            form.render('checkbox');
            form.on('switch(switch)', function (data) {
                var questionid = data.elem.value; 
                var changestate = data.elem.checked;
                //console.log(data.elem.checked)
                edit_choice(changestate, questionid);
            });
        });
    }
}

function edit_choice(changestate, questionid){
    if (changestate == true){
        var state = 1;
    }
    else if (changestate == false){
        var state = 0;
    }

    //console.log(state);
    //console.log(questionid);
    //console.log(competitionid);

    $.ajax({
        url : '../../../Competitionquestion/update',
        data : {"competitionId" : competitionid,
                "questionId" : questionid,
                "isUnlocked" : state},
        scriptCharset : "utf-8",
        type : "post",
        success : function(result){
            console.log(result);
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "修改题目状态成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                $("tbody").html("");
                get_questions();
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

function del_question(qustionid){

    layer.open({
        type: 1,
        offset: 'auto',
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + '确定删除该题目吗？' + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除题目",
        btn1 : function () {
            delQuestion(qustionid);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delQuestion(qustionid){
    //console.log(qustionid);
    //console.log(competitionid);
    $.ajax({
        url : '../../../Competitionquestion/delete',
        data : {"competitionId" : competitionid,
            "questionId" : qustionid },
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
                get_questions();
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

function open_add_questions(){
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['1100px', '700px'],
        content:
            '    <div style="margin: 20px 20px 20px 20px">\n' +
            '      <form class="layui-form">\n' +
            '        <table class="layui-table" style="table-layout: fixed">\n' +
            '            <colgroup>\n' +
            '                <col width="4%">\n' +
            '                <col width="5%">\n' +
            '                <col width="20%">\n' +
            '                <col width="10%">\n' +
            '                <col width="54%">\n' +
            '                <col width="7%">\n' +
            '            </colgroup>\n' +
            '            <thead>\n' +

            '            <tr>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">多选</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">序号</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">标题</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">类型</th>\n' +
            '                 <th style="text-align: center; word-wrap: break-word;">描述</th>\n' +
            '                <th style="text-align: center; word-wrap: break-word;">难度值</th>\n' +
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
        title: "添加题目",
        btn1 : function () {
            add_problem();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
            window.location.reload();
        }
    });

    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });

    $(".layui-layer-setwin").html('');

    //fillallquestions();   //测试完毕删掉这个函数，删除ajax的注释！！！！！！！
    $.ajax({
        url : '../../../questionList/queryQuestionListForCompetition',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            console.log(result);
            if(result.status =="success"){
                aLLQuestion_List = result.questionList;
                fillallquestions();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求所有赛题列表失败！");
        }
    });

}
function fillallquestions(){
    for(var i = 0; i < aLLQuestion_List.length; ++i){
        j=i+1;
        qustion0 = aLLQuestion_List[i];
        //var state=team.teamState;
        var contentone = '<tr>'+
            '    <td style="text-align: center;" class="layui-input-block">    '+
            '        <input type="checkbox" name="" lay-skin="primary" lay-filter="test" value="'+qustion0.questionId+'" class="'+qustion0.questionId+'"> '+
            '    </td>'+

            '    <td style="text-align: center;">'+ j +' </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word;"> '+ qustion0.questionTitle+'  </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word;"> '+ qustion0.questionType+' </td>'+
            '    <td style="overflow-wrap: break-word;"> '+ qustion0.questionBody+' </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word;"> '+ qustion0.questionLevel+' </td>'+

            '</tr>'
        $("#ble").append(contentone);

        //遍历原本已选题目数组，如果与所有题目其中某题的id相等，则在添加弹框中默认选中
        for(var z = 0; z < choosequstionid_arr.length; ++z){
            var choosequstionid = choosequstionid_arr[z];
            if (qustion0.questionId == choosequstionid){
                $('.'+qustion0.questionId).prop('checked',true);
            }
        }

        layui.use('form', function(){
            var form = layui.form;

            form.render('checkbox');
            form.on('checkbox(test)', function (data) {
                question0id = data.elem.value;
                changestate = data.elem.checked;

                //监听每一个复选框的状态，选中则将id放到数组中
                if (changestate == true){
                    questionsid_arr.push(question0id);
                }
                //取消选中则将id从数组总移除
                else if (changestate == false){
                    var index = questionsid_arr.indexOf(question0id);
                    questionsid_arr.splice(index, 1);
                }
                //将id数组转换成字符串放在questionsStr里
                questionsStr = questionsid_arr[0];
                for(var m=1; m<questionsid_arr.length; ++m){
                    questionsStr += "," + questionsid_arr[m];
                }
            });
        });
    }
}

function add_problem(){
//console.log(questionsStr)
    $.ajax({
        url : '../../../Competitionquestion/insert',
        type : 'post',
        data :{"competitionId" : competitionid, "questionIdList" : questionsStr},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_questions();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('请求添加失败！');
        }
    });
}