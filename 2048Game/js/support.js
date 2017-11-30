/**
 * Created by chen on 2017/10/10.
 *
 * 基础逻辑
 */
//行
function getPosTop(i, j) {
    return 20 + i * 120;
}
//列
function getPosLeft(i, j) {
    return 20 + j * 120;
}

//数字块的背景色
function getNumberBackground(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

//数字颜色
function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';

}
//能否向左移动
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                //当前数字格的左边第一个值为0的或者当前数字格的值与左边第一个数字格的值相等
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能否向右移动
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能否向上移动
function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能否向下移动
function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断中间格子是否可以移动（行）
function noBlokHorizontalRow(row1, row2, col, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

//判断中间格子是否可以移动（列）
function noBlokHorizontalCol(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
//格子已经满了

function nospace(board){
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

//所有的格子已经不能移动

function nomove(board){
    if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)){
        return false;
    }
    return true;
}





























