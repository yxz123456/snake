let ground = new Ground(BASE_GROUND_X,BASE_GROUND_Y)

ground.init = function () {
    this.viewContent.className = 'ground'
    this.squareTable = []
    this.putSquare()
    document.getElementsByClassName('wrapper')[0].appendChild(this.viewContent)

}

ground.putSquare = function () {
    let squareList
    for(let i = 0; i < LENX; i++){
        squareList = []
        for(let j = 0; j < LENY; j++){
            let square = null
            //根据情况建造方块
            if(i == 0 || i == LENX - 1 || j == 0 || j == LENY - 1){
                //放墙
                square = SquareFactory.create('stone', i, j)
                //放入广场
                this.viewContent.appendChild(square.viewContent)
            }
            else{
                //放地板
                square = SquareFactory.create('floor', i, j)
            }
            squareList.push(square)
        }
        this.squareTable.push(squareList)
    }
}


ground.remove = function (x,y) {
    //视觉上拆 
    if(this.squareTable[x][y].viewContent.parentNode === this.viewContent){
        this.viewContent.removeChild(this.squareTable[x][y].viewContent)
    }
    //数据上拆
    this.squareTable[x][y] = null
}

ground.append = function (square,flag=false) {
    //视觉上安
    if(!flag){
        this.viewContent.appendChild(square.viewContent)
    }
    
    //数据上安
    this.squareTable[square.x][square.y] = square
}