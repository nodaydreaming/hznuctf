var loginUser = null;
var competitionId = null;
var teamId = null;
var banned = null;
var isfinish = null;
var acQuestionList = null;


var myType = new Array();
var allQuestion = new Array();
var answer = null;

var recordList = new Array();
var noticeList = new Array();
var scoreList = new Array();
var teamList = new Array();

var myChart = echarts.init(document.getElementById('radar'));
var myChart1 = echarts.init(document.getElementById('myrecord'));
var ws;


$.ajax ({
    url : '../../contest/getUserMap',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.loginUser == null) {
         	var txt = "请先登录！";
		    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
		    $('.ok').click(function(){
		        location.href = 'login.html';
		    });
        }
        else if(result.loginUser != null){
        	loginUser = result.loginUser;
        	competitionId = loginUser.competitionId;
        	teamId = loginUser.teamId;
        	title = loginUser.competitionTitle;
        	$(".title").html(title);

			countTime();

        	if(result.banned == 1){
        		banned = 1;
        	}
        	else if(result.banned == 0){
        		banned = 0;
	        }
	        if(result.isfinish == 1){
	        	isfinish = 1;
	        	$(".finish").html("本场比赛已结束")
	        }
	        else if(result.isfinish == 0){
	        	isfinish = 0;
	        	$(".finish").html("比赛进行中")
	        }
			//连接地址参数为ip地址
            var url = "ws://localhost:8080/hznuctf/websocket/"+loginUser.userId+"/"+competitionId+"/"+loginUser.teamId;
            ws = new WebSocket(url);

            //连接建立成功
            ws.onopen = function(){
            };
			//获得消息
            ws.onmessage = function(res){
                var result = JSON.parse(res.data);
                switch(result.message){
                    case "typeList":
                        typeList = result.datas;
                        getType();// 获得题目类型
                        break;
                    case "questionList":
                        questionList = result.datas;
                        getQuestion();
                        break;
                    case "acQuestionList":
                        acQuestionList = result.datas;
                        getRadar();
                        getQuestion();
                        break;
                    case "submitRecord":
                        recordList = result.datas;
                        submitRecord();
                        break;
                    case "noticeList":
                        noticeList = result.datas;
                        getNotice();
                        break;
                    case "scoreList":
                        scoreList = result.datas;
                        getBar();
                        break;
                    case "teamList":
                        teamList = result.datas;
                        myScore();
                        break;
                    case "Banned":
                    	var isBanned = result.datas;
                        getOut(isBanned);
                        break;
                    case "finish":
                        finish();
                        break;
                    case "BeSqueezed":
                        beSqueezed();
                        break;
                }

            };
        }
    },
    error : function () {
    }
});
// 判断是否登陆

function countTime() {
	//获取当前时间
	var date = new Date();
	var now = date.getTime();
	//设置截止时间
	var endDate = new Date(loginUser.end);
	var end = endDate.getTime();
	//时间差
	var leftTime = end-now;
	//定义变量 d,h,m,s保存倒计时的时间
	var d,h,m,s;
	if (leftTime>=0) {
		d = Math.floor(leftTime/1000/60/60/24);
		h = Math.floor(leftTime/1000/60/60%24);
		m = Math.floor(leftTime/1000/60%60);
		s = Math.floor(leftTime/1000%60);                   
	}
	//将倒计时赋值到div中
	document.getElementById("_d").innerHTML = d+"天";
	document.getElementById("_h").innerHTML = h+"时";
	document.getElementById("_m").innerHTML = m+"分";
	document.getElementById("_s").innerHTML = s+"秒";
	//递归每秒调用countTime方法，显示动态时间效果
	setTimeout(countTime,1000);
}

//日期转换
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds()
        //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function toDate(obj) {
    var date = new Date();
    date.setTime(obj.time);
    date.setHours(obj.hours);
    date.setMinutes(obj.minutes);
    date.setSeconds(obj.seconds);
    return date.format("yyyy-MM-dd hh:mm:ss"); //调用Date.prototype.format方法
}
function  toHoursAndMinutes(obj) {
    var date = new Date();
    date.setHours(obj.hours);
    date.setMinutes(obj.minutes);
    return date.format("hh:mm"); //调用Date.prototype.format方法
}

