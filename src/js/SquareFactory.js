
function SquareFactory() {

}

SquareFactory.create = function(type,x,y,color){
    //如果该类型不存在，弹出一个错误
    if(SquareFactory.prototype[type] == undefined){
        throw 'this type is undefined';
    }

    //如果工厂的该类型没有继承自工厂，则继承
    //下面要用到工厂的方法
    if(SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype){
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    let newSquare = new SquareFactory.prototype[type](x,y,color);

    return newSquare;
}
SquareFactory.prototype.init = function(Square,color,strategyMessage){
    Square.viewContent.style.position = "absolute";
    Square.viewContent.style.width = Square.width + "px";
    Square.viewContent.style.height = Square.height + "px";
    Square.viewContent.style.top = Square.y*SQUAREWIDTH + "px";
    Square.viewContent.style.left = Square.x*SQUAREWIDTH + "px";
    Square.viewContent.style.backgroundColor = color;
    Square.touch = function () {
        return strategyMessage;
    }
}
SquareFactory.prototype.Floor = function(x,y,color){
    let obj = new Floor(x,y,SQUAREWIDTH,SQUAREWIDTH);
    // console.log(this);
    this.init(obj,color,TOUCHENUM.MOVE);
    return obj;
}

SquareFactory.prototype.Stone = function(x,y,color){
    let obj = new Stone(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(obj,color,TOUCHENUM.DIE);
    return obj;
}
SquareFactory.prototype.Food = function(x,y,color){
    let obj = new Food(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(obj, color, TOUCHENUM.EAT);
    obj.update(x,y);
    return obj;
}
SquareFactory.prototype.SnakeHead = function(x,y,color){
    let obj = new SnakeHead(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(obj, color, TOUCHENUM.DIE);
    obj.update(x,y);
    return obj;
}
SquareFactory.prototype.SnakeBody = function(x,y,color){
    let obj = new SnakeBody(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(obj, color, TOUCHENUM.DIE);
    obj.update(x,y);
    return obj;
}
