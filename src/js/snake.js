let snake = new Snake()
snake.head = null
snake.tail = null

let DIRECTIONENUM = {
    right: {
        x: 1,
        y: 0,
        name:'right'
    },
    left: {
        x: -1,
        y: 0,
        name:'left'
    },
    up: {
        x: 0,
        y: -1,
        name:'up'
    },
    down: {
        x: 0,
        y: 1,
        name:'down'
    }
}

snake.init = function () {
    //初始化
    let snakeHead = SquareFactory.create('snakeHead', 3, 1)
    let snakeBody1 = SquareFactory.create('snakeBody', 2, 1)
    let snakeBody2 = SquareFactory.create('snakeBody', 1, 1)

    //双向链表连接
    snakeHead.next = snakeBody1
    snakeHead.prev = null

    snakeBody1.next = snakeBody2
    snakeBody1.prev = snakeHead

    snakeBody2.next = null
    snakeBody2.prev = snakeBody1

    this.head = snakeHead
    this.tail = snakeBody2

    //放入ground
    ground.append(snakeHead)
    ground.append(snakeBody1)
    ground.append(snakeBody2)

    //初始移动方向
    this.direction = DIRECTIONENUM.right
}

snake.strategies = {
    //flag判断是移动还是吃
    move(snake,nextSquare,flag=false) {
        //创建一个新的body
        let newBody = SquareFactory.create('snakeBody', snake.head.x, snake.head.y)
        
        //新body融入
        newBody.prev = snake.head
        newBody.next = snake.head.next
        newBody.next.prev = newBody
        snake.head.next = newBody
        //删除原来的头，插入身体
        ground.remove(snake.head.x, snake.head.y)
        ground.append(newBody)
        // 创建新头
        let newHead = SquareFactory.create('snakeHead', nextSquare.x, nextSquare.y)
        
        // 连接
        newHead.next = newBody
        newHead.prev = null
        newBody.prev = newHead

        snake.head = newHead
        snake.headTurn(snake.direction.name)
        // 删除下一个方块,放入新头
        ground.remove(nextSquare.x, nextSquare.y)
        ground.append(newHead)

        //如果不是吃
        if (!flag) {
            let newFloor = SquareFactory.create('floor', snake.tail.x, snake.tail.y)
            //删除原来的尾巴，放入地板
            ground.remove(snake.tail.x, snake.tail.y)
            ground.append(newFloor,true)

            //新尾巴
            snake.tail = snake.tail.prev
            snake.tail.next = null
        }      
    },
    eat (snake,nextSquare) {
        game.score++
        game.upDateScore()
        snake.strategies.move(snake,nextSquare,true)
        game.createFood()
    },
    die () {
        game.over()
    }
}

snake.move = function () {
    //找到下一个方块
    let nextSquare = ground.squareTable[this.head.x + this.direction.x][this.head.y + this.direction.y]
    
    if(typeof nextSquare.touch == 'function'){
        this.strategies[nextSquare.touch()](this,nextSquare)
    }
}

snake.headTurn = function (direction){
    if(direction !== 'right'){
        snake.head.viewContent.className = 'square snakeHead ' + 'snakeHead-' + direction
    }
    else{
        snake.head.viewContent.className = 'square snakeHead'
    }
    
}

