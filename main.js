//数字块数组
var num = new Array();
//执行
$(document).ready(function() {
    init();
    $(".reset").click(function() {
        init();
    });
});
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            moveToLeft();
            break;
        case 38:
            moveToUp();
            break;
        case 39:
            moveToRight();
            break;
        case 40:
            moveToDown();
            break;
    }
});
//界面初始化
function init() {
    //方块布局初始化
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#num-cell-" + i + "-" + j).remove();
            $(".grid-container").append('<span id="num-cell-' + i + '-' + j + '"></span>');
            $("#grid-cell-" + i + "-" + j).css({
                "left": getPosition(i, j)['left'] + "px",
                "top": getPosition(i, j)['top'] + "px"
            });
            $("#num-cell-" + i + "-" + j).css({
                "left": getPosition(i, j)['left'] + 50 + "px",
                "top": getPosition(i, j)['top'] + 50 + "px"
            });
        };
    };
    //数字初始化
    for (var i = 0; i < 4; i++) {
        num[i] = new Array();
        for (var j = 0; j < 4; j++) {
            num[i][j] = 0;
        }
    }
    getRandomNum();
    getRandomNum();
}

function updateView() {
    var hasSpace = 16;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (num[i][j] != 0) {
                hasSpace--;
            }
        };
    };
    if (hasSpace > 0) {
        getRandomNum();
    } else if (hasSpace == 0) {
        alert("GAME OVER!");
        init();
    };
}
//获取当前cell位置
function getPosition(i, j) {
    var pos = new Array();
    pos['left'] = i * 100 + (i + 1) * 20;
    pos['top'] = j * 100 + (j + 1) * 20;
    return pos;
}
//随机数获取
function getRandomNum() {
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    var isExisted = false;
    if (num[randX][randY] != 0) {
        isExisted = true;
    };
    while (isExisted) {
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
        if (num[randX][randY] == 0) {
            isExisted = false;
        };
    }
    var randnum = Math.random() < 0.5 ? 2 : 4;
    num[randX][randY] = randnum;
    showNum(randX, randY, randnum);
}
//显示数字效果
function showNum(i, j, randnum) {
    var numCell = $("#num-cell-" + i + "-" + j);
    numCell.css({
        "background": getBackgroundColor(randnum),
        "color": getFrontColor(randnum)
    });
    numCell.text(randnum);
    numCell.animate({
        width: "100px",
        height: "100px",
        left: getPosition(i, j)['left'] + "px",
        top: getPosition(i, j)['top'] + "px",
    }, 100);
}

function moveToLeft() {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var moveLen = getMoveLength(i, j);
            if (num[i][j] != 0) {
                var aim = i - moveLen;
                if (aim == 0) {
                    commonChange(i, j, aim, num[i][j], moveLen);
                } else {
                    var next = aim - 1;
                    var nextVal = num[next][j];
                    if (nextVal == num[i][j]) {
                        commonChange(i, j, next, num[i][j] * 2, (moveLen + 1));
                        $("#num-cell-" + next + "-" + j).text(nextVal * 2).css({
                            "background": getBackgroundColor(num[next][j]),
                            "color": getFrontColor(num[next][j])
                        });
                    } else if (moveLen >= 1) {
                        commonChange(i, j, aim, num[i][j], moveLen);
                    }
                };
            };
        };
    };

    function getMoveLength(x, y) {
        var empty = 0;
        for (var n = 0; n < x; n++) {
            if (num[n][y] == 0) {
                empty += 1;
            }
        };
        return empty;
    }

    function commonChange(i, j, aim, copyNum, moveLength) {
        $("#num-cell-" + i + "-" + j).animate({
            left: "-=" + moveLength * 120
        }, 30);
        num[aim][j] = copyNum;
        num[i][j] = 0;
        $("#num-cell-" + aim + "-" + j).remove();
        $("#num-cell-" + i + "-" + j).attr("id", "num-cell-" + aim + "-" + j);
        $(".grid-container").append('<span id="num-cell-' + i + '-' + j + '"></span>');
        $("#num-cell-" + i + "-" + j).css({
            "width": "0px",
            "height": "0px"
        });
        $("#num-cell-" + i + "-" + j).css({
            "left": getPosition(i, j)['left'] + 50 + "px",
            "top": getPosition(i, j)['top'] + 50 + "px"
        });
    }
    updateView();
}

function moveToUp() {
    for (var j = 1; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            var moveLen = getMoveLength(i, j);
            if (num[i][j] != 0) {
                var aim = j - moveLen;
                if (aim == 0) {
                    commonChange(i, j, aim, num[i][j], moveLen);
                } else {
                    var next = aim - 1;
                    var nextVal = num[i][next];
                    if (nextVal == num[i][j]) {
                        commonChange(i, j, next, num[i][j] * 2, (moveLen + 1));
                        $("#num-cell-" + i + "-" + next).text(nextVal * 2).css({
                            "background": getBackgroundColor(num[i][next]),
                            "color": getFrontColor(num[i][next])
                        });
                        // debugger;
                    } else if (moveLen >= 1) {
                        commonChange(i, j, aim, num[i][j], moveLen);
                    }
                };
            };
        }
    };

    function getMoveLength(x, y) {
        var empty = 0;
        for (var n = 0; n < y; n++) {
            if (num[x][n] == 0) {
                empty += 1;
            }
        };
        return empty;
    }

    function commonChange(i, j, aim, copyNum, moveLength) {
        $("#num-cell-" + i + "-" + j).animate({
            top: "-=" + moveLength * 120
        }, 30);
        num[i][aim] = copyNum;
        num[i][j] = 0;
        $("#num-cell-" + i + "-" + aim).remove();
        $("#num-cell-" + i + "-" + j).attr("id", "num-cell-" + i + "-" + aim);
        $(".grid-container").append('<span id="num-cell-' + i + '-' + j + '"></span>');
        $("#num-cell-" + i + "-" + j).css({
            "width": "0px",
            "height": "0px"
        });
        $("#num-cell-" + i + "-" + j).css({
            "left": getPosition(i, j)['left'] + 50 + "px",
            "top": getPosition(i, j)['top'] + 50 + "px"
        });
    }
    updateView();
}

