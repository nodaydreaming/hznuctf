var problem_list;
var problem_type;
var problem_address = null;
var problem_title, problem_level, problem_type, problem_description, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float, problem_towho, problem_createTime;
var uploadInst;
var original_choice, original_choiceTowho;

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
    //fill_problems();     //测试完毕改成get_problems();！！！！！
    get_problems();
};

//获得题目列表
function get_problems(){
    $.ajax({
        url : '../../../questionList/listAllQuestionList',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                problem_list = result.questionList;
                // console.log(problem_list);
                fill_problems();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function(){
            layer.msg("请求题目信息失败！");
        }
    });
}

function fill_problems(){
    if(problem_list.length < 15){
        var tbody = document.getElementsByTagName('tbody')[0];
        $('tbody').html("");

        for(var i = 0; i < problem_list.length; ++i){
            var problem0 = problem_list[i];

            if (problem0.toWho ==0){
                object="全员";
            }
            else {
                object = "比赛";
            }

            var tr = document.createElement('tr');

            var td1 = document.createElement('td');
            td1.style.textAlign = "center";
            td1.innerText = i+1;
            tr.appendChild(td1);

            var td2 = document.createElement('td');
            td2.style.textAlign = "center";
            td2.innerText = problem0.questionTitle;
            td2.style.wordWrap = "break-word";
            tr.appendChild(td2);

            var td11 = document.createElement('td');
            td11.style.textAlign = "center";
            td11.innerText = problem0.questionType;
            td11.style.wordWrap = "break-word";
            tr.appendChild(td11);

            var td3 = document.createElement('td');
            td3.style.textAlign = "center";
            td3.title = problem0.questionBody;
            td3.innerText = problem0.questionBody;
            td3.style.width = "15%";
            td3.style.whiteSpace = "nowrap";
            td3.style.textOverflow = "ellipsis";
            td3.style.overflow = "hidden";
            tr.appendChild(td3);

            var td5 = document.createElement('td');
            td5.style.textAlign = "center";
            td5.innerText = problem0.questionAnswer;
            td5.style.wordWrap = "break-word";
            td5.style.whiteSpace = "nowrap";
            td5.style.textOverflow = "ellipsis";
            td5.style.overflow = "hidden";
            tr.appendChild(td5);

            var td6 = document.createElement('td');
            td6.style.textAlign = "center";
            td6.innerText = problem0.questionAuthor;
            td6.style.wordWrap = "break-word";
            tr.appendChild(td6);

            var td8 = document.createElement('td');
            td8.style.textAlign = "center";
            td8.innerText = problem0.questionPoint;
            td8.style.wordWrap = "break-word";
            tr.appendChild(td8);

            var td9 = document.createElement('td');
            td9.style.textAlign = "center";
            td9.innerText = problem0.questionAdditional;
            td9.style.wordWrap = "break-word";
            tr.appendChild(td9);

            var td10 = document.createElement('td');
            td10.style.textAlign = "center";
            td10.innerText = problem0.questionDecrease;
            td10.style.wordWrap = "break-word";
            tr.appendChild(td10);

            var td12 = document.createElement('td');
            td12.style.textAlign = "center";
            td12.innerText = problem0.questionLevel;
            td12.style.wordWrap = "break-word";
            tr.appendChild(td12);

            var td13 = document.createElement('td');
            td13.style.textAlign = "center";
            td13.innerText = object;
            td13.style.wordWrap = "break-word";
            tr.appendChild(td13);

            var td14 = document.createElement('td');
            td14.style.textAlign = "center";
            td14.innerText = problem0.questionCreatetime;
            td14.style.wordWrap = "break-word";
            tr.appendChild(td14);

            var td7 = document.createElement('td');

            var a1 = document.createElement('a');
            a1.id = "editProblem" + (i+1);
            a1.className = "layui-btn layui-btn-normal layui-btn-xs";
            var i1 = document.createElement('i');
            i1.className = "layui-icon layui-icon-edit";
            a1.appendChild(i1);
            a1.innerHTML = a1.innerHTML + "编辑";
            a1.onclick = edit_problem;
            td7.appendChild(a1);

            var a2 = document.createElement('a');
            a2.id = "delProblem" + (i+1);
            a2.className = "layui-btn layui-btn-danger layui-btn-xs";
            var i2 = document.createElement('i');
            i2.className = "layui-icon layui-icon-delete";
            a2.appendChild(i2);
            a2.innerHTML = a2.innerHTML + "删除";
            a2.onclick = del_problem;
            td7.style.textAlign = "center";
            td7.appendChild(a2);
            tr.appendChild(td7);

            tbody.appendChild(tr);
        }
    }
    else if(problem_list.length >= 15){
        var tbody = document.getElementsByTagName('tbody')[0];
        $('tbody').html("");

        for(var j = 0; j < 15; ++j){
            var problem0 = problem_list[j];

            if (problem0.toWho ==0){
                object="全员";
            }
            else {
                object = "比赛";
            }

            var tr = document.createElement('tr');

            var td1 = document.createElement('td');
            td1.style.textAlign = "center";
            td1.innerText = j+1;
            tr.appendChild(td1);

            var td2 = document.createElement('td');
            td2.style.textAlign = "center";
            td2.innerText = problem0.questionTitle;
            td2.style.wordWrap = "break-word";
            tr.appendChild(td2);

            var td11 = document.createElement('td');
            td11.style.textAlign = "center";
            td11.innerText = problem0.questionType;
            td11.style.wordWrap = "break-word";
            tr.appendChild(td11);

            var td3 = document.createElement('td');
            td3.style.textAlign = "center";
            td3.title = problem0.questionBody;
            td3.innerText = problem0.questionBody;
            td3.style.width = "15%";
            td3.style.whiteSpace = "nowrap";
            td3.style.textOverflow = "ellipsis";
            td3.style.overflow = "hidden";
            tr.appendChild(td3);

            var td5 = document.createElement('td');
            td5.style.textAlign = "center";
            td5.innerText = problem0.questionAnswer;
            td5.style.wordWrap = "break-word";
            td5.style.whiteSpace = "nowrap";
            td5.style.textOverflow = "ellipsis";
            td5.style.overflow = "hidden";
            tr.appendChild(td5);

            var td6 = document.createElement('td');
            td6.style.textAlign = "center";
            td6.innerText = problem0.questionAuthor;
            td6.style.wordWrap = "break-word";
            tr.appendChild(td6);

            var td8 = document.createElement('td');
            td8.style.textAlign = "center";
            td8.innerText = problem0.questionPoint;
            td8.style.wordWrap = "break-word";
            tr.appendChild(td8);

            var td9 = document.createElement('td');
            td9.style.textAlign = "center";
            td9.innerText = problem0.questionAdditional;
            td9.style.wordWrap = "break-word";
            tr.appendChild(td9);

            var td10 = document.createElement('td');
            td10.style.textAlign = "center";
            td10.innerText = problem0.questionDecrease;
            td10.style.wordWrap = "break-word";
            tr.appendChild(td10);

            var td12 = document.createElement('td');
            td12.style.textAlign = "center";
            td12.innerText = problem0.questionLevel;
            td12.style.wordWrap = "break-word";
            tr.appendChild(td12);

            var td13 = document.createElement('td');
            td13.style.textAlign = "center";
            td13.innerText = object;
            td13.style.wordWrap = "break-word";
            tr.appendChild(td13);

            var td14 = document.createElement('td');
            td14.style.textAlign = "center";
            td14.innerText = problem0.questionCreatetime;
            td14.style.wordWrap = "break-word";
            tr.appendChild(td14);

            var td7 = document.createElement('td');

            var a1 = document.createElement('a');
            a1.id = "editProblem" + (i+1);
            a1.className = "layui-btn layui-btn-normal layui-btn-xs";
            var i1 = document.createElement('i');
            i1.className = "layui-icon layui-icon-edit";
            a1.appendChild(i1);
            a1.innerHTML = a1.innerHTML + "编辑";
            a1.onclick = edit_problem;
            td7.appendChild(a1);

            var a2 = document.createElement('a');
            a2.id = "delProblem" + (i+1);
            a2.className = "layui-btn layui-btn-danger layui-btn-xs";
            var i2 = document.createElement('i');
            i2.className = "layui-icon layui-icon-delete";
            a2.appendChild(i2);
            a2.innerHTML = a2.innerHTML + "删除";
            a2.onclick = del_problem;
            td7.style.textAlign = "center";
            td7.appendChild(a2);
            tr.appendChild(td7);

            tbody.appendChild(tr);
        }
        $("#paging").sPage({
            page:1,//当前页码，必填
            total:problem_list.length,//数据总条数，必填
            pageSize:15,//每页显示多少条数据，默认10条
            totalTxt:'共'+problem_list.length+'条',//数据总条数文字描述，{total}为占位符，默认"共{total}条"
            showTotal:false,//是否显示总条数，默认关闭：false
            showSkip:true,//是否显示跳页，默认关闭：false
            showPN:true,//是否显示上下翻页，默认开启：true
            prevPage:"上一页",//上翻页文字描述，默认“上一页”
            nextPage:"下一页",//下翻页文字描述，默认“下一页”
            backFun:function(page){
                $('tbody').html("");
                var lastpage = parseInt(problem_list.length/15)+1;
                if(page<lastpage){
                    for (var k = (page-1)*15; k < page*15; k++){

                        var problem0 = problem_list[k];

                        if (problem0.toWho ==0){
                            object="全员";
                        }
                        else {
                            object = "比赛";
                        }

                        var tr = document.createElement('tr');

                        var td1 = document.createElement('td');
                        td1.style.textAlign = "center";
                        td1.innerText = k+1;
                        tr.appendChild(td1);

                        var td2 = document.createElement('td');
                        td2.style.textAlign = "center";
                        td2.innerText = problem0.questionTitle;
                        td2.style.wordWrap = "break-word";
                        tr.appendChild(td2);

                        var td11 = document.createElement('td');
                        td11.style.textAlign = "center";
                        td11.innerText = problem0.questionType;
                        td11.style.wordWrap = "break-word";
                        tr.appendChild(td11);

                        var td3 = document.createElement('td');
                        td3.style.textAlign = "center";
                        td3.title = problem0.questionBody;
                        td3.innerText = problem0.questionBody;
                        td3.style.width = "15%";
                        td3.style.whiteSpace = "nowrap";
                        td3.style.textOverflow = "ellipsis";
                        td3.style.overflow = "hidden";
                        tr.appendChild(td3);

                        /*var td4 = document.createElement('td');
                        td4.style.textAlign = "center";
                        td4.innerText = problem0.questionResource.substring((problem0.questionResource).lastIndexOf('/')+21);
                        td4.style.wordWrap = "break-word";
                        tr.appendChild(td4);*/

                        var td5 = document.createElement('td');
                        td5.style.textAlign = "center";
                        td5.innerText = problem0.questionAnswer;
                        td5.style.wordWrap = "break-word";
                        td5.style.whiteSpace = "nowrap";
                        td5.style.textOverflow = "ellipsis";
                        td5.style.overflow = "hidden";
                        tr.appendChild(td5);

                        var td6 = document.createElement('td');
                        td6.style.textAlign = "center";
                        td6.innerText = problem0.questionAuthor;
                        td6.style.wordWrap = "break-word";
                        tr.appendChild(td6);

                        var td8 = document.createElement('td');
                        td8.style.textAlign = "center";
                        td8.innerText = problem0.questionPoint;
                        td8.style.wordWrap = "break-word";
                        tr.appendChild(td8);

                        var td9 = document.createElement('td');
                        td9.style.textAlign = "center";
                        td9.innerText = problem0.questionAdditional;
                        td9.style.wordWrap = "break-word";
                        tr.appendChild(td9);

                        var td10 = document.createElement('td');
                        td10.style.textAlign = "center";
                        td10.innerText = problem0.questionDecrease;
                        td10.style.wordWrap = "break-word";
                        tr.appendChild(td10);

                        var td12 = document.createElement('td');
                        td12.style.textAlign = "center";
                        td12.innerText = problem0.questionLevel;
                        td12.style.wordWrap = "break-word";
                        tr.appendChild(td12);

                        var td13 = document.createElement('td');
                        td13.style.textAlign = "center";
                        td13.innerText = object;
                        td13.style.wordWrap = "break-word";
                        tr.appendChild(td13);

                        var td14 = document.createElement('td');
                        td14.style.textAlign = "center";
                        td14.innerText = problem0.questionCreatetime;
                        td14.style.wordWrap = "break-word";
                        tr.appendChild(td14);

                        var td7 = document.createElement('td');

                        var a1 = document.createElement('a');
                        a1.id = "editProblem" + (i+1);
                        a1.className = "layui-btn layui-btn-normal layui-btn-xs";
                        var i1 = document.createElement('i');
                        i1.className = "layui-icon layui-icon-edit";
                        a1.appendChild(i1);
                        a1.innerHTML = a1.innerHTML + "编辑";
                        a1.onclick = edit_problem;
                        td7.appendChild(a1);

                        var a2 = document.createElement('a');
                        a2.id = "delProblem" + (i+1);
                        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
                        var i2 = document.createElement('i');
                        i2.className = "layui-icon layui-icon-delete";
                        a2.appendChild(i2);
                        a2.innerHTML = a2.innerHTML + "删除";
                        a2.onclick = del_problem;
                        td7.style.textAlign = "center";
                        td7.appendChild(a2);
                        tr.appendChild(td7);

                        tbody.appendChild(tr);
                    }
                }

                else if(page == lastpage){
                    for (var k = (page-1)*15; k < problem_list.length; k++){
                        var problem0 = problem_list[k];

                        if (problem0.toWho ==0){
                            object="全员";
                        }
                        else {
                            object = "比赛";
                        }

                        var tr = document.createElement('tr');

                        var td1 = document.createElement('td');
                        td1.style.textAlign = "center";
                        td1.innerText = k+1;
                        tr.appendChild(td1);

                        var td2 = document.createElement('td');
                        td2.style.textAlign = "center";
                        td2.innerText = problem0.questionTitle;
                        td2.style.wordWrap = "break-word";
                        tr.appendChild(td2);

                        var td11 = document.createElement('td');
                        td11.style.textAlign = "center";
                        td11.innerText = problem0.questionType;
                        td11.style.wordWrap = "break-word";
                        tr.appendChild(td11);

                        var td3 = document.createElement('td');
                        td3.style.textAlign = "center";
                        td3.title = problem0.questionBody;
                        td3.innerText = problem0.questionBody;
                        td3.style.width = "15%";
                        td3.style.whiteSpace = "nowrap";
                        td3.style.textOverflow = "ellipsis";
                        td3.style.overflow = "hidden";
                        tr.appendChild(td3);

                        /*var td4 = document.createElement('td');
                        td4.style.textAlign = "center";
                        td4.innerText = problem0.questionResource.substring((problem0.questionResource).lastIndexOf('/')+21);
                        td4.style.wordWrap = "break-word";
                        tr.appendChild(td4);*/

                        var td5 = document.createElement('td');
                        td5.style.textAlign = "center";
                        td5.innerText = problem0.questionAnswer;
                        td5.style.wordWrap = "break-word";
                        td5.style.whiteSpace = "nowrap";
                        td5.style.textOverflow = "ellipsis";
                        td5.style.overflow = "hidden";
                        tr.appendChild(td5);

                        var td6 = document.createElement('td');
                        td6.style.textAlign = "center";
                        td6.innerText = problem0.questionAuthor;
                        td6.style.wordWrap = "break-word";
                        tr.appendChild(td6);

                        var td8 = document.createElement('td');
                        td8.style.textAlign = "center";
                        td8.innerText = problem0.questionPoint;
                        td8.style.wordWrap = "break-word";
                        tr.appendChild(td8);

                        var td9 = document.createElement('td');
                        td9.style.textAlign = "center";
                        td9.innerText = problem0.questionAdditional;
                        td9.style.wordWrap = "break-word";
                        tr.appendChild(td9);

                        var td10 = document.createElement('td');
                        td10.style.textAlign = "center";
                        td10.innerText = problem0.questionDecrease;
                        td10.style.wordWrap = "break-word";
                        tr.appendChild(td10);

                        var td12 = document.createElement('td');
                        td12.style.textAlign = "center";
                        td12.innerText = problem0.questionLevel;
                        td12.style.wordWrap = "break-word";
                        tr.appendChild(td12);

                        var td13 = document.createElement('td');
                        td13.style.textAlign = "center";
                        td13.innerText = object;
                        td13.style.wordWrap = "break-word";
                        tr.appendChild(td13);

                        var td14 = document.createElement('td');
                        td14.style.textAlign = "center";
                        td14.innerText = problem0.questionCreatetime;
                        td14.style.wordWrap = "break-word";
                        tr.appendChild(td14);

                        var td7 = document.createElement('td');

                        var a1 = document.createElement('a');
                        a1.id = "editProblem" + (i+1);
                        a1.className = "layui-btn layui-btn-normal layui-btn-xs";
                        var i1 = document.createElement('i');
                        i1.className = "layui-icon layui-icon-edit";
                        a1.appendChild(i1);
                        a1.innerHTML = a1.innerHTML + "编辑";
                        a1.onclick = edit_problem;
                        td7.appendChild(a1);

                        var a2 = document.createElement('a');
                        a2.id = "delProblem" + (i+1);
                        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
                        var i2 = document.createElement('i');
                        i2.className = "layui-icon layui-icon-delete";
                        a2.appendChild(i2);
                        a2.innerHTML = a2.innerHTML + "删除";
                        a2.onclick = del_problem;
                        td7.style.textAlign = "center";
                        td7.appendChild(a2);
                        tr.appendChild(td7);

                        tbody.appendChild(tr);
                    }
                }
            }
        });
    }
}

