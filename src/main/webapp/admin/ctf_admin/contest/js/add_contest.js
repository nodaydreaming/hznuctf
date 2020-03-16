var contest_title, contest_starttime,contest_endtime,contest_number, contest_organizer, contest_intro;
var contest_target, contest_plan, contest_rule, contest_reward, contest_registration,contest_type;
var photo = null;

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
}



function add_contest(){
    contest_title = $("#contest_title").val();
    contest_starttime = $("#contest_starttime").val();
    contest_endtime = $("#contest_endtime").val();
    contest_number = $('#contest_number').val();
    contest_organizer = $('#contest_holder').val();
    // contest_description = $(".tcp_content").val();
    contest_intro = $('#contest_intro').val();
    contest_target = $('#contest_target').val();
    contest_plan = $('#contest_plan').val();
    contest_rule = $('#contest_rule').val();
    contest_reward = $('#contest_reward').val();
    contest_registration = $('#contest_registration').val();
    contest_type = ((document.getElementsByClassName('layui-form-radioed'))[0]).childNodes[1].innerText;
    //console.log(contest_rule);
    //console.log(contest_type);
    if (contest_type === "团队赛") {
            contest_type = 1;
        }
        else {
            contest_type = 0;
        }
    //非空判断
    if(contest_title === "" || contest_title == null){
        layer.msg("比赛名称不能为空！");
    }
    else if(contest_starttime === "" || contest_starttime == null){
        layer.msg("时间不能为空！");
    }
    else if(contest_endtime === "" || contest_endtime == null){
        layer.msg("时间不能为空！");
    }
    else if(contest_number === "" || contest_number == null){
        layer.msg("比赛编号不能为空！");
    }
    else if(contest_organizer === "" || contest_organizer == null){
        layer.msg("比赛组织者不能为空！");
    }
    else if(contest_intro === "" || contest_intro == null){
        layer.msg("比赛介绍不能为空！");
    }
    else if(contest_target === "" || contest_target == null){
        layer.msg("比赛对象及形式不能为空！");
    }
    else if(contest_plan === "" || contest_plan == null){
        layer.msg("比赛安排及内容不能为空！");
    }
    else if(contest_rule === "" || contest_rule == null){
        layer.msg("比赛规则不能为空！");
    }
    else if(contest_reward === "" || contest_reward == null){
        layer.msg("比赛奖励不能为空！");
    }
    else if(contest_registration === "" || contest_registration == null){
        layer.msg("比赛报名方式不能为空！");
    }
    else if( photo != null) {
        uploadInst.upload();
    }
    else {
        add_Contest(contest_title, contest_starttime,contest_endtime,contest_number, contest_organizer, contest_intro, contest_target, contest_plan, contest_rule, contest_reward, contest_registration,contest_type, photo);
    }
}

layui.use('upload', function() {
    var $ = layui.jquery, upload = layui.upload;//得到 upload 对象
    //普通图片上传使用layui上传图片
    //创建一个上传组件
    uploadInst = upload.render({
        elem: '#upload'  //绑定元素(上传图片的按钮)
        , url: '../../../file/uploadCompetitionImage'  //上传比赛海报的单独接口
        , accept : 'images'   //指定允许上传时校验的文件类型
        , multiple : false
        , auto : false       //选择文件后不自动上传
        /*, bindAction: '#submitbtn'*/
        , field : 'file'
        , choose: function (obj) { +  //choose：选择文件后的回调函数，在文件被选择后触发
            //预读本地文件示例，不支持ie8 +
            obj.preview(function (index, file, result) {
                //console.log(index); //得到文件索引
                //console.log(file); //得到文件对象
                //console.log(result); //得到文件base64编码，比如图片
                $('.layui-upload').css("height", "10%");
                $('.layui-upload').css("marginButtom", "10px");
                $('#demo1').attr('src', result); //图片链接（base64）
                $('#demo1').css("maxWidth", "10%");
                $('#demo1').css("marginRight", "10px");
                photo = result;
            });
        }
        , done: function (res) {     //执行上传请求后的回调
            //如果上传失败
            if (res.status == "error") {
                return layer.msg('上传失败');
            }
            //上传成功
            else
            {
                photo = res.src;
                $('#demo1').attr('src', photo);
                add_Contest(contest_title, contest_starttime,contest_endtime,contest_number, contest_organizer, contest_intro,contest_target, contest_plan, contest_rule, contest_reward, contest_registration,contest_type,photo);
            }
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
    }
    });
});


function add_Contest(contest_title, contest_starttime,contest_endtime,contest_number, contest_organizer, contest_intro,
    contest_target, contest_plan, contest_rule, contest_reward, contest_registration,contest_type,photo){

    /*console.log(contest_title, contest_starttime,contest_endtime,contest_number, contest_organizer, contest_intro,
    contest_target, contest_plan, contest_rule, contest_reward, contest_registration,contest_type,photo);*/

    $.ajax({
        url : '../../../competition/insertCompetition',  //添加题目
        type:'post',
        data :{"competitionTitle": contest_title,
        "start": contest_starttime,
        "end": contest_endtime,
        "isteam": parseInt(contest_type),
        "competitionNumber": contest_number,
        "holder": contest_organizer,
        "intro" : contest_intro,
        "target": contest_target,
        "plan" : contest_plan,
        "rule" : contest_rule,
        "reward":contest_reward,
        "registration" : contest_registration,
        "image" : photo},
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.status == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                $('.layui-btn-primary').click();
                $('#demo1').removeAttr("src");  //removeAttr() 方法从被选元素中移除属性
            }
            else{
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + result.message + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }

        },
        error : function(){
            layer.msg('请求添加比赛失败');
        }
    });
}
