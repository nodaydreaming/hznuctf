/*var highlight_list = [{"highlightId" : 1,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/jr.jpg",
                       "imageIntro" : "第一张图片文字介绍",
                       "forGrade" : 0},

                      {"highlightId" : 2,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/zyl.jpg",
                       "imageIntro" : "第二张图片文字介绍",
                       "forGrade" : 0},

                       {"highlightId" : 3,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/sms.jpg",
                       "imageIntro" : "第三张图片文字介绍",
                       "forGrade" : 0},

                       {"highlightId" : 4,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/sms.jpg",
                       "imageIntro" : "第四张图片文字介绍",
                       "forGrade" : 0},
                       
                       {"highlightId" : 5,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/zyl.jpg",
                       "imageIntro" : "第五张图片文字介绍",
                       "forGrade" : 0},
                       
                       {"highlightId" : 6,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/zyl.jpg",
                       "imageIntro" : "第六张图片文字介绍",
                       "forGrade" : 0},
                       
                       {"highlightId" : 7,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/jr.jpg",
                       "imageIntro" : "第七张图片文字介绍",
                       "forGrade" : 0},

                       {"highlightId" : 7,
                       "competitionId" : 1.1,
                       "competitionTitle" : "第一场比赛第一场比赛第一场比赛",
                       "highlightIntro" : "第一场比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾比赛的精彩回顾",
                       "image" : " ../images/jr.jpg",
                       "imageIntro" :"" ,
                       "forGrade" : 1},
                       ]*/

var highlight_list, highlight;
var highlight_intro, photo, highlight_imageintro, highlight_forGrade;

var url=location.href;
var index=url.lastIndexOf("\=");
competitionid=url.substring(index+1,url.length);
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
    //fillhighlight();     //测试完毕改成get_highlight();！！！！！
    get_highlight();
};

function get_highlight(){
    $.ajax({
        url : '../../../Highlight/queryByCompetitionId',
        data: {"competitionId" : competitionid},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.status =="success"){
                highlight_list = result.highlightList;
                fillhighlight();
            }
            else{
                layer.msg(result.message);
            }
        },
        error : function () {
            layer.msg("请求精彩瞬间列表失败！");
        }
    });
}



function fillhighlight(){

    for(var i = 0; i < highlight_list.length; ++i){
        j=i+1;
        highlight = highlight_list[i];
        if (highlight.forGrade == 0){
            type="否"
        }
        else if (highlight.forGrade == 1){
            type="是"
        }

        var content = '<tr>'+
            '    <td style="text-align: center;">'+ j +' </td>'+
            '    <td style="text-align: center; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"> '+ highlight.highlightIntro+'  </td>'+

            '    <td style="text-align: center; overflow-wrap: break-word;">  '+
            '        <img src="'+ highlight.image+'" style="width:60px;height:60px">'+
            '    </td>'+

            '    <td style="overflow-wrap: break-word; "> '+ highlight.imageIntro+' </td>'+
            '    <td style="text-align: center; overflow-wrap: break-word; "> '+ type+' </td>'+

            '    <td style="text-align: center; padding : 0px;"> '+
            '        <a id="' +j+ '" class="layui-btn layui-btn-danger layui-btn-xs" onclick = "del_highlight('+ highlight.highlightId+')";>'+
            '            <i class="layui-icon layui-icon-delete"></i>'+
            '            "删除"'+
            '        </a>'+
            '    </td>'+
            '</tr>'
        $("tbody").append(content)

        layui.use('form', function(){
            var form = layui.form;
            form.render();

        });
    }
}