function  edit_problem(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var problem = problem_list[num-1];
    original_choice=problem.questionType;
    original_choiceTowho = problem.toWho;
    //console.log(problem);
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '600px'],
        content:'<form class="layui-form" action="" style="margin:50px 0 0 5%; font-size:15px">\n' +

            //题目名称
            '     <div class="layui-form-item">\n' +
            '         <label class="layui-form-label">题目名称</label>\n' +
            '         <div class="layui-input-block">\n' +
            '         <input type="text" id="problem_title" autocomplete="off" placeholder="请输入题目名称" required class="layui-input" style="width: 50%;" value="'+ problem.questionTitle +'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '         </div>\n' +
            '     </div>\n' +

            //题目类型
            '     <div class="layui-inline layui-form-item" style="margin-top:1%" id="type">\n' +
            '         <label class="layui-form-label">题目类型</label>\n' +
            '         <div class="layui-input-inline" id="type1">\n' +
            '             <select name="modules">\n' +
            '                 <option value="">请选择</option>\n' +
            '             </select>\n' +
            '         </div>\n' +
            '     </div>\n' +

            '     <div class="layui-inline layui-form-item" style="margin-top:1%" id="toWho">\n' +
            '           <label class="layui-form-label">开放对象</label>\n'+
            '            <div class="layui-input-inline" id="towho1">\n'+
            '               <select name="module" >\n'+
            '                    <option value="">请选择开放对象</option>\n'+
            '                    <option value="0" id="0">全员</option>\n'+
            '                    <option value="1" id="1">比赛</option>\n'+
            '               </select>\n'+
            '          </div>\n'+
            '       </div>\n'+

            //题目描述
            '     <div class="layui-form-item" style="margin-top:1%">\n' +
            '         <label class="layui-form-label">题目描述</label>\n' +
            '         <div class="layui-input-block">\n' +
            '             <textarea class="tcp_content layui-textarea" placeholder="请输入题目描述" style="width: 70%;" \n' +
            '             onchange="textarea_fun()" onkeydown="textarea_fun()" onkeyup="textarea_fun()">'+problem.questionBody+'</textarea>\n' +
            '         </div>\n' +
            '     </div>\n' +

            //题目答案
            '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
            '         <label class="layui-form-label">题目答案</label>\n' +
            '         <div class="layui-input-block">\n' +
            '         <input type="text" id="problem_answer" autocomplete="off" placeholder="请输入题目答案" required value="'+ problem.questionAnswer +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '         </div>\n' +
            '     </div>\n' +

            //题目作者
            '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
            '         <label class="layui-form-label">题目作者</label>\n' +
            '         <div class="layui-input-block">\n' +
            '         <input type="text" id="problem_author" autocomplete="off" placeholder="请输入题目作者" required value="'+ problem.questionAuthor +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '         </div>\n' +
            '     </div>\n' +


            //题目分值
            '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
            '        <label class="layui-form-label">题目分值</label>\n' +
            '        <div class="layui-input-block" style="width:30%">\n' +
            '           <input type="number" id="problem_sorce" autocomplete="off" required value="'+ problem.questionPoint+'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +
            '     </div>\n' +

            //附加分
            '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
            '        <label class="layui-form-label">附加分</label>\n' +
            '        <div class="layui-input-block" style="width:30%">\n' +
            '           <input type="number" id="problem_additional_sorce" autocomplete="off" required value="'+ problem.questionAdditional +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +
            '     </div>\n' +

            //降分幅度
            '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
            '        <label class="layui-form-label">降分幅度</label>\n' +
            '        <div class="layui-input-block" style="width:30%">\n' +
            '           <input type="number" id="problem_sorce_float" autocomplete="off" required value="'+ problem.questionDecrease +'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +
            '     </div>\n' +

            //题目难度
            '     <div class="layui-form-item" style="margin-top:2.5%">\n' +
            '        <label class="layui-form-label">题目难度</label>\n' +
            '        <div class="layui-input-block" style="width:30%">\n' +
            '           <input type="number" id="problem_level" autocomplete="off" required value="'+ problem.questionLevel+'" class="layui-input" style="width: 50%;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '        </div>\n' +
            '     </div>\n' +
            '</form>' ,

        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "更新题目信息",
        btn1 : function () {
            check_problem(problem);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });

    layui.use('form', function() {
        var form = layui.form;
        getProblemType();
        form.render();
        form.verify();

    });
    layui.use('element', function(){
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击\n' +
        element.on('nav(demo)', function(elem){
            //console.log(elem)\n' +
            layer.msg(elem.text());
        });
    });
}

