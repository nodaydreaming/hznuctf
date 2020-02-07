/*var adminList = [{
                 "adminAccount" : "zyilim",
                 "adminPassword" :"123456",
                 "adminTel" : "15990832293",
                 "adminImage" : "ss",
                 "adminNickname" : "lwz",
                 "adminState" : 0,
                 "adminName" : "Zzz"},
                 {
                 "adminAccount" : "ndeoeoa",
                 "adminPassword" :"123456",
                 "adminTel" : "15990832258",
                 "adminImage" : "ss",
                 "adminNickname" : "lwz",
                 "adminState" : 2,
                 "adminName" : "Zzz"},
                 {
                 "adminAccount" : "siijdijdw",
                 "adminPassword" :"123456",
                 "adminTel" : "17176592133",
                 "adminImage" : "ss",
                 "adminNickname" : "lwz",
                 "adminState" : 1,
                 "adminName" : "Zzz"}]

var loginAdmin = {"adminAccount" : "zyilim",
                 "adminPassword" :"123456",
                 "adminTel" : "15990832293",
                 "adminImage" : "ss",
                 "adminNickname" : "lwz",
                 "adminState" : 0,
                 "adminName" : "Zzz"}*/


var adminList;
var loginAdmin;

window.onload = function () {
    // 此ajax不适用于main.html页面获取管理员信息
    $.ajax({
        url : '../../../admin/getAdminMap',   //获取管理员个人信息
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            // console.log(result);
            loginAdmin=result.loginAdmin;
            //设置登陆用户的昵称
            if(loginAdmin.adminNickname != null){
                ($('.layui-nav-img')[0].parentNode).childNodes[2].data = loginAdmin.adminNickname;
                //<img src="../images/user_default.jpg" class="layui-nav-img">我
                //parentNode 属性可返回某节点的父节点
                //childNodes 属性返回节点的子节点集合
            }
            //设置登陆用户的头像
            if(loginAdmin.adminImage != null){
                $('.layui-nav-img').attr("src", loginAdmin.adminImage);
                //把头像的src属性改成新头像的src
            }
            getAdmins();
        },
        error : function () {
            layer.msg("请求失败！");
        }
    });

     //filladmins();
};

function getAdmins() {
    $.ajax({
        url : '../../../admin/listAdmin',  //获得所有管理员列表
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.adminList != null){
               filladmins(result.adminList);
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求管理员列表失败！");
        }
    });
}

function filladmins() {
    adminList = arguments[0];
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");

    for(var i = 0; i < adminList.length; ++i){
        var admin0 = adminList[i];
        var type = "";
        if(admin0.adminState == 1){
            type = "普通管理员";
        }
        else if(admin0.adminState == 2){
            type = "教师";
        }
        else if(admin0.adminState == 0){
            type = "超级管理员";
        }
        var tr = document.createElement('tr');
        //创建元素

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i + 1;
        tr.appendChild(td1);    
        //插入元素

        var td2 = document.createElement('td');
        td2.style.textAlign = "center";
        td2.innerText = admin0.adminAccount;
        td2.style.wordWrap = "break-word";
        //自动换行
        tr.appendChild(td2);

        var td7 = document.createElement('td');
        td7.style.textAlign = "center";
        td7.innerText = admin0.adminName;
        td7.style.wordWrap = "break-word";
        //自动换行
        tr.appendChild(td7);

        var td3 = document.createElement('td');
        td3.style.textAlign = "center";
        td3.innerText = admin0.adminNickname;
        td3.style.wordWrap = "break-word";
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.style.textAlign = "center";
        td4.innerText = admin0.adminTel;
        td4.style.wordWrap = "break-word";
        tr.appendChild(td4);

        var td6 = document.createElement('td');
        td6.style.textAlign = "center";
        td6.innerText = type;
        td6.style.wordWrap = "break-word";
        tr.appendChild(td6);

        var td5 = document.createElement('td');
        //console.log(loginAdmin.adminState);
        if(loginAdmin.adminState == 0){
            var a1 = document.createElement('a');
            a1.id = "editProblem" + (i+1);
            a1.className = "layui-btn layui-btn-normal layui-btn-xs";
            var i1 = document.createElement('i');
            i1.className = "layui-icon layui-icon-edit";
            a1.appendChild(i1);
            a1.innerHTML = a1.innerHTML + "重置密码";
            a1.onclick = reset_pwd;
            td5.appendChild(a1);

            var a2 = document.createElement('a');
            a2.id = "delAdmin" + (i+1);
            a2.className = "layui-btn layui-btn-danger layui-btn-xs";
            var i2 = document.createElement('i');
            i2.className = "layui-icon layui-icon-delete";
            a2.appendChild(i2);
            a2.innerHTML = a2.innerHTML + "删除";
            a2.onclick = delAdmin;
            td5.style.textAlign = "center";
            td5.appendChild(a2);
        }
        else if(loginAdmin.adminState == 1 && admin0.adminState == 2){

            var a1 = document.createElement('a');
            a1.id = "editProblem" + (i+1);
            a1.className = "layui-btn layui-btn-normal layui-btn-xs";
            var i1 = document.createElement('i');
            i1.className = "layui-icon layui-icon-edit";
            a1.appendChild(i1);
            a1.innerHTML = a1.innerHTML + "重置密码";
            a1.onclick = reset_pwd;
            td5.appendChild(a1);

            var a2 = document.createElement('a');
            a2.id = "delAdmin" + (i+1);
            a2.className = "layui-btn layui-btn-danger layui-btn-xs";
            var i2 = document.createElement('i');
            i2.className = "layui-icon layui-icon-delete";
            a2.appendChild(i2);
            a2.innerHTML = a2.innerHTML + "删除";
            a2.onclick = delAdmin;
            td5.style.textAlign = "center";
            td5.appendChild(a2);
        }
        tr.appendChild(td5);
        tbody.appendChild(tr);
    }
}

function reset_pwd(){
    var tr = this.parentNode.parentNode;//tr
    var num = tr.childNodes[0].innerText;//把管理员的序号赋值给num
    var admin0 = adminList[num-1];
    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定重置密码为 123456 吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "重置密码",
        btn1 : function () {
            resetPwd(admin0);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function resetPwd(){
    var username = arguments[0].adminAccount;
    $.ajax({
        url : '../../../admin/reset', //重置密码
        type : 'post',
        data : {"adminAccount" : username},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success"){
                console.log($("#test"));
                $("#test").html("123");
                layer.open({
                    type: 1,
                    offset: 'auto', 
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "重置成功！" + '</div>',
                    btn: '确定',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes : function () {
                        layer.closeAll();
                    }
                });
                getAdmins();
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("重置失败！");
        }
    });
}

function delAdmin() {
    var tr = this.parentNode.parentNode;
    var num = tr.childNodes[0].innerText;
    var admin0 = adminList[num-1];
    layer.open({
        type: 1,
        offset: 'auto', 
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + "确定删除管理员 <b>" + admin0.adminAccount +"</b> 吗？" + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除管理员",
        btn1 : function () {
            deladmin(admin0);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function deladmin() {
    var username = arguments[0].adminAccount;
    $.ajax({
        url : '../../../admin/delete', //删除管理员
        type : 'post',
        data : {"adminAccount" : username},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success"){
                layer.open({
                    type: 1,
                    offset: 'auto', 
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "删除成功！" + '</div>',
                    btn: '确定',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes : function () {
                        layer.closeAll();
                    }
                });
                getAdmins();
            }
            else {
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("删除失败！");
        }
    });
}