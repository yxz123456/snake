let tool = {
    //原型层上的继承
    inherit(target, origin) {
        let temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    //私有属性继承
    extends(origin){
        let result = function (){
            origin.apply(this,arguments);
        };
        this.inherit(result,origin);

        return result;
    },
    //单例模式
    single(origin){
        let singleResult = (function () {
            let instance;
            return function () {
                //console.log(typeof instance)
                if (typeof instance == 'object') {
                    return instance;
                }
                instance = this;
                origin && origin.apply(this,arguments);
                return instance;
            }
        })();
        origin && this.inherit(singleResult,origin);
        return singleResult;
    },
    throttle(method, waitTime){
        let lastTime = 0
        return function(){
            let currentTime = new Date().getTime()
            if(currentTime - lastTime >= waitTime){
                method.apply(this,arguments)
                lastTime = currentTime
            }
            
        }
    }
}


function Square(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

//触碰的抽象方法
Square.prototype.touch = function () {
    console.log("touch");
}



// console.log(oF);