function beSqueezed(){
    $.ajax ({
        url : '../../contest/back',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            var txt = "您已在其他机器登录，如不是本人操作请联系管理员！";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
            $('.ok').click(function(){
                location.href = 'login.html';
            });
        },
        error : function () {
        }
    });
}

function getOut(isBanned){
    $.ajax ({
        url : '../../contest/back',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            var txt;
        	if(isBanned === "true") {
                txt = "您已被禁赛！请重新登录";
            }else{
        	    txt = '您已被解禁！请重新登录';
			}
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
            $('.ok').click(function(){
                location.href = 'login.html';
            });
        },
        error : function () {
        }
    });
}

function finish(){
    $.ajax ({
        url : '../../contest/back',
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            var txt = "比赛结束！";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
            $('.ok').click(function(){
                location.href = 'login.html';
            });
        },
        error : function () {
        }
    });
}

function getType(){
	$('.problemtype').html("");
	for(var i = 0 ; i < typeList.length ; i++){
		var content = 
		'<p class="'+typeList[i].questionType+'">'+
			'<a class="btn category">'+typeList[i].questionType+'</a><span id="'+typeList[i].questionType+'"></span>'+
		'</p>';
		$('.problemtype').append(content);
	}
}
// 题目类型


function getQuestion(){
    allQuestion.length = 0;
    for(var i = 0; i < typeList.length; i++){
        type = typeList[i].questionType;
        $('#'+type).html("");
        myType = questionList[type];
        for(var j = 0 ; j < myType.length; j++){
            allQuestion.push(myType[j]);
            types = myType[j].questionType;

            var content =
                '<a class="btn problem '+myType[j].questionId+'" onclick="getBody('+myType[j].questionId+')">'+myType[j].questionId+'</a>';
            $('#'+types).append(content);
            $('.'+myType[j].questionId).attr('disabled','true');
            $('.'+myType[j].questionId).removeAttr('onclick');

            if(myType[j].isUnlocked == 1){
                $('.'+myType[j].questionId).attr('onclick','getBody('+myType[j].questionId+')');
                $('.'+myType[j].questionId).removeAttr('disabled');
            }
        }
    }
    for(var i = 0; i < typeList.length; i++){
        type = typeList[i].questionType;
        myType = questionList[type];
        for(var j = 0 ; j < myType.length; j++){
            if(acQuestionList != null){
                if(acQuestionList.length > 0){
                    for(var k = 0; k < acQuestionList.length; k++){
                        if(acQuestionList[k].questionId == myType[j].questionId){
                            var content =
                                '<i class="fas fa-check" style="color: white">';
                            $('.'+myType[j].questionId).css("background-color","#000")
                            $('.'+myType[j].questionId).html(content);
                            $('.'+myType[j].questionId).attr('onclick','getBody('+myType[j].questionId+')');
                            $('.'+myType[j].questionId).removeAttr('disabled');
                            if(j+1 != myType.length){
                                s = j+1;
                                $('.'+myType[j+1].questionId).attr('onclick','getBody('+myType[j+1].questionId+')');
                                $('.'+myType[j+1].questionId).removeAttr('disabled');
                            }
                        }
                    }
                }
            }
        }
    }
}
// 题目

function getBody(questionId){
	for(var i = 0 ; i < allQuestion.length; i++){
		if(questionId == allQuestion[i].questionId){
			$('.questiontitle').html("");
			$('.introduce').html("");
			$('.form-inline').html("");
			$('.questiontitle').append(allQuestion[i].questionTitle);
			$('.introduce').append(allQuestion[i].questionBody);
			if(allQuestion[i].questionResources != ""){
				var resource1 = allQuestion[i].questionResources;
                var res1 = resource1.split(",");
                var resource2 = res1[0];
                var res2 = resource2.split("/");
				allQuestion[i].questionResources = res2[res2.length - 1];
				
				$('.annex').text('点击下载题目附件');
				$('.annex').attr('href', "/hznuctf/downloadResource?filename="+allQuestion[i].questionResources);
				$('.annex').attr('target', '');
			}
			else{
				$('.annex').attr('href', "http://"+allQuestion[i].questionLinks);
				$('.annex').text(allQuestion[i].questionLinks);
				$('.annex').attr('target', '_blank');
			}
			var content = 
			'<input type="text" class="answer form-control" id="answer" placeholder="请输入答案">'+
			'<a class="btn submitbtn" id="myBtn" onclick="submit('+questionId+')"><i class="fas fa-flag"></i></a>';
			$('.form-inline').append(content);

			answer = document.getElementById('answer');
			answer.addEventListener("keyup", function(event){
			    event.preventDefault();
			    if (event.keyCode === 13) {
			        document.getElementById("myBtn").click();
			    }
			});
		}
	}
}
// 点击题目填充具体信息

