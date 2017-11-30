/**
 * Created by chen on 2017/9/11.
 */
$.fn.make2048 = function (option) {

    //游戏大块宽4（索引），高4
    var defaultOption = {
        width: 4,
        height: 4,
        //设置样式
        style: {
            //背景色
            background_color: 'rgb(184, 175, 158)',
            //方块的背景色
            block_background_color: 'rgb(204, 192, 178)',
            //方块和方块之间的距离
            padding: 18,
            //小方块的大小
            block_size: 100,
            block_style: {
                'font-family': '微软雅黑',
                'font-weight': 'bold',
                'text-align': 'center'
            }
        },

        //创建一个数组设置等级和数字值
        blocks: [
            {
                level: 0,
                value: 2,
                style: {"background-color": "rgb(238,228,218)", "color": "rgb(124,115,106)", "font-size": 58}
            },
            {
                level: 1,
                value: 4,
                style: {"background-color": "rgb(236,224,200)", "color": "rgb(124,115,106)", "font-size": 58}
            },
            {
                level: 2,
                value: 8,
                style: {"background-color": "rgb(242,177,121)", "color": "rgb(255,247,235)", "font-size": 58}
            },
            {
                level: 3,
                value: 16,
                style: {"background-color": "rgb(245,149,99)", "color": "rgb(255,250,235)", "font-size": 50}
            },
            {
                level: 4,
                value: 32,
                style: {"background-color": "rgb(244,123,94)", "color": "rgb(255,247,235)", "font-size": 50}
            },
            {
                level: 5,
                value: 64,
                style: {"background-color": "rgb(247,93,59)", "color": "rgb(255,247,235)", "font-size": 50}
            },
            {
                level: 6,
                value: 128,
                style: {"background-color": "rgb(236,205,112)", "color": "rgb(255,247,235)", "font-size": 42}
            },
            {
                level: 7,
                value: 256,
                style: {"background-color": "rgb(237,204,97)", "color": "rgb(255,247,235)", "font-size": 42}
            },
            {
                level: 8,
                value: 512,
                style: {"background-color": "rgb(236,200,80)", "color": "rgb(255,247,235)", "font-size": 42}
            },
            {
                level: 9,
                value: 1024,
                style: {"background-color": "rgb(237,197,63)", "color": "rgb(255,247,235)", "font-size": 34}
            },
            {
                level: 10,
                value: 2048,
                style: {"background-color": "rgb(238,194,46)", "color": "rgb(255,247,235)", "font-size": 34}
            },
            {
                level: 11,
                value: 4096,
                style: {"background-color": "rgb(61,58,51)", "color": "rgb(255,247,235)", "font-size": 34}
            }
        ],
        animateSpeed: 200
    };
    //用于保存游戏数据
    var state = [];
    //不传入option时默认是defaultOption里的数据
    option = $.extend({}, defaultOption, option);
    console.log(option);
    if (this.length > 1) throw '一次只能开始一个游戏';
    if (this.length == 0) throw '未找到游戏容器';

    //转换jq对象
    var $this = $(this[0]);
    //设置css样式
    $this.css({
        'background': option.style.background_color,
        //大方块的圆角值和padding值相等
        'border-radius': option.style.padding,
        //设置大方块的定位
        'position': 'relative',
        '-webkit-user-select': 'none'
    });
    //此方法用于计算小方块出现的坐标
    var getPosition = function (x, y) {
        return {
            //先加一个padding在家y值乘以小方块的大小加上大方块的padding值
            'top': option.style.padding + y * (option.style.block_size + option.style.padding),
            'left': option.style.padding + x * (option.style.block_size + option.style.padding)
        }
    }

    //得到所有的数字块
    var getBlockIndex = function () {
        //创建一个空的数组
        var emptyBlockIndex = [];
        //遍历游戏数据数组state
        $(state).each(function (index, object) {
            if (object == null) {
                emptyBlockIndex.push(index);
            }
        });
        return emptyBlockIndex;
    };

    //通过获取数字块的坐标来回去x轴和y轴
    var getCoordinate = function (index) {
        return {
            x: index % option.width,
            y: Math.floor(index / option.width)
        }
    };
    var getIndex = function (x, y) {
        return x + y * option.width;
    };
    var getBlock = function (x, y) {
        return state[getIndex(x, y)];
    };
    //此方法用于创建背景上面的小方块
    var buildBackground = function () {
        //创建背景块数组
        var backgrounds = [];
        //通过双层循环遍历出小方块的x坐标和y坐标
        for (var x = 0; x < option.width; x++) {
            for (var y = 0; y < option.height; y++) {
                state.push(null);
                //创建小方块
                var bg_block = $('<div></div>');
                var position = getPosition(x, y);
                bg_block.css({
                    'width': option.style.block_size,
                    'height': option.style.block_size,
                    'backgroundColor': option.style.block_background_color,
                    'position': 'absolute',
                    'top': position.top,
                    'left': position.left
                });
                //将创建的小方块添加到数组中
                backgrounds.push(bg_block);
                //定义父级元素的宽和高
                $this.width((option.style.block_size + option.style.padding) * option.width + option.style.padding);
                $this.height((option.style.block_size + option.style.padding) * option.height + option.style.padding);
            }
        }
        //最后将数组放到父级的div中
        $this.append(backgrounds);
    };

    //定义数字块
    //重载 继承多态
    var buildBlock = function (level, x, y) {
        var blockIndex = getBlockIndex();
        if (blockIndex.length == 0) {
            return false;
        }

        //随机生成一个数字块
        var putIndex;
        if (x != undefined && y != undefined) {
            putIndex = getIndex(x, y);
        } else {
            putIndex = blockIndex[Math.floor(Math.random() * blockIndex.length)];
        }
        //生成随机数字块
        var Block;
        if (level != undefined) {
            Block = $.extend({}, option.blocks[level]);
        } else {
            Block = $.extend({}, Math.random() >= 0.5 ? option.blocks[0] : option.blocks[1]);
        }
        //设置数字块的坐标
        var coordinate = getCoordinate(putIndex);

        //获取坐标值
        var position = getPosition(coordinate.x, coordinate.y);
        //获取dom
        var blockDom = $('<div></div>');
        //给获取的dom添加一个类
        blockDom.addClass('block_' + coordinate.x + '_' + coordinate.y);
        //设置css样式
        blockDom.css($.extend(option.style.block_style, {
            'position': 'absolute',
            //获取到中间的位置 使数字块从中间慢慢扩大
            'top': position.top + option.style.block_size / 2,
            'left': position.left + option.style.block_size / 2,
            'width': 0,
            'height': 0
        }, Block.style));

        $this.append(blockDom);
        state[putIndex] = Block;
        //设置dom的动画效果
        blockDom.animate({
            'width': option.style.block_size,
            'height': option.style.block_size,
            'lineHeight': option.style.block_size + 'px',
            'top': position.top,
            'left': position.left
            //使用闭包是的数字块的初始位置能够保留下来
        }, option.animateSpeed, (function (blockDom) {
            return function () {
                blockDom.html(Block.value);
            }
        })(blockDom));
        return true;
    };

    //移动方法
    var lastMovedTime = 0;
    var move = function (direction) {
        if (new Date() - lastMovedTime < option.animateSpeed + 20) return;
        lastMovedTime = new Date();
        var startX, startY, endX, endY, modifyX, modifyY;
        var doActioned = false;
        switch (direction) {
            case "up":
                startX = 0;
                endX = option.width - 1;
                startY = 1;
                endY = option.height - 1;
                modifyX = 0;
                modifyY = -1;
                break;
            case "down":
                startX = 0;
                endX = option.width - 1;
                startY = option.height - 2;
                endY = 0;
                modifyX = 0;
                modifyY = 1;
                break;
            case "left":
                startX = 1;
                endX = option.width - 1;
                startY = 0;
                endY = option.height - 1;
                modifyX = -1;
                modifyY = 0;
                break;
            case "right":
                startX = option.width - 2;
                endX = 0;
                startY = 0;
                endY = option.height - 1;
                modifyX = 1;
                modifyY = 0;
                break;
        }
        for (var x = startX; x <= Math.max(startX, endX) && x >= Math.min(startX, endX); endX > startX ? x++ : x--) {
            for (var y = startY; y <= Math.max(startY, endY) && y >= Math.min(startY, endY); endY > startY ? y++ : y--) {
                var block = getBlock(x, y);
                if (block == null) continue;
                var target_coordinate = {x: x, y: y};
                var target_block;
                var moved = 0;
                do {
                    if (++moved > Math.max(option.width, option.height)) break;
                    target_coordinate.x += modifyX;
                    target_coordinate.y += modifyY;
                    target_block = getBlock(target_coordinate.x, target_coordinate.y);
                    if (direction == "up" || direction == "down") {
                        if (target_coordinate.y == 0 || target_coordinate.y == option.height - 1) break;
                    }
                    if (direction == "left" || direction == "right") {
                        if (target_coordinate.x == 0 || target_coordinate.x == option.width - 1) break;
                    }
                } while (target_block == null)

                var blockDom = $(".block_" + x + "_" + y);

                if (target_block == null) {
                    var position = getPosition(target_coordinate.x, target_coordinate.y);
                    state[getIndex(x, y)] = null;
                    state[getIndex(target_coordinate.x, target_coordinate.y)] = block;
                    blockDom.removeClass();
                    blockDom.addClass("block_" + target_coordinate.x + "_" + target_coordinate.y)
                    blockDom.animate({
                        "top": position.top,
                        "left": position.left
                    }, option.animateSpeed)
                } else if (target_block.value == block.value && !target_block.justModified) {
                    var position = getPosition(target_coordinate.x, target_coordinate.y);
                    var updatedBlock = $.extend({}, option.blocks[block.level + 1]);
                    if (updatedBlock.level == option.blocks.length - 1) {
                        gameEnd();
                    }
                    updatedBlock.justModified = true;
                    state[getIndex(x, y)] = null;
                    state[getIndex(target_coordinate.x, target_coordinate.y)] = updatedBlock;
                    var target_blockDom = $(".block_" + target_coordinate.x + "_" + target_coordinate.y);
                    blockDom.animate({
                        "top": position.top,
                        "left": position.left
                    }, option.animateSpeed, (function (blockDom, target_blockDom, target_coordinate, updatedBlock) {
                        return function () {
                            blockDom.remove();
                            target_blockDom.html(updatedBlock.value);
                            target_blockDom.css(updatedBlock.style);
                        };
                    }(blockDom, target_blockDom, target_coordinate, updatedBlock)))
                } else if (target_block.value != block.value || moved > 1) {
                    target_coordinate.x = target_coordinate.x - modifyX;
                    target_coordinate.y = target_coordinate.y - modifyY;
                    if (target_coordinate.x == x && target_coordinate.y == y) continue;
                    var position = getPosition(target_coordinate.x, target_coordinate.y);
                    state[getIndex(x, y)] = null;
                    state[getIndex(target_coordinate.x, target_coordinate.y)] = block;
                    blockDom.removeClass();
                    blockDom.addClass("block_" + target_coordinate.x + "_" + target_coordinate.y)
                    blockDom.animate({
                        "top": position.top,
                        "left": position.left
                    }, option.animateSpeed)
                } else {
                    continue;
                }
                doActioned = true;
            }
        }
        for (var x = 0; x < option.width; x++) {
            for (var y = 0; y < option.height; y++) {
                var block = getBlock(x, y);
                if (block == null) continue;
                delete block.justModified;
            }
        }
        if (doActioned) {
            buildBlock();
        }
    };
    //键盘控制上下左右
    var keyHandler = function (evt) {
        switch (evt.which) {
            case 38:
                move('up');
                break;
            case 40:
                move('down');
                break;
            case 37:
                move('left');
                break;
            case 39:
                move('right');
                break;
        }
    };
    //游戏的开始
    var gameStart = function () {
        //背景
        buildBackground();
        //创建两个块
        buildBlock();
        buildBlock();

        $(document).on("keydown", keyHandler);

    }
    gameStart();
};
