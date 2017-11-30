/**
 * Created by chen on 2017/10/10.
 * 游戏主界面
 */

//定义javascript数组
var board = new Array();
var score = 0;
//定义一个二维数组 来存储 当前合并的数字 期待与下一次要合并的数字 如 2,2,4 -> 4,4 -> 8
var hasBug = new Array();

$(function () {
    newGame();
});

function newGame() {
    //初始化棋盘格
    init();
    //调用两遍 随机生成随机位置的 两个数字
    randomOneNumber();
    randomOneNumber();
    //初始化分数
    updateScore(0);
}

//重新开始游戏
function restartgame() {
    $("#game-over").remove();
    //更新分数
    updateScore(0);
    //开始游戏
    newGame();
}

function init() {
    //模拟一个二维数组
    for (var i = 0; i < 4; i++) {
        //定义一个二维数组
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            ////初始化小格子值为0
            //board[i][j] = 0;
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //使用getPosTop方法设置每个格子距离顶端的距离
            gridCell.css({
                top: getPosTop(i, j),
                left: getPosLeft(i, j)
            });
            //通过getPosLeft()方法设置每个格子距左端的距离
            //gridCell.css("left", getPosLeft(i, j));

        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasBug[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasBug[i][j] = false;
        }
    }
    updateBoard();
    score = 0;
    $('#score').text(0);
}

//初始化数字网格
function updateBoard() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0；设置数字格宽高都为0
            if (board[i][j] == 0) {
                numberCell.css({
                    width: 0,
                    height: 0,
                    top: getPosTop(i, j) + 50,
                    left: getPosLeft(i, j) + 50
                });
            } else {
                numberCell.css({
                    width: 100,
                    height: 100,
                    top: getPosTop(i, j),
                    left: getPosLeft(i, j),
                    backgroundColor: getNumberBackground(board[i][j]),
                    color: getNumberColor(board[i][j])
                }).text(board[i][j]);
            }
            hasBug[i][j] = false;
        }
    }
}


function randomOneNumber() {
    //生成随机位置的 1个 数字
    //1. 随机位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    //定义一个死循环 完成随机空格子
    while (true) {
        if (board[randX][randY] == 0) {
            break;
        } else {
            var randX = parseInt(Math.floor(Math.random() * 4));
            var randY = parseInt(Math.floor(Math.random() * 4));
        }

    }
    //2. 随机数字 50%是 2 50%是 4；
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //3. 随机位置上显示随机数字
    board[randX][randY] = randNumber;
    //动画效果
    showNumber(randX, randY, randNumber);
    return true;
}

