function submit(questionId){
	answer = document.getElementById('answer');
	id = competitionId;
	myAnswer = answer.value;
	var submitObj = {'submit':
		{'competitionId':id,'questionId':questionId,'answer':myAnswer}
	};
	var submitJSON = JSON.stringify(submitObj);
	if(isfinish == 1){
		var txt = "本场比赛已结束";
	    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
	    $('.ok').click(function(){
	    });
	}
	else{
		if(banned == 0){
			if(myAnswer.length == 0){
				var txt = "答案不能为空！";
			    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			    $('.ok').click(function(){
			    });
			}
			else{
				ws.send(submitJSON);
				var txt = "提交成功！";
			    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
			    $('.ok').click(function(){
			    });
			}	
		}
		else if(banned == 1){
			var txt = "您已被禁赛，无法提交答案！";
		    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
		    $('.ok').click(function(){
		        window.location.reload();
		    });
		}
	}
}
// 提交答案

function submitRecord(){
	$("#submit").html("");
	for(var i = 0 ; i < recordList.length; i++){
		var time = toHoursAndMinutes(recordList[i].answerTime);
		var content =
		'<tr>'+
			'<td style="border:none" class="userNickname" title='+recordList[i].userName+'>'+recordList[i].userName+'</td>'+
			'<td style="border:none">'+recordList[i].questionId+'</td>'+
			'<td style="border:none" class="flagcontent" title='+recordList[i].answerBody+'>'+recordList[i].answerBody+'</td>'+
			'<td style="border:none" id="'+i+'"><i class="fas fa-times" style="color: red"></i></td>'+
			'<td style="border:none">'+recordList[i].answerGetPoint+'</td>'+
			'<td style="border:none; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;" title="'+recordList[i].recordBody+'">'+recordList[i].recordBody+'</td>'+
		'</tr>'
		$("#submit").prepend(content);

		if(recordList[i].answerResult == 1){
			var check = '<i class="fas fa-check" style="color: green"></i>';
			$("#"+i).html(check);
		}
		
	}
}
// 提交记录

function getNotice(){
	$(".news").html("");
	if(noticeList.length == 0){
		var content = '<p class="nonews" style="font-weight: bolder;">暂无公告</p>';
		$(".news").append(content);
	}
	else{
		for(var i = 0 ; i < noticeList.length; i++){
			var time = toDate(noticeList[i].time);
			var news =
			'<p><span class="author">['+noticeList[i].publisher+']</span>'+"&nbsp;&nbsp;"+noticeList[i].content+'<span class="time"> ['+time+']</span></p>'
			$(".news").prepend(news);
		}
	}
}
// 获得通知

