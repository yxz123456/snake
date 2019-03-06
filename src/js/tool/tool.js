let tool = {
    //原型上的继承
    inherit(Target,Origin){
        function temp() {}
        temp.prototype = Origin.prototype
        Target.prototype = new temp()
        Target.prototype.constuctor = Target
        Target.prototype.uber = Origin
    },
    //继承私有属性
    extends(origin){
        let result = function () {
            origin && origin.apply(this, arguments)
        }
        this.inherit(result,origin)
        return result
    },
    //单例模式
    single(origin){
        let singleResult = (function(){
            let instance
            return function(){
                if( typeof instance == 'object' ){
                    return instance
                }
                instance = this
                origin && origin.apply(this, arguments)
                return instance
            }
        })()
        origin && tool.inherit(singleResult, origin)
        return singleResult
    },
    //防抖
    throttle(handle,waitTime){
        let lastTime = 0
        return function () {
            let curTime = new Date().getTime()
            if(curTime - lastTime >= waitTime){
                handle.apply(this,arguments)
                lastTime = curTime
            }
        }
    }
}


