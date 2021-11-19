// var myChart = echarts.init(document.getElementById('radar'));
// var myChart1 = echarts.init(document.getElementById('myrecord'));
// var radardict = [
// 	{'name':''}
// ]

// myChart.setOption({
// 	radar: [{
//         indicator: [
//         {text: '第一题',max:100},
// 		{text: '第二题',max:100},
//         {text: '第三题',max:100},
//         {text: '第四题',max:100},
//         {text: '第五题',max:100},
//         {text: '第六题',max:100}],
//         center: ['50%', '50%'], // 位置
//         radius: '80%', //大小
//         startAngle: 90,
//         splitNumber: 5,
//         shape: 'circle',
//         name: {
//             formatter: '{value}',
//             textStyle: {
//                 color: '#00ccff', // 文字颜色
//                 fontWeight:'bolder',
//                 fontSize:'18',
//             }
//         },
//         splitArea: {
//             areaStyle: {
//                 color: ['rgba(114, 172, 209, 0.1)',
//                     'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)',
//                     'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)'
//                 ], //圆环颜色
//                 shadowColor: 'aqua', // 圆颜色
//                 shadowBlur: 10
//             }
//         },
//         axisLine: {
//             lineStyle: {
//                 color: '#00ccff' // 分割线
//             }
//         },
//         splitLine: {
//             lineStyle: {
//                 color: '#00ccff' //圆线
//             }
//         }
//     }],
//     tooltip: {
//         textStyle:{
//             fontSize:15
//         }
//     },
//     series: [{
//         name: '雷达图',
//         type: 'radar',
//         itemStyle: {
//         	color:'#ccc',
//             emphasis: {
//                 // color: '#00ccff',
//                 lineStyle: {
//                     width: 5
//                 }
//             }
//         },
//         data: [{
//             value: [80, 24, 45, 67, 56, 67],
//             areaStyle: {
//                 normal: {
//                     color: 'rgba(0, 190, 255, 0.8)' // 选择区域颜色
//                 }
//             }
//         }]
//     }]
// });

// myChart1.setOption({
//         color: '#00ccff',
//         tooltip : {
//             trigger: 'axis',
//             axisPointer : {            
//                 type : 'shadow'  
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis : [
//             {
//                 type : 'category',
//                 data : ['Misc','Web','Reverse','Code'],
//                 axisTick: {
//                     alignWithLabel: true
//                 },     
//                 axisLine: {  //这是x轴文字颜色
//                 lineStyle: {
//                     color: "#00ccff",
//                 }
//             }       
//                 // splitLine:{
//                 //     show:false
//                 // }
//             },
//         ],
//         yAxis :[
//             {
//                 show:false,
//                 splitLine:{
//                     show:false
//                 },
//                 axisLine: {  //这是x轴文字颜色
//                     lineStyle: {
//                         color: "#fff",
//                     }
//             }
//             },
//         ],
//         series : [
//             {
//                 name:'分数值',
//                 type:'bar',
//                 barWidth: '50%',
//                 data:[20,30,40,51]
//             }
//         ]
//     });