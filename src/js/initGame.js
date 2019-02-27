//游戏广场的位置
const BASE_X_POINT = 200;
const BASE_Y_POINT = 100;

//方块的宽度
const SQUAREWIDTH = 20;




//宽度系数 高度系数
const XLEN = 30;
const YLEN = 30;


//蛇移动的时间间隔
const INTERVAL = 300;

//定义基类 父类
function Square(x,y,width,height,dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.touch = function () {

}

Square.prototype.update = function(x,y){
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x*SQUAREWIDTH +'px';
    this.viewContent.style.top = y*SQUAREWIDTH +'px';
}
//定义子类

let Food = tool.single(Square);
let SnakeHead = tool.single(Square);
let SnakeBody = tool.extends(Square);
let Snake = tool.single(Square);
let Floor = tool.extends(Square);
let Stone = tool.extends(Square);
let Ground = tool.single(Square);

//其他子类
let Game = tool.single();

let TOUCHENUM = {
    MOVE:'move',
    EAT:'eat',
    DIE:'die'
}
