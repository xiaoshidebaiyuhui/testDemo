/**
 * Created by chen on 2017/10/10.
 *
 * 使用 上下左右 四个键来完成游戏的操作
 */

$(document).keydown(function (e) {
    switch (e.keyCode) {
        case 37:        //left
            if (moveLeft()) {
                //返回值是Boolean 类型 判断是否可以向左移动
                setTimeout(randomOneNumber,210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38:        //up
            if(moveUp()){
                setTimeout(randomOneNumber,210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39:        //right
            if(moveRight()){
                setTimeout(randomOneNumber,210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40:        //down
            if(moveDown()){
                setTimeout(randomOneNumber,210);
                setTimeout("isgameover()", 300);
            }
            break;
    }
});

//向左移动
function moveLeft() {
    if (!canMoveLeft(board)) {
        //当前格子 无法移动
        return false;
    }
    //完成向左移动的逻辑
    for (var i = 0; i < 4; i++) {
        //由于第一列不能再移动了 所以j从1开始
        for (var j = 1; j < 4; j++) {
            //数字格有值才可以移动
            if (board[i][j] != 0) {
                //向左移动
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !hasBug[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasBug[k][j] = true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout( updateBoard,200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasBug[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasBug[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout(updateBoard, 200);
    return true;
}
//向上移动
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    //moveUp
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasBug[i][k]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasBug[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout(updateBoard, 200);
    return true;
}
//向下移动
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasBug[i][k]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasBug[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout(updateBoard, 200);
    return true;
}

//游戏是否结束

function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}


//游戏结束按钮
function gameover() {
    $("#grid-container").append("<div id='game-over' class='game-over'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#game-over");
    gameover.css({
        width:500,
        height:500,
        background:'rgba(0, 0, 0, 0.5)'
    });
}



