function open_add_highlight(){

    if(highlight_list == "" || highlight_list == null){

        layer.open({
            type: 1,
            offset: 'auto',
            skin: 'layui-layer-lan',
            id: 'layerDemo1', //防止重复弹出
            area: ['800px', '500px'],
            content:'<form class="layui-form" action="" id="updateContest" style="margin:50px 0 0 5%; font-size:15px">\n' +

                //精彩回顾介绍
                '<div class="layui-form-item layui-form-text">\n' +
                '     <label class="layui-form-label">精彩回顾介绍</label>\n' +
                '     <div class="layui-input-block">\n' +
                '     <textarea name="desc" id="highlight_intro" placeholder="请输入精彩回顾介绍" class="layui-textarea" style="width: 80%;"></textarea>\n' +
                '     </div>\n' +
                '</div>\n' +

                //图片介绍
                '<div class="layui-form-item" style="width:100%">\n' +
                '    <label class="layui-form-label">图片介绍</label>\n' +
                '    <div class="layui-input-block">\n' +
                '    <input type="text" id="highlight_imageintro" autocomplete="off" placeholder="请输入图片介绍，30字以内" maxlength = "30" required class="layui-input" style="width: 80%;"">\n' +
                '    </div>\n' +
                '</div>\n' +

                //是否是成绩图片
                '<div class="layui-form-item" id="highlight_forGrade">\n' +
                '    <label class="layui-form-label">是否是成绩图片</label>\n' +
                '    <input name="highlight_forGrade" title="是" type="radio" value="1" id="1">\n' +
                '    <div class="layui-unselect layui-form-radio layui-form-radiod">\n' +
                '        <i class="layui-anim layui-icon"></i>\n' +
                '        <div>是</div>\n' +
                '    </div>\n' +
                '    <input name="highlight_forGrade" title="否" type="radio" value="0" id="0" checked>\n' +
                '    <div class="layui-unselect layui-form-radio">\n' +
                '        <i class="layui-anim layui-icon"></i>\n' +
                '        <div>否</div>\n' +
                '    </div>\n' +
                '</div> \n' +

                '        <div class="layui-form-item layui-upload">\n' +
                '            <label class="layui-form-label">照&nbsp;&nbsp;&nbsp;片</label>\n' +
                '            <div class="layui-upload-list">\n' +
                '                <img class="layui-upload-img" id="demo1" style="float:left;" src="">\n' +
                '                <div style="float:left;">\n' +
                '                    <button type="button" class="layui-btn" id="upload">上传图片</button>\n' +
                '                    <p id="demoText" style="width: 100px; margin-top: 20px"></p>\n' +
                '                </div>\n' +
                '           </div>\n' +
                '        </div>\n' +
                '</form>' ,
            btn: ['确定', '取消'],
            btnAlign: 'c',
            shade: 0.5,
            title: "添加精彩瞬间图片",
            btn1 : function () {
                check_highlight();
                return false;
            },
            btn2 : function () {
                layer.closeAll();
            }
        });
    }

    else if(highlight_list != "" || highlight_list != null){

        layer.open({
            type: 1,
            offset: 'auto',
            skin: 'layui-layer-lan',
            id: 'layerDemo1', //防止重复弹出
            area: ['800px', '500px'],
            content:'<form class="layui-form" action="" id="updateContest" style="margin:50px 0 0 5%; font-size:15px">\n' +

                //精彩回顾介绍
                '<div class="layui-form-item layui-form-text">\n' +
                '     <label class="layui-form-label">精彩回顾介绍</label>\n' +
                '     <div class="layui-input-block">\n' +
                '     <textarea name="desc" id="highlight_intro" placeholder="请输入精彩回顾介绍" class="layui-textarea" style="width: 80%;">'+ highlight.highlightIntro +'</textarea>\n' +
                '     </div>\n' +
                '</div>\n' +

                //图片介绍
                '<div class="layui-form-item" style="width:100%">\n' +
                '    <label class="layui-form-label">图片介绍</label>\n' +
                '    <div class="layui-input-block">\n' +
                '    <input type="text" id="highlight_imageintro" autocomplete="off" placeholder="请输入图片介绍，30字以内" maxlength = "30" required class="layui-input" style="width: 80%;"">\n' +
                '    </div>\n' +
                '</div>\n' +

                //是否是成绩图片
                '<div class="layui-form-item" id="highlight_forGrade">\n' +
                '    <label class="layui-form-label">是否是成绩图片</label>\n' +
                '    <input name="highlight_forGrade" title="是" type="radio" value="1" id="1">\n' +
                '    <div class="layui-unselect layui-form-radio layui-form-radiod">\n' +
                '        <i class="layui-anim layui-icon"></i>\n' +
                '        <div>是</div>\n' +
                '    </div>\n' +
                '    <input name="highlight_forGrade" title="否" type="radio" value="0" id="0" checked>\n' +
                '    <div class="layui-unselect layui-form-radio">\n' +
                '        <i class="layui-anim layui-icon"></i>\n' +
                '        <div>否</div>\n' +
                '    </div>\n' +
                '</div> \n' +

                '        <div class="layui-form-item layui-upload">\n' +
                '            <label class="layui-form-label">照&nbsp;&nbsp;&nbsp;片</label>\n' +
                '            <div class="layui-upload-list">\n' +
                '                <img class="layui-upload-img" id="demo1" style="float:left;" src="">\n' +
                '                <div style="float:left;">\n' +
                '                    <button type="button" class="layui-btn" id="upload">上传图片</button>\n' +
                '                    <p id="demoText" style="width: 100px; margin-top: 20px"></p>\n' +
                '                </div>\n' +
                '           </div>\n' +
                '        </div>\n' +

                '</form>' ,
            btn: ['确定', '取消'],
            btnAlign: 'c',
            shade: 0.5,
            title: "添加精彩瞬间图片",
            btn1 : function () {
                check_highlight();
                return false;
            },
            btn2 : function () {
                layer.closeAll();
            }
        });
    }


    layui.use('upload', function() {
        var $ = layui.jquery, upload = layui.upload;
        //普通图片上传使用layui上传图片
        //创建一个上传组件
        uploadInst = upload.render({
            elem: '#upload'  //绑定元素(上传图片的按钮)
            , url: '../../../file/uploadHighlight'
            , accept : 'images'
            , multiple : false
            , auto : false
            , field : 'file'
            , choose: function (obj) {
                //预读本地文件示例，不支持ie8 +
                obj.preview(function (index, file, result) {
                    //console.log(index); //得到文件索引
                    //console.log(file); //得到文件对象
                    //console.log(result); //得到文件base64编码，比如图片
                    $('.layui-u pload').css("height", "10%");
                    $('.layui-upload').css("height", "10%");
                    $('.layui-upload').css("marginButtom", "10px");
                    $('#demo1').attr('src', result); //图片链接（base64;
                    $('#demo1').css("maxWidth", "10%");
                    $('#demo1').css("marginRight", "10px");
                    photo = result;
                });
            }
            , done: function (res) {
                //如果上传失败
                if (res.status == "error") {
                    return layer.msg('上传失败');
                }
                //上传成功
                else
                {
                    photo = res.src;
                    $('#demo1').attr('src', photo);
                    uploadHighlight(competitionid, highlight_intro, highlight_imageintro, highlight_forGrade, photo);
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

    layui.use('form', function(){
        var form = layui.form;
        form.render();
        form.verify();
    });

}

function check_highlight(){
    highlight_intro = $("#highlight_intro").val();
    highlight_imageintro = $("#highlight_imageintro").val();
    highlight_forGrade = $("input[name='highlight_forGrade']:checked").val();

    if(highlight_forGrade == 0){
        //非空判断
        if(highlight_intro === "" || highlight_intro == null){
            layer.msg("精彩回顾不能为空！");
        }
        else if(highlight_imageintro === "" || highlight_imageintro == null){
            layer.msg("精彩回顾图片介绍不能为空！");
        }
        else if(photo == "" || photo == null){
            layer.msg("图片不能为空！");
        }
        else {
            uploadInst.upload();
        }
    }
    else if(highlight_forGrade == 1){
        //非空判断
        if(highlight_intro == "" || highlight_intro == null){
            layer.msg("精彩回顾不能为空！");
        }
        else if(photo == "" || photo == null){
            layer.msg("成绩图片不能为空！");
        }
        else {
            uploadInst.upload();
        }
    }
}

function uploadHighlight(competitionid, highlight_intro, highlight_imageintro, highlight_forGrade, photo){

    /*   console.log(competitionid);
       console.log(highlight_intro);
       console.log(highlight_imageintro);
       console.log(highlight_forGrade);
   */
    $.ajax({
        url : '../../../Highlight/insert',
        type:'post',
        data :{"competitionId": competitionid,
            "highlightIntro": highlight_intro,
            "image": photo,
            "imageIntro": highlight_imageintro,
            "forGrade": highlight_forGrade},
        scriptCharset : 'utf-8',
        success : function(result){
            if(result.status == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "添加成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                        window.location.reload();
                    }
                });
                $('#highlight_imageintro').val("");
                $('#demo1').removeAttr("src");  //removeAttr() 方法从被选元素中移除属性
            }
            else{
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + result.message + '</div>',
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

        },
        error : function(){
            layer.msg('请求添加精彩瞬间失败');
        }
    });
}


function del_highlight(id){
    //console.log(id);

    layer.open({
        type: 1,
        offset: 'auto',
        id: 'layerDemo1', //防止重复弹出
        content: '<div style="padding: 20px 50px;">' + '确定删除该精彩瞬间图片吗？' + '</div>',
        btn: ['确定', '取消'],
        btnAlign: 'c', //按钮居中
        shade: 0.5, //不显示遮罩
        title: "删除精彩瞬间",
        btn1 : function () {
            delHighlight(id);
            return false;
        },
        btn2 : function () {
            layer.closeAll();
        }
    });
}

function delHighlight(id){
    /*console.log(id);
    console.log(competitionid)*/
    $.ajax({
        url : '../../../Highlight/deleteOne',
        data : {"highlightId" : id },
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
                        window.location.reload();
                    }
                });
                get_highlight();
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

/*        var tr = document.createElement('tr');
        //序号
        var td1 = document.createElement('td');
        td1.style.textAlign = "center";
        td1.innerText = i+1;
        tr.appendChild(td1);

        //队伍名称
        var td2 = document.createElement('td');
        td2.style.textAlign = "center";
        td2.innerText = teamcompetitor.team;
        td2.style.wordWrap = "break-word";
        tr.appendChild(td2);

        //选手姓名
        var td4 = document.createElement('td');
        td4.style.textAlign = "center";
        td4.innerText = teamcompetitor.name;
        td4.style.wordWrap = "break-word";
        tr.appendChild(td4);

        //操作
        var td7 = document.createElement('td');

        var div1 = document.createElement('div');
        div1.id = "editProblem" + (i+1);
        div1.className = "layui-form-item";

        var label = document.createElement('label');
        label.className = "layui-form-label";
        label.innerHTML = "开关";      
        div1.appendChild(label);

        var div2 = document.createElement('div');
        div2.className = "layui-input-block";

        var input = document.createElement('input');
        input.type = "checkbox";
        input.name = "switch";
        input.lay-skin="switch";
        div2.appendChild(input);
        div1.appendChild(div2);
        
/*        var a2 = document.createElement('a');
        a2.id = "delProblem" + (i+1);
        a2.className = "layui-btn layui-btn-danger layui-btn-xs";
        var i2 = document.createElement('i');
        i2.className = "layui-icon layui-icon-delete";
        a2.appendChild(i2);
        a2.innerHTML = a2.innerHTML + "删除";
        a2.onclick = del_teamcompetitor;
        td7.style.textAlign = "center";
        td7.appendChild(a2);
        tr.appendChild(td7);

        tbody.appendChild(tr);
    }*/

