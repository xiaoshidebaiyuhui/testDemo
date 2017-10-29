var canvas = document.querySelector('.canvas');
var cxt = canvas.getContext('2d');
//var Rballs = parseInt(Math.random()*10+1);
//var RballWait = parseInt(Math.random()*20+1);

var arcX = 300; //大圆X
var arcY = 160;//大圆Y
var arcR = 30;//大圆半径
var lineWidth = 100;//线条长度
var radius = 10;//小球半径


//游戏的等级 速度 等待小球
var LevelSpeed = [
    {
        "speed": 1,
        "ballnum": 3,
        "waitNum": 5
    },
    {
        "speed": 1.5,
        "ballnum": 3,
        "waitNum": 6
    },
    {
        "speed": 2,
        "ballnum": 4,
        "waitNum": 7
    }, {
        "speed": 2.5,
        "ballnum": 4,
        "waitNum": 7
    },
    {
        "speed": 3,
        "ballnum": 5,
        "waitNum": 8
    },
    {
        "speed": 3.5,
        "ballnum": 5,
        "waitNum": 10
    },
    {
        "speed": 3.5,
        "ballnum": 6,
        "waitNum": 11
    },
    {
        "speed": 4,
        "ballnum": 6,
        "waitNum": 12
    },
    {
        "speed": 4.5,
        "ballnum": 8,
        "waitNum": 14
    },
    {
        "speed": 5,
        "ballnum": 8,
        "waitNum": 16
    },
    {
        "speed": 6,
        "ballnum": 10,
        "waitNum": 18
    },
    {
        "speed": 8,
        "ballnum": 10,
        "waitNum": 20
    },
    {
        "speed": 10,
        "ballnum": 10,
        "waitNum": 20
    },
    {
        "speed": 12,
        "ballnum": 11,
        "waitNum": 20
    }
];

var balls = []; //定义一个旋转的小球数组
var waitBalls = []; //等待小球的数组

//定义关卡
var level;
if (parseInt(window.location.href.split('#')[1])) {
    level = parseInt(window.location.href.split('#')[1]);
} else {
    level = 0;
}

var ballNum = LevelSpeed[level].ballnum;//定义旋转小球的数量
var waitNum = LevelSpeed[level].waitNum;//定义等待小球的数量
var rotateAngle = LevelSpeed[level].speed;//定义旋转的角度

//全局的画笔
cxt.textAlign = 'center';
cxt.textBaseline = 'middle';

function ballBig() {
//大圆
    cxt.beginPath();
    cxt.arc(arcX, arcY, arcR, 0, Math.PI * 2);
    cxt.fillStyle = '#000';
    cxt.fill();
    cxt.closePath();
//字体
    cxt.fillStyle = '#fff';
    cxt.font = '30px 微软雅黑';
    if (level == LevelSpeed.length) {
        level = LevelSpeed.length - 1;
    }
    var txt = (level + 1) + "";
    cxt.fillText(txt, arcX, arcY);
}

//准备转动小球的数据
for (var i = 0; i < ballNum; i++) {
    var angle = 360 / ballNum * i;
    balls.push({
        angle: angle,
        numStr: ''
    });
}

//准备等待小球的数据
for (var j = waitNum; j > 0; j--) {
    waitBalls.push({
        angle: '',
        numStr: j
    });
}

//绘制旋转的小球
function ballRotate() {
    cxt.clearRect(100, 20, 350, 280);
    ballBig();
    cxt.save();
    cxt.translate(arcX, arcY);
    balls.forEach(function (item, index) {
        cxt.save();
        cxt.rotate(Math.PI / 180 * item.angle);
        item.angle += rotateAngle;
        if (item.angle >= 360) item.angle = 0;
        //绘制小球和线条
        cxt.beginPath();
        cxt.moveTo(0, -arcR);
        cxt.lineTo(0, -(arcR + lineWidth));
        cxt.closePath();
        cxt.stroke();

        cxt.beginPath();
        cxt.arc(0, -(arcR + lineWidth), radius, 0, Math.PI * 2);
        cxt.fillStyle = '#000';
        cxt.fill();
        cxt.closePath();
        if (item.numStr != "") {
            cxt.fillStyle = '#fff';
            cxt.font = '10px 微软雅黑';
            cxt.fillText(item.numStr, 0, -(arcR + lineWidth));
        }
        cxt.restore();
    });
    cxt.restore();
    window.requestAnimationFrame(ballRotate);
}

//绘制等待小球
function ballWait() {
    //清空小球的等待区域
    cxt.clearRect(arcX - radius, 270, 20, 360);
    waitBalls.forEach(function (item, index) {
        cxt.save();
        cxt.beginPath();
        cxt.arc(arcX, arcY + lineWidth + arcR + radius * 3 + (radius * index * 2), radius, 0, Math.PI * 2);
        cxt.fillStyle = '#000';
        cxt.fill();
        cxt.fillStyle = '#fff';
        cxt.font = '10px 微软雅黑';
        cxt.fillText(item.numStr, arcX, arcY + lineWidth + radius * 3 + arcR + (radius * index * 2));
        cxt.closePath();
        cxt.restore();
    })
}

ballWait();

ballRotate();
//alert('点击有色区域即可开始游戏');

//点击画布时事件
canvas.onclick = function () {
    //删除等待小球，并且把删除的小球插入到转动小球的末尾处
    var obj = waitBalls.shift();
    if (waitBalls.length != 0) {
        //更改小球的角度
        obj.angle = 180;
        //判断小球之间是否碰撞
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].angle >= 171 && balls[i].angle <= 189) {
                alert('游戏失败');
                window.location.href = "index.html#" + level;
            }
        }
        balls.push(obj);
    } else if (waitBalls.length === 0) {
        alert('闯关成功！');
        level++;
        window.location.href = "index.html#" + level;
    }
    ballWait();
};



