function filltowhoSelect(){
    var select = document.getElementsByName("module")[0];
    //console.log(select);
    if (original_choiceTowho == 1){
        $("#1").attr("selected","selected");
    }
    else if(original_choiceTowho == 0){
        $("#0").attr("selected","selected");
    }
}


function getProblemType(){
    $.ajax({
        url : '../../../Questiontype/ListQuestiontype',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                var form = layui.form;
                problem_type = result.typeList;
                fillProblemTypeSelect();
                filltowhoSelect();
                form.render();
                form.verify();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求失败！");
        }
    });
}

function fillProblemTypeSelect(){
    // var select = $("#xuanze").val();
    var select = document.getElementsByName("modules")[0];
    //console.log(select);
    select.innerHTML = "";
    var option0 = document.createElement("option");
    option0.value = "";
    option0.innerText = "请选择";
    select.appendChild(option0);
    for(var i = 0; i < problem_type.length; ++i){
        var option = document.createElement("option");
        option.value = problem_type[i].typeId;
        option.innerText = problem_type[i].questionType;
        select.appendChild(option);
        if(original_choice === problem_type[i].questionType){
            option.selected = true;
        }
    }
    var form = layui.form;
    form.render();
    form.verify();
    //console.log(select);
}

function check_problem(problem){
    problem_title = $("#problem_title").val();
    problem_type  = $("#type").find('.layui-this').attr("lay-value");
    problem_description = $(".tcp_content").val();
    problem_answer = $("#problem_answer").val();
    problem_author = $("#problem_author").val();
    problem_sorce = $("#problem_sorce").val();
    problem_additional_sorce = $("#problem_additional_sorce").val();
    problem_sorce_float = $("#problem_sorce_float").val();
    problem_level = $("#problem_level").val();
    problem_towho= $("#toWho").find('.layui-this').attr("lay-value");
    //console.log(problem_type);
    //console.log(problem_towho);
    //将题目类型的中文说明转换为对应的数字

    if(problem_title === "" || problem_title == null){
        layer.msg("题目名称不能为空！");
    }
    else if(problem_type == "" || problem_type == null){
        layer.msg("题目类型不能为空！");
    }
    else if(problem_towho == "" || problem_towho == null){
        layer.tips("开放对象不能为空！", "#towho1");
    }
    else if(problem_description === "" || problem_description == null){
        layer.tips("题目描述不能为空！", ".tcp_content ");
    }
    else if(problem_answer === "" || problem_answer == null){
        layer.tips("题目答案不能为空！", "#problem_answer");
    }
    else if(problem_author === "" || problem_author == null){
        layer.tips("题目作者不能为空！", "#problem_author");
    }
    else if(problem_sorce == "" || problem_sorce == null){
        layer.tips("题目分值不能为空！", "#problem_sorce");
    }
    else if(problem_additional_sorce == "" || problem_additional_sorce == null){
        layer.msg("题目附加分不能为空！", "#problem_additional_sorce");
    }
    else if(problem_sorce_float == "" || problem_sorce_float == null){
        layer.tips("题目降分幅度不能为空！", "#problem_sorce_float");
    }
    else if(problem_level == "" || problem_level == null){
        layer.tips("题目难度不能为空！", "#problem_level");
    }

    else{
        update_Problem(problem.questionId,problem_title, problem_type, problem_description, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float, problem_level,problem_towho);
    }
}

