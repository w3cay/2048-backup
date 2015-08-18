//数字块数组
var num = new Array();

//执行
$(document).ready(function(){
	init();
	$(".reset").click(function () {
		init();
	});
});

$(document).keydown(function (event) {
	switch(event.keyCode){
		case 37:
			moveToLeft();
			break;
		case 38:
			moveTo(up);
			break;
		case 39:
			moveTo(right);
			break;
		case 40:
			moveTo(down);
			break;
	}
});
//界面初始化
function init () {

	//方块布局初始化
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#num-cell-" + i  + "-" +j).remove();
			$(".grid-container").append('<span id="num-cell-'+i+'-'+j+'"></span>');
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
	var hasSpace =16;


	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(num[i][j]!=0){
				hasSpace--;
				console.log(hasSpace);
			}
		};
	};

	if(hasSpace>0){
		getRandomNum ();
		getRandomNum ();
	}
	else if(hasSpace==0){
		alert("GAME OVER!");
	} ;
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

function moveToLeft () {
	for (var i = 1; i <4; i++) {
		for (var j = 0; j < 4; j++) {
			var moveLen=getMoveLength(i,j);
			if (num[i][j]!=0 && moveLen!=0) {
				$("#num-cell-" + i  + "-" +j).animate({
					left:"-="+moveLen*120,
				},100);
				
				var aimX =  i-moveLen;
				num[aimX][j]=num[i][j];
				num[i][j]=0;	
				$("#num-cell-" + aimX  + "-" +j).remove();
				$("#num-cell-" + i  + "-" +j).attr("id","num-cell-" + aimX  + "-" +j);
				$(".grid-container").append('<span id="num-cell-'+i+'-'+j+'"></span>');
			    $("#num-cell-" + i + "-" +j).css({"width":"0px","height":"0px"});
				$("#num-cell-" + i + "-" +j).css({"left":getPosition(i,j)['left']+50+"px","top":getPosition(i,j)['top']+50+"px"});
			};
		};
	};
	updateView ();
}

function getMoveLength (nowi,nowj) {
	var empty=0;
	for (var i = 0; i < nowi; i++) {
		if (num[i][nowj]==0){
			empty+=1;
		}
	};
	return empty;
}