function moveToRight() {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            var moveLen = getMoveLength(i, j);
            if (num[i][j] != 0) {
                var aim = i + moveLen;
                if (aim == 3) {
                    commonChange(i, j, aim, num[i][j], moveLen);
                } else {
                    var next = aim + 1;
                    var nextVal = num[next][j];
                    if (nextVal == num[i][j]) {
                        commonChange(i, j, next, num[i][j] * 2, (moveLen + 1));
                        $("#num-cell-" + next + "-" + j).text(nextVal * 2).css({
                            "background": getBackgroundColor(num[next][j]),
                            "color": getFrontColor(num[next][j])
                        });
                    } else if (moveLen >= 1) {
                        commonChange(i, j, aim, num[i][j], moveLen);
                    }
                };
            };
        };
    };
    // debugger;
    function getMoveLength(x, y) {
        var empty = 0;
        for (var n = x + 1; n < 4; n++) {
            if (num[n][y] == 0) {
                empty += 1;
            }
        };
        return empty;
    }

    function commonChange(i, j, aim, copyNum, moveLength) {
        $("#num-cell-" + i + "-" + j).animate({
            left: "+=" + moveLength * 120
        }, 30);
        num[aim][j] = copyNum;
        num[i][j] = 0;
        $("#num-cell-" + aim + "-" + j).remove();
        $("#num-cell-" + i + "-" + j).attr("id", "num-cell-" + aim + "-" + j);
        $(".grid-container").append('<span id="num-cell-' + i + '-' + j + '"></span>');
        $("#num-cell-" + i + "-" + j).css({
            "width": "0px",
            "height": "0px"
        });
        $("#num-cell-" + i + "-" + j).css({
            "left": getPosition(i, j)['left'] + 50 + "px",
            "top": getPosition(i, j)['top'] + 50 + "px"
        });
    }
    updateView();
}

function moveToDown() {
    for (var j = 2; j >= 0; j--) {
        for (var i = 0; i < 4; i++) {
            var moveLen = getMoveLength(i, j);
            if (num[i][j] != 0) {
                var aim = j + moveLen;
                if (aim == 3) {
                    commonChange(i, j, aim, num[i][j], moveLen);
                } else {
                    var next = aim + 1;
                    var nextVal = num[i][next];
                    if (nextVal == num[i][j]) {
                        commonChange(i, j, next, num[i][j] * 2, (moveLen + 1));
                        $("#num-cell-" + i + "-" + next).text(nextVal * 2).css({
                            "background": getBackgroundColor(num[i][next]),
                            "color": getFrontColor(num[i][next])
                        });
                        // debugger;
                    } else if (moveLen >= 1) {
                        commonChange(i, j, aim, num[i][j], moveLen);
                    }
                };
            };
        }
    };

    function getMoveLength(x, y) {
        var empty = 0;
        for (var n = y + 1; n < 4; n++) {
            if (num[x][n] == 0) {
                empty += 1;
            }
        };
        return empty;
    }

    function commonChange(i, j, aim, copyNum, moveLength) {
        $("#num-cell-" + i + "-" + j).animate({
            top: "+=" + moveLength * 120
        }, 30);
        num[i][aim] = copyNum;
        num[i][j] = 0;
        $("#num-cell-" + i + "-" + aim).remove();
        $("#num-cell-" + i + "-" + j).attr("id", "num-cell-" + i + "-" + aim);
        $(".grid-container").append('<span id="num-cell-' + i + '-' + j + '"></span>');
        $("#num-cell-" + i + "-" + j).css({
            "width": "0px",
            "height": "0px"
        });
        $("#num-cell-" + i + "-" + j).css({
            "left": getPosition(i, j)['left'] + 50 + "px",
            "top": getPosition(i, j)['top'] + 50 + "px"
        });
    }
    updateView();
}

function getBackgroundColor(num) {
    switch (num) {
        case 2:
            return "#EEE4DA";
            break;
        case 4:
            return "#EDE0C8";
            break;
        case 8:
            return "#F2B179";
            break;
        case 16:
            return "#F59563";
            break;
        case 32:
            return "#F67C5F";
            break;
        case 64:
            return "#DB6044";
            break;
        case 128:
            return "#D66A76";
            break;
        case 256:
            return "#E8E85A";
            break;
        case 512:
            return "#9A8153";
            break;
        case 1024:
            return "#8F6820";
            break;
        case 2048:
            return "#FE0505";
            break;
    }
}

function getFrontColor(num) {
    if (num < 8) {
        return "#514D4D";
    } else {
        return "#fff";
    };
}