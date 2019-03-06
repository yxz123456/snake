let game = new Game()

game.score = 0
game.speed = SPEED
game.timer = null
game.stop = 0
game.cd = 100

game.init = function(){
    ground.init()
    snake.init()
    this.start()
    this.createFood()

    //绑定上下左右事件
    document.addEventListener('keydown', tool.throttle((e) => {
        if(e.which == 37 && snake.direction !== DIRECTIONENUM.right){
            snake.direction = DIRECTIONENUM.left
            snake.headTurn('left')
        }
        else if(e.which == 38 && snake.direction !== DIRECTIONENUM.down){
            snake.direction = DIRECTIONENUM.up
            snake.headTurn('up')
        }
        else if(e.which == 39 && snake.direction !== DIRECTIONENUM.left){
            snake.direction = DIRECTIONENUM.right
            snake.headTurn('right')
        }
        else if(e.which == 40 && snake.direction !== DIRECTIONENUM.up){
            snake.direction = DIRECTIONENUM.down
            snake.headTurn('down')
        }
    },game.cd))

    stop.addEventListener('click', () =>{
        clearInterval(game.timer)
        if(game.stop){
            stop.innerText = '开始'
            console.log('暂停')
            game.stop = 0
        }
        else{
            game.stop = 1
            stop.innerText = '暂停'
            game.start()
            console.log('开始')
        }
    })

    restart.addEventListener('click', () => {
        location.replace(location.href)
    })

}

game.upDateScore = function () {
    score.innerText = '分数: ' + game.score
}

game.start = function () {
    clearInterval(game.timer)
    game.timer = setInterval(() => {
        snake.move()
    },this.speed)
}

game.over = function () {
    clearInterval(game.timer)
    alert('game over, 你的得分为' + game.score)
}

game.createFood = function () {
    let x = null
    let y = null
    let flag
    
    while(1){
        flag = true
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        for(let i = snake.head; i ; i = i.next){
            if(x == i.x && y == i.y){
                flag = false
                break
            }
        }
        if(flag){
            break
        }
    }
    console.log('food',x,y)
    let newFood = SquareFactory.create('food', x, y)
    console.log(newFood)
    ground.remove(x, y)
    ground.append(newFood)

}
game.init()