/*var user = {  "adminAccount" : "lzypcx321",
             "adminPassword":"111111",
              "adminTel":"15990832293",
              "adminImage":"",
              "adminNickname":"闻舟",
              "adminName" : "骆闻舟",
              "adminState" : 2 };*/
var user; 

function inputLimit(){
    var input = window.event.target;
    input.value = input.value.substring(0,100); if(window.event.keyCode ==13) return false;
}

function openUpdate(){
    $.ajax({
        url : '../../../admin/getAdminSelf',  //管理员获得自己的信息
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success"){
            // console.log(result);
            user = result.loginAdmin;
            openUpdatetwo();
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
//管理员修改自身信息
function openUpdatetwo() {
    //console.log(user);
    //console.log(user.nickname);
    adminPhoto = (user.adminImage == null) ? "" : (user.adminImage);

    if(user.adminState == 0){   //超级管理员
        layer.open({
            type: 1,
            offset: 'auto',
            skin: 'layui-layer-lan',
            id: 'layerDemo1', //防止重复弹出
            area: ['500px', '570px'],
            content:
                '<form class="layui-form" method="post" enctype="multipart/form-data" style="margin-top: 30px;">\n' +
                //修改头像
                '    <div class="layui-form-item layui-upload">\n' +
                '        <label class="layui-form-label">照片</label>\n' +
                '        <div class="layui-upload-list">\n' +
                '            <img class="layui-upload-img" id="adminDemo1" style="float:left;max-width: 10%; margin-right: 10px" src="'+ adminPhoto +'">\n' +
                '            <div style="float:left;">\n' +
                '                <button type="button" class="layui-btn" id="uploadAdmin">修改头像</button>\n' +
                '                <p id="demoText" style="width: 100px; margin-top: 20px"></p>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +

                //原密码
                '    <div class="layui-form-item">\n' +
                '       <label class="layui-form-label">原密码</label>\n' +
                '       <div class="layui-input-block">\n' +
                '          <input type="password" name="oldPwd" id="oldPwd" placeholder="请输入原密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '    </div>\n' +

                //新密码
                '    </div>\n' +'    <div class="layui-form-item">\n' +
                '       <label class="layui-form-label">新密码</label>\n' +
                '       <div class="layui-input-block">\n' +
                '          <input type="password" name="newPwd" id="newPwd" placeholder="请输入新密码" autocomplete="off" value="'+user.adminPassword+'" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '       </div>\n' +
                '    </div>\n' +

                //确认新密码
                '    <div class="layui-form-item">\n' +
                '      <label class="layui-form-label">确认密码</label>\n' +
                '      <div class="layui-input-block">\n' +
                '        <input type="password" id="newConfPwd" placeholder="请确认密码" autocomplete="off" value="'+user.adminPassword+'" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '      </div>\n' +
                '    </div>\n' +

                //修改昵称
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">昵称</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="text" id="adminNickname"  autocomplete="off" placeholder="请输入昵称" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="'+user.adminNickname+'">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改真名
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">真实姓名</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="text" id="adminname"  autocomplete="off" placeholder="请输入真实姓名" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="'+user.adminName+'">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改手机号
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">手机号</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input class="layui-input" id="adminTelephone" type="text" name="telephone" placeholder="请输入手机号" autocomplete="off" style="width: 250px;" value="'+user.adminTel+'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改权限
                '    <div class="adminState layui-form-item">\n' +
                '        <label class="layui-form-label">管理员类别</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="radio" name="state" value="超级管理员" title="超级管理员" checked="">\n' +
                '            <div class="layui-unselect layui-form-radio layui-form-radioed">\n' +
                '                <i class="layui-anim layui-icon"></i>\n' +
                '                <p>超级管理员</p>\n' +
                '            </div>\n' +
                '            <input type="radio" name="state" value="普通管理员" title="普通管理员">\n' +
                '            <div class="layui-unselect layui-form-radio layui-form-radioed">\n' +
                '                <i class="layui-anim layui-icon"></i>\n' +
                '                <p>普通管理员</p>\n' +
                '            </div>\n' +
                '            <input type="radio" name="state" value="教师" title="教师">\n' +
                '            <div class="layui-unselect layui-form-radio">\n' +
                '                <i class="layui-anim layui-icon"></i>\n' +
                '                <p>教师</p>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</form>',

            btn: ['确定', '取消'],
            btnAlign: 'c',
            shade: 0.5,
            title: "修改个人信息",
            btn1 : function () {
                editAdmin(user, adminPhoto);
                return false;
            },
            btn2 : function () {
                layer.closeAll();
            }
        });
    }

    else if(user.adminState == 1){   //普通管理员
        layer.open({
            type: 1,
            offset: 'auto',
            skin: 'layui-layer-lan',
            id: 'layerDemo1', //防止重复弹出
            area: ['500px', '550px'],
            content:
                '<form class="layui-form" method="post" enctype="multipart/form-data" style="margin-top: 30px;">\n' +
                //修改头像
                '    <div class="layui-form-item layui-upload">\n' +
                '        <label class="layui-form-label">照片</label>\n' +
                '        <div class="layui-upload-list">\n' +
                '            <img class="layui-upload-img" id="adminDemo1" style="float:left;max-width: 10%; margin-right: 10px" src="'+ adminPhoto +'">\n' +
                '            <div style="float:left;">\n' +
                '                <button type="button" class="layui-btn" id="uploadAdmin">修改头像</button>\n' +
                '                <p id="demoText" style="width: 100px; margin-top: 20px"></p>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +

                //原密码
                '    <div class="layui-form-item">\n' +
                '       <label class="layui-form-label">原密码</label>\n' +
                '       <div class="layui-input-block">\n' +
                '          <input type="password" name="oldPwd" id="oldPwd" placeholder="请输入原密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '    </div>\n' +

                //新密码
                '    </div>\n' +'    <div class="layui-form-item">\n' +
                '       <label class="layui-form-label">新密码</label>\n' +
                '       <div class="layui-input-block">\n' +
                '          <input type="password" name="newPwd" id="newPwd" placeholder="请输入新密码" autocomplete="off" value="'+user.adminPassword+'" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '       </div>\n' +
                '    </div>\n' +

                //确认新密码
                '    <div class="layui-form-item">\n' +
                '      <label class="layui-form-label">确认密码</label>\n' +
                '      <div class="layui-input-block">\n' +
                '        <input type="password" id="newConfPwd" placeholder="请确认密码" autocomplete="off" value="'+user.adminPassword+'" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '      </div>\n' +
                '    </div>\n' +

                //修改昵称
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">昵称</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="text" id="adminNickname"  autocomplete="off" placeholder="请输入昵称" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="'+user.adminNickname+'">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改真名
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">真实姓名</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="text" id="adminname"  autocomplete="off" placeholder="请输入真实姓名" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="'+user.adminName+'">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改手机号
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">手机号</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input class="layui-input" id="adminTelephone" type="text" name="telephone" placeholder="请输入手机号" autocomplete="off" style="width: 250px;" value="'+user.adminTel+'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改权限
                '    <div class="adminState layui-form-item">\n' +
                '        <label class="layui-form-label">管理员类别</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="radio" name="state" value="普通管理员" title="普通管理员" checked="">\n' +
                '            <div class="layui-unselect layui-form-radio layui-form-radioed">\n' +
                '                <i class="layui-anim layui-icon"></i>\n' +
                '                <p>普通管理员</p>\n' +
                '            </div>\n' +
                '            <input type="radio" name="state" value="教师" title="教师">\n' +
                '            <div class="layui-unselect layui-form-radio">\n' +
                '                <i class="layui-anim layui-icon"></i>\n' +
                '                <p>教师</p>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +

                '</form>',
            btn: ['确定', '取消'],
            btnAlign: 'c',
            shade: 0.5,
            title: "修改个人信息",
            btn1 : function () {
                editAdmin(user, adminPhoto);
                return false;
            },
            btn2 : function () {
                layer.closeAll();
            }
        });
    }
    else if(user.adminState == 2){ //教师
        layer.open({
            type: 1,
            offset: 'auto',
            skin: 'layui-layer-lan',
            id: 'layerDemo1', //防止重复弹出
            area: ['500px', '520px'],
            content:
                '<form class="layui-form" method="post" enctype="multipart/form-data" style="margin-top: 30px;">\n' +
                //修改头像
                '    <div class="layui-form-item layui-upload">\n' +
                '        <label class="layui-form-label">照片</label>\n' +
                '        <div class="layui-upload-list">\n' +
                '            <img class="layui-upload-img" id="adminDemo1" style="float:left;max-width: 10%; margin-right: 10px" src="'+ adminPhoto +'">\n' +
                '            <div style="float:left;">\n' +
                '                <button type="button" class="layui-btn" id="uploadAdmin">修改头像</button>\n' +
                '                <p id="demoText" style="width: 100px; margin-top: 20px"></p>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +

                //原密码
                '    <div class="layui-form-item">\n' +
                '       <label class="layui-form-label">原密码</label>\n' +
                '       <div class="layui-input-block">\n' +
                '          <input type="password" name="oldPwd" id="oldPwd" placeholder="请输入原密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '    </div>\n' +


                //新密码
                '    </div>\n' +'    <div class="layui-form-item">\n' +
                '       <label class="layui-form-label">新密码</label>\n' +
                '       <div class="layui-input-block">\n' +
                '          <input type="password" name="newPwd" id="newPwd" placeholder="请输入新密码" autocomplete="off" value="'+user.adminPassword+'" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '       </div>\n' +
                '    </div>\n' +

                //确认新密码
                '    <div class="layui-form-item">\n' +
                '      <label class="layui-form-label">确认密码</label>\n' +
                '      <div class="layui-input-block">\n' +
                '        <input type="password" id="newConfPwd" placeholder="请确认密码" autocomplete="off" value="'+user.adminPassword+'" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '      </div>\n' +
                '    </div>\n' +

                //修改昵称
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">昵称</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="text" id="adminNickname"  autocomplete="off" placeholder="请输入昵称" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="'+user.adminNickname+'">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改真名
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">真实姓名</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input type="text" id="adminname"  autocomplete="off" placeholder="请输入真实姓名" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" value="'+user.adminName+'">\n' +
                '        </div>\n' +
                '    </div>\n' +

                //修改手机号
                '    <div class="layui-form-item">\n' +
                '        <label class="layui-form-label">手机号</label>\n' +
                '        <div class="layui-input-block">\n' +
                '            <input class="layui-input" id="adminTelephone" type="text" name="telephone" placeholder="请输入手机号" autocomplete="off" style="width: 250px;" value="'+user.adminTel+'" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
                '        </div>\n' +
                '    </div>\n' +

                '</form>' ,
            btn: ['确定', '取消'],
            btnAlign: 'c',
            shade: 0.5,
            title: "修改个人信息",
            btn1 : function () {
                editTeacher(user, adminPhoto);
                return false;
            },
            btn2 : function () {
                layer.closeAll();
            }
        });
    }

    layui.use('form', function(){
        var formAdmin = layui.form;
        formAdmin.render();
    });

    layui.use('upload', function() {
        var $ = layui.jquery, upload = layui.upload;
        //普通图片上传使用layui上传图片\n' +
        uploadInstAdmin = upload.render({
            elem: '#uploadAdmin'
            , url: '../../../file/uploadImg'
            , accept : 'images'
            , multiple : false
            , auto : false
            , field : 'file'
            , choose: function (obj) {
                //预读本地文件示例，不支持ie8\n' +
                obj.preview(function (index, file, result) {
                    $('.layui-upload').css("height", "10%");
                    $('.layui-upload').css("marginButtom", "10px");
                    $('#adminDemo1').attr('src', result);
                    $('#adminDemo1').css("maxWidth", "10%");
                    $('#adminDemo1').css("marginRight", "10px");
                    adminPhoto = result;
                });
            }
            , done: function (res) {
                //如果上传失败
                if (res.status == "error") {
                    return layer.msg('图片上传失败');
                }
                //上传成功
                else
                {
                    adminPhoto = res.src;
                    $('#adminDemo1').attr('src', adminPhoto);
                    updateAdmin(user.adminAccount, adminPhoto, $('#newPwd').val(),$('#adminNickname').val(), $('#adminname').val(), $('#adminTelephone').val(),$('.adminState').find('.layui-form-radioed').find('div').text());
                }
            }
            , error: function () {
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">头像上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function () {
                    uploadInstAdmin.upload();
                });
            }
        });
    });

}
//对输入修改信息的判断
function editAdmin() {
    var user = arguments[0];
    var photo = arguments[1];

    var oldPwd = $('#oldPwd').val();
    var newPwd = $('#newPwd').val();
    var newConfPwd = $('#newConfPwd').val();
    var nickname = $('#adminNickname').val();
    var name = $('#adminname').val();
    var telephone = $('#adminTelephone').val();
    var state = $('.adminState').find('.layui-form-radioed').find('div').text();
    //console.log(name);

    var reg1 = /^.{5,16}$/; //密码5-16位字符组合
    var reg2 = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码
    var reg4 = /^[\u4e00-\u9fa5]{2,15}$/;  //2-15个中文

    if(oldPwd == "" || oldPwd == null){
        layer.tips("原密码不能为空！" , "#oldPwd");
    }
    else if(oldPwd != user.adminPassword){
        layer.tips("原密码不正确！", "#oldPwd");
    }
    else if(newPwd == "" || newPwd == null){
        layer.tips("新密码不能为空！", "#newPwd");
    }
    else if(!reg1.test(newPwd)){
        layer.tips("新密码不合法，5-16位字符组合", "#newPwd");
    }
    else if(newConfPwd == "" || newConfPwd == null){
        layer.tips("确认密码不能为空！", "#newConfPwd");
    }
    else if(newConfPwd != newPwd){
        layer.tips("两次输入的新密码不一样，请重新输入！", "#newConfPwd");
    }
    else if(nickname == "" || nickname == null){
        layer.tips("昵称不能为空！", "#adminNickname");
    }
    else if(name == "" || name == null){
        layer.tips("真实姓名不能为空！", "#adminname");
    }
    else if(!reg4.test(name)){
        layer.tips("真实姓名不合法,2-15位中文", "#adminname");
    }
    else if(telephone == "" || telephone == null){
        layer.tips("手机号不能为空！", "#adminTelephone");
    }
    else if(!reg2.test(telephone)){
        layer.tips("请注意手机号格式！", "#adminTelephone");
    }
    else if(state == "" || state == null ){
        layer.tips("请选择管理员类别！", "#adminState");
    }
    else if(photo == "" || photo == null){
        updateAdmin(user.adminAccount, user.adminImage, newPwd, nickname, name, telephone, state);
    }
    else if(user.adminImage != photo){
        uploadInstAdmin.upload();
    }
    else{
        updateAdmin(user.adminAccount, user.adminImage, newPwd, nickname, name, telephone, state);
    }
}
function editTeacher() {
    var user = arguments[0];
    var photo = arguments[1];

    var oldPwd = $('#oldPwd').val();
    var newPwd = $('#newPwd').val();
    var newConfPwd = $('#newConfPwd').val();
    var nickname = $('#adminNickname').val();
    var name = $('#adminname').val();
    var telephone = $('#adminTelephone').val();
    var state="教师";

    var reg1 = /^.{5,16}$/; //密码5-16位字符组合
    var reg2 = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码
    var reg4 = /^[\u4e00-\u9fa5]{2,15}$/;  //2-15个中文

    if(oldPwd == "" || oldPwd == null){
        layer.tips("原密码不能为空！" , "#oldPwd");
    }
    else if(oldPwd != user.adminPassword){
        layer.tips("原密码不正确！", "#oldPwd");
    }
    else if(newPwd == "" || newPwd == null){
        layer.tips("新密码不能为空！", "#newPwd");
    }
    else if(!reg1.test(newPwd)){
        layer.tips("新密码不合法，5-16位字符组合", "#newPwd");
    }
    else if(newConfPwd == "" || newConfPwd == null){
        layer.tips("确认密码不能为空！", "#newConfPwd");
    }
    else if(newConfPwd != newPwd){
        layer.tips("两次输入的新密码不一样，请重新输入！", "#newConfPwd");
    }
    else if(nickname == "" || nickname == null){
        layer.tips("昵称不能为空！", "#adminNickname");
    }
    else if(name == "" || name == null){
        layer.tips("真实姓名不能为空！", "#adminname");
    }
    else if(!reg4.test(name)){
        layer.tips("真实姓名不合法,2-15位中文", "#adminname");
    }
    else if(telephone == "" || telephone == null){
        layer.tips("手机号不能为空！", "#adminTelephone");
    }
    else if(!reg2.test(telephone)){
        layer.tips("请注意手机号格式！", "#adminTelephone");
    }
    else if(photo == "" || photo == null){
        updateAdmin(user.adminAccount, user.adminImage, newPwd, nickname, name, telephone, state);
    }
    else if(user.adminImage != photo){
        uploadInstAdmin.upload();
    }
    else{
        updateAdmin(user.adminAccount, user.adminImage, newPwd, nickname, name, telephone, state);
    }
}
//执行修改操作
function updateAdmin(username, photo, newPwd, nickname, name, telephone, state){
   
    if (state == "普通管理员"){
        state = 1
    }
    else if(state == "教师"){
        state = 2
    }
    else if(state == "超级管理员"){
        state = 0
    }

    //console.log(username, photo, newPwd, nickname, name, telephone, state)

    $.ajax({
        url : '../../../admin/updateSelf', //管理员修改自己的信息
        type : 'post',
        data : {"adminAccount" : username, 
                "adminImage" : photo, 
                "adminPassword" : newPwd, 
                "adminNickname" : nickname, 
                "adminTel" : telephone,
                "adminState" : state,
                "adminName" : name},
        scriptType : 'utf-8',
        success : function (result) {
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "更新成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                        window.location.reload();
                    }
                });
            }
            else{
                layer.msg(result.message);
            }
        } ,
        error : function () {
            layer.msg('请求失败，请重试！');
        }
    });
}
//管理员退出登录
function signOut() {
    $.ajax({
        url: '../../../admin/back', //管理员退出登录
        type: 'post',
        scriptType: 'utf-8',
        success: function (result) {
            if (result.status == "success") {
                location.href="../login/login.html";
            }
            else {
                layer.msg(result.message);
            }
        },
        error: function () {
            layer.msg('请求失败，请重试！');
        }
    });
}
/*//管理员修改密码
function updatePwd() {
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['500px', '300px'],
        content:
            '<form class="layui-form" method="post" enctype="multipart/form-data" style="margin-top: 30px;">\n' +
            '    <div class="layui-form-item">\n' +
            '       <label class="layui-form-label">原密码</label>\n' +
            '       <div class="layui-input-block">\n' +
            '          <input type="password" name="oldPwd" id="oldPwd" placeholder="请输入新密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '       </div>\n' +
            '    </div>\n' +'    <div class="layui-form-item">\n' +
            '       <label class="layui-form-label">新密码</label>\n' +
            '       <div class="layui-input-block">\n' +
            '          <input type="password" name="newPwd" id="newPwd" placeholder="请输入新密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()">\n' +
            '       </div>\n' +
            '    </div>\n' +
            '    <div class="layui-form-item">\n' +
            '      <label class="layui-form-label">确认密码</label>\n' +
            '      <div class="layui-input-block">\n' +
            '        <input type="password" id="newConfPwd" placeholder="请确认密码" autocomplete="off" class="layui-input" style="width: 250px;" onchange="inputLimit()" onkeydown="inputLimit()" onkeyup="inputLimit()" onblur="passwordLimit()">\n' +
            '      </div>\n' +
            '    </div>\n' +
            '</form>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "修改密码",
        btn1 : function () {
            updatePassword();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}
//执行更新密码的操作
function updatePassword() {
    var oldPwd = $("#oldPwd").val();
    var newPwd = $("#newPwd").val();
    var newConfPwd = $("#newConfPwd").val();
    console.log(oldPwd,newConfPwd);
    if(oldPwd == null || oldPwd == ""){
        layer.msg("原密码不能为空！");
    }
    else if(newPwd == null || newPwd == ""){
        layer.msg("新密码不能为空！");
    }
    else if(newConfPwd == null || newConfPwd == ""){
        layer.msg("请确认密码！");
    }
    else if(newPwd != newConfPwd){
        layer.msg("两次输入的新密码不一样，请重新输入！");
    }
    else{
        $.ajax({
            url : 'user_updatePassword.action',
            type : 'post',
            data : {"password" : oldPwd, "telephone" : newConfPwd},
            scriptCharset : 'utf-8',
            success : function (result) {
                console.log(result);
                if(result.message == null){
                    layer.msg("修改成功！")
                    window.location.reload();
                }else{
                    layer.msg(result.message);
                }
            },
            error : function () {
                console.log("请求Action失败！");
            }
        });
    }
}
//对确认密码的判断
function passwordLimit(){
    var input = window.event.target;
    input.value = input.value.substring(0,100); if(window.event.keyCode ==13) return false;
    var newConfPwd = input.value;
    var newPwd = $('#newPwd').val();
    if(newConfPwd.toString() != newPwd.toString()){
        layer.tips('两次密码不一样', '#newConfPwd');
    }
}*/