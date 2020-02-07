
/*var tips_list = [{"tipsId" : 1,
                  "competitionId":1.1,
                  "publisher":"骆闻舟",
                  "time":"2017.5.8",
                  "content":"这是第一条通知的内容，测试使用数据这是第一条通知的内容，"},
                 {"tipsId" : 2,
                  "competitionId":"1.1",
                  "publisher":"沈巍",
                  "time":"2018.6.13",
                  "content":"这是第二条通知的内容，测试使用数据这是第二条通知的内容，"},
                 {"tipsId" : 3,
                  "competitionId":1.1,
                  "publisher":"祁醉",
                  "time":"2018.12.8",
                  "content":"这是第三条通知的内容，测试使用数据这是第三条通知的内容，"}];*/
var tips_list;
var tip_content;

var url=location.href;
var index=url.lastIndexOf("\=");
id=url.substring(index+1,url.length);
//console.log(id);
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
    //fillTips();     //测试完毕改成getTips();！！！！！
    getTips();
};


function getTips() {
     $.ajax({
        url : '../../../tips/listTipsByCompetitionId', //得到某一未结束赛事的通知列表
        data: {"competitionId" : id},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
           if(result.status =="success"){
               tips_list = result.tipsList;
               fillTips();
           }
           else{
               layer.msg(result.message);
           }
        },
        error : function () {
            layer.msg("请求通知列表失败！");
        }
    });
}

function fillTips() {
    var tbody = document.getElementsByTagName('tbody')[0];
    $('tbody').html("");

    for (var i = 0; i < tips_list.length; ++i){
        var tip = tips_list[i];
        //console.log(announcement);
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i + 1;
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.style.textAlign = "center";
        td2.innerText = tip.publisher;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.style.textAlign = "center";
        td3.innerText = tip.time;
        td3.style.wordWrap = "break-word";
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.innerText = tip.content;
        td4.style.wordWrap = "break-word";
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}

function open_add_tip() {
    layer.open({
        type: 1,
        offset: 'auto',
        skin: 'layui-layer-lan',
        id: 'layerDemo1', //防止重复弹出
        area: ['600px', '320px'],
        content:
        '<form class="layui-form" action="" style="margin:50px 0 0 5%; font-size:15px">\n' +
                 //公告内容
            '    <div class="layui-form-item">\n' +
            '        <label class="layui-form-label">通知内容</label>\n' +
            '        <div class="layui-input-block">\n' +
            '           <textarea class="tcp_content layui-textarea" placeholder="请输入通知内容"\n' +
            '                     style="width: 80%; height: 130px; resize:none"\n' +
            '                     onchange="textarea_fun()" onkeydown="textarea_fun()" onkeyup="textarea_fun()"></textarea>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</form>\n' +
            '<script>\n' +
            'layui.use(\'form\', function(){\n' +
            '  var form = layui.form;\n' +
            '  form.render();\n' +
            '});' +
            '</script>',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: 0.5,
        title: "添加通知",
        btn1 : function () {
            add_tip();
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function add_tip() {

    tip_content = $('.tcp_content').val();

    if(tip_content == null || tip_content == ""){
        layer.tips("内容不能为空！", ".tcp_content");
    }
    else{
        add_Tip(id,tip_content);
    }
}

function add_Tip(id,content) {
    //console.log(id)
    $.ajax({
        url : '../../../tips/insertTips', //通知发布
        type : 'post',
        data : {"competitionId" : id, "content" : content},
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "发布成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "发布通知",
                    yes: function () {
                        layer.closeAll();
                    }
                });
                getTips();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg('请求发布失败！');
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

Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}