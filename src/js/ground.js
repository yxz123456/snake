let ground = new Ground(BASE_X_POINT,BASE_Y_POINT,XLEN*SQUAREWIDTH,YLEN*SQUAREWIDTH);

ground.init = function () {
    this.viewContent.style.position = "absolute";
    this.viewContent.style.top = this.x + "px";
    this.viewContent.style.left = this.y + "px";
    this.viewContent.style.width = this.width + "px";
    this.viewContent.style.height = this.height + "px";
    this.viewContent.style.backgroundColor = "#007165";
    document.body.appendChild(this.viewContent);

    this.squareList = [];

    for(let i = 0; i < YLEN; i++){
        //每一行的方块
        let squareX = new Array(XLEN);
        for(let j = 0; j < XLEN; j++){
            let newSquare = null;
            //墙
            if(j == 0 || j == XLEN - 1 || i == 0 || i == YLEN - 1){
                newSquare = SquareFactory.create("Stone",j,i,"#000");
            }
            //地板
            else{
                newSquare = SquareFactory.create("Floor",j,i,"orange");
            }
            this.viewContent.appendChild(newSquare.viewContent);
            squareX[j] = newSquare;
        }
        this.squareList.push(squareX);
    }
    console.log(this.squareList);
}

ground.init();

//拆方块
ground.remove = function (x,y) {
    //视觉上拆
    this.viewContent.removeChild(this.squareList[y][x].viewContent);
    //数据层面上拆
    this.squareList[y][x] = null;
}

//按方块
ground.append = function (square) {
    //视觉上安
    this.viewContent.appendChild(square.viewContent);
    //数据上安
    this.squareList[square.y][square.x] = square;
}


