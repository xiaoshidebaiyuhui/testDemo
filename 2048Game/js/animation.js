/**
 * Created by chen on 2017/10/10.
 *
 */
//随机位置生成随机数字

function showNumber(i, j, randNumber) {
    //获取当前数字格
    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css({
        backgroundColor: getNumberBackground(randNumber),
        color: getNumberColor(randNumber)
    }).text(randNumber).animate({
        width: 100,
        height: 100,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

//fromx, fromy当前位置  tox, toy要移动的位置
function showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

//分数

function updateScore(score) {
    $("#score").text(score);
}

