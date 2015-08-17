var num = new Array();
$(document).ready(function(){
	init();
	$(".reset").click(function () {
		init();
	});
});

function init () {

	//方块布局初始化
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#num-cell-" + i  + "-" +j).css({"width":"0px","height":"0px"});
			$("#grid-cell-" + i  + "-" +j).css({"left":getPosition(i,j)['left']+"px","top":getPosition(i,j)['top']+"px"});
			$("#num-cell-" + i  + "-" +j).css({"left":getPosition(i,j)['left']+50+"px","top":getPosition(i,j)['top']+50+"px"});
		};
	};
	//数字初始化
	for (var i = 0; i < 4; i++) {
		num[i]=new Array();
		for (var j = 0; j < 4; j++) {
			num[i][j]=0;
		}
	}

	updateView();
}

function updateView () {
	 getRandomNum ();
	 getRandomNum ();

		
}
//获取当前cell位置
function getPosition (i,j) {
	var pos = new Array();
	pos['left']=i*100+(i+1)*20;
	pos['top']=j*100+(j+1)*20;
	return pos;
}
//随机数获取
function getRandomNum () {
	var	randX= parseInt(Math.floor(Math.random()*4));
	var randY= parseInt(Math.floor(Math.random()*4));
	var isExisted =false;
	if (num[randX][randY]!=0) {
		isExisted =true;
	};
	 while(isExisted)
	  {	

			randX= parseInt(Math.floor(Math.random()*4));
			randY= parseInt(Math.floor(Math.random()*4));
			if (num[randX][randY]==0) {
			isExisted =false;
			};
	  }

 	var randnum =Math.random() <0.5 ? 2 : 4;
 	num[randX][randY]=randnum;
	showNum(randX,randY,randnum);
}

//显示数字效果
function showNum (i,j,randnum) {
	var numCell = $("#num-cell-" + i  + "-" +j);
	numCell.css({"background":"#EEE4DA","color":"#514D4D"});
	numCell.text(randnum);
	numCell.animate({
		width:"100px",
		height:"100px",
		left:getPosition(i,j)['left']+"px",
		top:getPosition(i,j)['top']+"px",
	},100);
}