function update_Problem(id,problem_title, problem_type, problem_description, problem_answer, problem_author, problem_sorce, problem_additional_sorce, problem_sorce_float, problem_level,problem_towho){
    $.ajax({
        url : '../../../question/update',
        data :{"questionId":id,
            "questionTitle" : problem_title,
            "questionTypeid" : parseInt(problem_type),
            "questionBody" : problem_description,
            "questionAnswer" : problem_answer,
            "questionAuthor" : problem_author,
            "questionPoint" : parseInt(problem_sorce),
            "questionAdditional" : parseInt(problem_additional_sorce),
            "questionDecrease" : parseFloat(problem_sorce_float),
            "toWho" : parseFloat(problem_towho),
            "questionLevel" : parseInt(problem_level)},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.status== "success"){
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                get_problems();
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

function del_problem(){
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var problem = problem_list[num-1];
    layer.open({
        type: 1,
        offset: 'auto',
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除题目吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除题目",
        btn1 : function () {
            delProblem(problem);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delProblem(problem){
    var id = problem.questionId;
    $.ajax({
        url : '../../../question/delete',
        data : {"questionId" : id },
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
                get_problems();
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


function textarea_fun(){
    $(".tcp_content").val($(".tcp_content").val().substring(0,500));
    $(".t_h i").html($(".tcp_content").val().length);
    if(window.event.keyCode  == 13){
        return false;
    }
}