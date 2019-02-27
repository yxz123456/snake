let snake = new Snake();
//头
snake.head = null;
//尾
snake.tail = null;

//方向枚举
let DIRECTIONENUM = {
    Right:{
        x:1,
        y:0
    },
    Left:{
        x:-1,
        y:0
    },
    Up:{
        x:0,
        y:-1
    },
    Down:{
        x:0,
        y:1
    }
}

//蛇初始化
snake.init = function () {
    let snakeHead = SquareFactory.create('SnakeHead',3,1,'red');
    let snakeBody1 = SquareFactory.create('SnakeBody',2,1,"blue");
    let snakeBody2 = SquareFactory.create('SnakeBody',1,1,"blue");

    console.log(this == snake);//true


    snake.head = snakeHead;
    snake.tail = snakeBody2;

    //链表连接
    snakeHead.next = snakeBody1;
    snakeHead.prev = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.prev = snakeHead;
    snakeBody2.next = null;
    snakeBody2.prev = snakeBody1;

    //显示
    ground.remove(snakeHead.x,snakeHead.y);
    ground.remove(snakeBody1.x,snakeBody1.y);
    ground.remove(snakeBody2.x,snakeBody2.y);
    ground.append(snakeHead);
    ground.append(snakeBody1);
    ground.append(snakeBody2);

    //初始移动方向
    this.direction = DIRECTIONENUM.Right;
}

snake.strategies = {
    //flag move为true eat为false
    move(snake,ground,nextSquare,flag=true) {

        //新建身
        let newBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'blue');

        //融入
        newBody.next = snake.head.next;
        newBody.prev = null;
        newBody.next.prev = newBody;
        ground.remove(snake.head.x,snake.head.y);
        ground.append(newBody);

        //新建头
        let newHead = SquareFactory.create('SnakeHead',nextSquare.x,nextSquare.y,'red');

        //连接
        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;
        ground.remove(nextSquare.x,nextSquare.y);
        ground.append(newHead);

        //去掉尾巴并安上地板
        if(flag){
            ground.remove(snake.tail.x,snake.tail.y);

            let newFloor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'orange');

            ground.append(newFloor);
            snake.tail = snake.tail.prev;
            snake.tail.next = null;
        }

        snake.head = newHead;
    },
    eat(snake,ground,nextSquare) {
        game.score++;
        snake.strategies.move(snake,ground,nextSquare,false);
        createFood(ground);
    },
    die(){
        game.over();
    }
}

//移动
snake.move = function(ground){
    //找到当前移动方向的下一格
    let nextSquare = ground.squareList[this.head.y + this.direction.y][this.head.x + this.direction.x];
    //console.log(nextSquare);
    if(typeof nextSquare.touch == 'function'){
        //console.log(nextSquare.touch());
        snake.strategies[nextSquare.touch()](this,ground,nextSquare);
    }
}



