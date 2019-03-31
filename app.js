import Game from "./game.js";


let canvas= document.getElementById("brickGame");
let ctx = canvas.getContext("2d");

const GAME_HEIGHT = canvas.height
const GAME_WIDTH = canvas.width;

// ctx.clearRect(0,0,canvas.width,canvas.height)

// ctx.fillStyle = "blue"
// ctx.fillRect(20,20,100,100) -- just for testing- commented out after test
let game = new Game(GAME_WIDTH, GAME_HEIGHT)
game.start();

// paddle.draw(ctx)

let lastTime =0;

// images

// let imgBall = document.getElementById("img_ball") -- refactored into separate class

function gameLoop(timestamp){
    let deltaTime = timestamp-lastTime 
    lastTime = timestamp

    ctx.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT)
    // paddle.update(deltaTime)
    // paddle.draw(ctx)
    // // console.log('did')
    // // ctx.drawImage(imgBall, 10,10, 20, 20) -- re factored nto separate class
    // ball.draw(ctx);
    // ball.update(deltaTime);

    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
    
}

gameLoop()
