/*var problem_type = [{"id" : "1",
                     "type" : "web"},
                     {"id" : "2",
                     "type" : "定向"},
                     {"id" : "3",
                     "type" : "其实"
                     }
                     ]; */
var problem_type;
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
    getProblemType();
    //fillProblemTypeSelect();
};
//请求可添加题目的题目类型名称
function getProblemType(){
    $.ajax({
        url : '../../../Questiontype/ListQuestiontype', //获取所有题目类型
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                var form = layui.form;
                problem_type = result.typeList;
                fillProblemTypeSelect();
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
    //console.log(problem_type);
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
    }
    var form = layui.form;
    form.render();
    form.verify();
    //console.log(select);
}

function textarea_fun(){
    $(".tcp_content").val($(".tcp_content").val().substring(0,500));
    $(".t_h i").html($(".tcp_content").val().length);
    if(window.event.keyCode  == 13){
        return false;
    }
}