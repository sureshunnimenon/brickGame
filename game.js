import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'
import Brick from './brick.js'
import { buildLevel, level1 }  from './levels.js'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor(gamewidth, gameheight){
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;        
    }   

    start(){
        this.gamestate = GAMESTATE.RUNNING
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);  
        // this.brick = new Brick(this, {x:20, y:20}) -- testing for a single brick
        // now a group of bricks using array
        // let bricks = []
        // for (let i=0; i<10; i++){
        //     bricks.push(new Brick(this, {x: i*80, y: 24}))
        // } -- this testing is also over

        // now let us build using the level function
        let bricks = buildLevel(this, level1)
        
        this.gameObjects = [this.ball, this.paddle, ...bricks]

        new InputHandler(this.paddle, this);
    }

    update(deltaTime){
        // this.paddle.update(deltaTime)        
        // this.ball.update(deltaTime);
        if (this.gamestate == GAMESTATE.PAUSED) return;

        this.gameObjects.forEach(obj => obj.update(deltaTime))
        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion)
    }

    draw(ctx){
        // this.paddle.draw(ctx)
        // this.ball.draw(ctx);
        this.gameObjects.forEach(obj=>obj.draw(ctx))

        if (this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0,0,this.gamewidth, this.gameheight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill();

            ctx.font="30px Arial"
            ctx.fillStyle="white"
            ctx.textAlign = "center"
            ctx.fillText("paused", this.gamewidth/2, this.gameheight/2)

        }
        
    }

    togglePause(){
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }
     }
}