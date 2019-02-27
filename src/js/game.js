let game = new Game();

game.score = 0;
game.speed = INTERVAL;
game.timer = null;
game.cd = 100;

game.init = function () {
    ground.init();
    snake.init();
    createFood(ground);
    

    document.addEventListener("keydown",tool.throttle((ev)=>{
        if(ev.which == 37 && snake.direction != DIRECTIONENUM.Right){
            snake.direction = DIRECTIONENUM.Left;
        }
        else if(ev.which == 38 && snake.direction != DIRECTIONENUM.Down){
            snake.direction = DIRECTIONENUM.Up;
        }
        else if(ev.which == 39 && snake.direction != DIRECTIONENUM.Left){
            snake.direction = DIRECTIONENUM.Right;
        }
        else if(ev.which == 40 && snake.direction != DIRECTIONENUM.Up){
            snake.direction = DIRECTIONENUM.Down;
        }
    },game.cd))
    game.start(ground);
}

game.start = function (ground) {
    clearInterval(this.timer);
    this.timer = setInterval(()=>{
        snake.move(ground);
    },this.speed)
}


game.over = function () {
    clearInterval(this.timer);
    alert('game over');
}


function createFood(ground){
    let x = null;
    let y = null;
    let flag;
    while(1){
        flag = true;
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        for(let i = snake.head; i; i = i.next){
            if(x == i.x && y == i.y){
                flag = false;
                break;
            }
        }
        if(flag){
            console.log("food " + x + " " + y);
            break;
        }
    }
    let food = SquareFactory.create("Food", x, y, "green");
    ground.remove(food.x,food.y);
    ground.append(food);
    console.log(food);
}

game.init();