function getRadar(){
	var radarMax = [];
	var radarValue = [];
	var index;
	for(var i = 0; i < allQuestion.length; i++){
		radarMax.push({
            text:'Pro'+allQuestion[i].questionId+'',
            max: 600,
        });
        radarValue.push(0);
	}

    for(var k = 0 ; k < allQuestion.length; k++){
        for(var j = 0; j < acQuestionList.length; j++){
            if(allQuestion[k].questionId == acQuestionList[j].questionId){
                index = k;
                radarValue[index] = acQuestionList[j].answerGetPoint;
            }
        }
    }

	myChart.setOption({
		radar: [{
	        indicator: radarMax,
	        center: ['50%', '50%'], // 位置
	        radius: '70%', //大小
	        startAngle: 90,
	        splitNumber: 5,
	        shape: 'circle',
	        name: {
	            formatter: '{value}',
	            textStyle: {
	                color: '#00ccff', // 文字颜色
	                fontWeight:'bolder',
	                fontSize:'18',
	            }
	        },
	        splitArea: {
	            areaStyle: {
	                color: ['rgba(114, 172, 209, 0.1)',
	                    'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)',
	                    'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)'
	                ], //圆环颜色
	                shadowColor: 'aqua', // 圆颜色
	                shadowBlur: 10
	            }
	        },
	        axisLine: {
	            lineStyle: {
	                color: '#00ccff' // 分割线
	            }
	        },
	        splitLine: {
	            lineStyle: {
	                color: '#00ccff' //圆线
	            }
	        }
	    }],
	    tooltip: {
	        textStyle:{
	            fontSize:15
	        }
	    },
	    series: [{
	        name: '赛题得分',
	        type: 'radar',
	        itemStyle: {
	        	color:'#ccc',
	            emphasis: {
	                // color: '#00ccff',
	                lineStyle: {
	                    width: 5
	                }
	            }
	        },
	        data: [{
	            value: radarValue,
	            areaStyle: {
	                normal: {
	                    color: 'rgba(0, 190, 255, 0.8)' // 选择区域颜色
	                }
	            }
	        }]
	    }]
	});
}
// 雷达图

function getBar(){
	var typeName = [];
	var typeScore = [];
	for(var k = 0; k < typeList.length; k++){
		typeName.push(typeList[k].questionType);
		typeScore.push(0);

		for(var l = 0; l < scoreList.length; l++){
			if(typeName[k] == scoreList[l].questionType){
				typeScore[k] = scoreList[l].thisTypeScore;
			}
		}
	}


	myChart1.setOption({
	        color: '#00ccff',
	        tooltip : {
	            trigger: 'axis',
	            axisPointer : {            
	                type : 'shadow'  
	            }
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            containLabel: true
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : typeName,
	                axisTick: {
	                    alignWithLabel: true
	                },     
	                axisLine: {  //这是x轴文字颜色
		                lineStyle: {
		                    color: "#00ccff",
		                }
	            	}       
	            },
	        ],
	        yAxis :[
	            {
	                show:false,
	                splitLine:{
	                    show:false
	                },
	                axisLine: {  //这是x轴文字颜色
	                    lineStyle: {
	                        color: "#fff",
	                    }
	            }
	            },
	        ],
	        series : [
	            {
	                name:'分数值',
	                type:'bar',
	                barWidth: '50%',
	                data:typeScore
	            }
	        ]
	});
}
// 柱状图

function teamScore(){
	$(".teamScore").html("");
	var body = 		
		'<table class="table table-condensed" style="color: #00ccff;">'+
			'<thead>'+
				'<tr>'+
					'<th class="" style="text-align: center;">排名</th>'+
					'<th class="" style="text-align: center;">队名</th>'+
					'<th class="" style="text-align: center;">积分</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody style="text-align: center;" id="score">'+
				
			'</tbody>'+
		'</table>';
	$(".teamScore").append(body);

	for(var i = 0; i < teamList.length; i++){
		var content = 
		'<tr>'+
			'<td style="border:none">'+(i+1)+'</td>'+
			'<td style="border:none"><a style="color:#fff;font-weight:bolder" href="javascript:void(0)" onclick="getScore('+teamList[i].teamId+')">'+teamList[i].teamName+'</a></td>'+
			'<td style="border:none">'+teamList[i].teamPoint+'</td>'+
		'<tr>';
		$("#score").append(content);
		
	}
}
// 队伍榜单

function myScore(){
	$('.teamScore').html("");
	for(var i = 0; i < teamList.length; i++){
		if(teamList[i].teamId == teamId){
			rank = i+1;
			$(".myscore").html(rank);
			$(".teamName").html(teamList[i].teamName);
		}
	}
}
// 我的排名及队伍名

function getScore(id){
	var thisteamId = id;
	for(var i = 0; i < teamList.length; i++){
		if(teamList[i].teamId == thisteamId){
			$(".teamName").html(teamList[i].teamName)
		}
	}
	var teamIdObj = {'getTeamScore':{'competitionId':competitionId,'teamId':thisteamId}};
	var teamScoreJSON = JSON.stringify(teamIdObj);
	ws.send(teamScoreJSON);
}
// 查看某队伍的柱状图