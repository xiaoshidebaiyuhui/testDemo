//定义一个轮播的构造函数
function Slide(box){//box 轮播的容器 '.box'
    this.box = $(box);//获取轮播容器
    this.imgBox =this.box.children().eq(0);//获取轮播图片容器 .slide-img
    this.textBox =this.box.children().eq(1);//获取轮播图片容器 .slide-tetx
    this.len = this.imgBox.children().length;//获取图片的数量
    this.page=0;
    this.play=true;
    //执行初始化
    this.init();
}

//通过原型添加方法 move 只执行切换效果
Slide.prototype.move=function(){
    this.imgBox.stop().animate({"left":-666*this.page},800);
    this.textBox.children().eq(this.page).addClass("active").siblings().removeClass("active");
}
//定义一个自动切换的函数
Slide.prototype.auto=function(){
    var _this_ = this;
    if(this.play){
        this.move();
        this.page++;
        this.page%=this.len; // = > page = page % len
        console.log(this)
    }
    setTimeout(function(){
        _this_.auto();
    },1000)
}
//定义鼠标悬停，暂停自动播放
Slide.prototype.hoverEvent=function(){
    var _this_ = this;
    this.box.hover(function(){
        _this_.play=false;
    },function(){
        _this_.play=true;
    })
}
//定义一个轮播初始化函数
Slide.prototype.init=function(){
    this.auto();
    this.hoverEvent();
}


//创建轮播对象
    var s1 = new Slide('#s1');
    var s2 = new Slide('#s2');
    var s3 = new Slide('#s3');
