//游戏广场的位置
const BASE_GROUND_X = 400
const BASE_GROUND_Y = 60

//方块的宽高
const SQUAREWIDTH = 20


//长度系数
const LENY = 30
const LENX = 30

//移动速度
const SPEED = 300

let score = document.getElementsByClassName('score')[0]
let stop = document.getElementsByClassName('stop')[0]
let restart = document.getElementsByClassName('restart')[0]
//方块类
function Square(x,y,width,height,dom){
    this.x = x
    this.y = y
    this.width = width + 'px'
    this.height = height + 'px'
    this.viewContent = dom || document.createElement('div')
}

Square.prototype.touch = function () {

}

Square.prototype.upDate = function (x,y) {
    this.x = x
    this.y = y
}

let Stone = tool.extends(Square)
let Floor = tool.extends(Square)
let SnakeBody = tool.extends(Square)
let SnakeHead = tool.single(Square)
let Snake = tool.single()
let Food = tool.single(Square)
let Ground = tool.single(Square)
let Game = tool.single()


let ACTIONENUM = {
    eat:'eat',
    move:'move',
    die:'die'
}