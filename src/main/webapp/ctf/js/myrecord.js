var myChart = echarts.init(document.getElementById('radar'));
var myChart1 = echarts.init(document.getElementById('bar'));
var myChart2 = echarts.init(document.getElementById('tool'));
// 指定图表的配置项和数据
var answertype = new Array();
var typeNum = new Array();
var acNum = new Array();
var totalsubNum = 0;
var totalacNum = 0;
var grade = new Array();
var rate = new Array();
// 定义空数组

let login = document.getElementsByClassName('nav-right-a')[0];

$.ajax ({
    url : '../../user/getUserMap',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.loginUser == null) {
            nologin(result);
            cantsee();
        }
        else{
            islogin(result.loginUser);
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});
//判断是否登陆的请求

function nologin(result) {
    let unLogin_0 = document.createElement('a');
    unLogin_0.className = 'unLogin nav-right-a-first';
    unLogin_0.innerText = '登 录';
    unLogin_0.href = 'login.html';
    login.appendChild(unLogin_0);

    let unLogin_1 = document.createElement('a');
    unLogin_1.className = 'unLogin';
    unLogin_1.innerText = '注 册';
    unLogin_1.href = 'register.html';
    login.appendChild(unLogin_1);
}

function cantsee(){
    var txt = "请先登录！";
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
    $('.ok').click(function(){
        location.href = 'login.html';
    });
}

function islogin(loginUser){
    let isLogin_1 = document.createElement('a');
    isLogin_1.className = 'nav-info isLogin';
    isLogin_1.href = 'javascript:void(0)';
    login.appendChild(isLogin_1);
    let isLogin_1img = document.createElement('img');
    isLogin_1img.src = '../img/loginout.png';
    isLogin_1.title = "退出登录";
    isLogin_1.appendChild(isLogin_1img);

    let isLogin_0 = document.createElement('a');
    isLogin_0.className = 'isLogin';
    isLogin_0.innerText = loginUser.userNickname;
    isLogin_0.href = 'myself.html';
    isLogin_0.title = "个人信息";
    login.appendChild(isLogin_0);

    isLogin_1.addEventListener('click', () => {
        $.ajax({
            url: '../../user/back',
            type: 'post',
            scriptCharset: 'utf-8',
            success: function (result) {
                if (result.status == 'success') {
                    window.location.reload();
                }
                else{
                    console.log(result.message);
                }
            },
            error: function () {
                console.log("请求失败！");
            }
        });
    })
}
// 判断是否登录的函数
var personalRecord;
$.ajax ({
    url : '../../PersonalRecord/queryPersonalRecordByuserId',
    type : 'post',
    scriptCharset : 'utf-8',
    success : function (result) {
        if (result.status == 'success'){
            personalRecord = result.PersonalRecordList;
            getRecord();
        }
        else{
            var txt = result.message;
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
            $('.ok').click(function(){
                location.href = 'login.html';
            });
        }
    },
    error : function () {
        console.log("请求失败！");
    }
});


function getRecord(){
    for(var i = 0; i < personalRecord.length; ++i){
        answertype.push(personalRecord[i].questionType);
        rate.push(personalRecord[i].rate);
        grade.push(personalRecord[i].grade);
        acNum.push(personalRecord[i].acNum);
        typeNum.push(personalRecord[i].thisTypeQuestionNum);
        totalacNum = totalacNum+personalRecord[i].acNum;
        totalsubNum = totalsubNum+personalRecord[i].subNum;
    }
    $('.getFlag').html(totalacNum);
    $('.answer').html(totalsubNum);
    var dict = [];
    var radardict = [];
    for(var i = 0; i < answertype.length; ++i){
        dict.push({
            name: answertype[i],
            value: rate[i],
        });
        radardict.push({
        'name': answertype[i],
        'max': totalacNum,
        });
    }
    // 创建雷达图和柱形图需要的键值对数据
    
    myChart.setOption({
        color:['#c23531'],
        tooltip: {},
        legend: {
            data:['通过数'],
            right:'20%'
        },
        radar: {
            name: {
                textStyle: {
                    color: '#000',
                    padding: [3, 5]
               }
            },
            axisTick:{
                show:true,
            },
            indicator: radardict,
        },
        series: [{
            name: '通过数',
            type: 'radar',
            itemStyle: {
                normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    },
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data : [
                {
                    value : acNum,
                }
            ]
        }]
    });
    // 夺旗数与总答题数的雷达图



    myChart1.setOption({
        color:['#d48265'],
        tooltip: {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'
            }
        },
        legend: {
            data:['通过率']
        },
        yAxis: {
            name:"题型",
            data: answertype
        },
        xAxis: {
            name:"百分比",
            max:100
        },

        series: [{
            name: '通过率',
            type: 'bar',
            data: rate
        }]
    });
    // 显示各类型AC数与总题数的比值


    myChart2.setOption({
        color: ['#61a0a8'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'  
            }
        },
        legend: {
            data:['分数值']
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
                data : answertype,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis :{},
        series : [
            {
                name:'分数值',
                type:'bar',
                barWidth: '50%',
                data:grade
            }
        ]
    });
    // 显示给类型所得分数比值

}
// 提取数据且制图的函数
