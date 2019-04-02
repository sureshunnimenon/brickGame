import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'
import Brick from './brick.js'
import { buildLevel, level1, level2 }  from './levels.js'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {
    constructor(gamewidth, gameheight){
        this.gamewidth = gamewidth;
        this.gameheight = gameheight; 
        
        this.gamestate = GAMESTATE.MENU
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);  
        new InputHandler(this.paddle, this);
        this.gameObjects = []
        this.bricks = []
        this.lives = 1;

        this.levels = [level1, level2]
        this.currentlevel = 0;
    }   

    start(){
        
        // this.brick = new Brick(this, {x:20, y:20}) -- testing for a single brick
        // now a group of bricks using array
        // let bricks = []
        // for (let i=0; i<10; i++){
        //     bricks.push(new Brick(this, {x: i*80, y: 24}))
        // } -- this testing is also over

        if(this.gamestate !== GAMESTATE.MENU & this.gamestate !== GAMESTATE.NEWLEVEL){
            return
        }

        // now let us build using the level function
        this.bricks = buildLevel(this, this.levels[this.currentlevel])
        this.ball.reset();
        
        this.gameObjects = [this.ball, this.paddle]     
        this.gamestate = GAMESTATE.RUNNING  
    }

    update(deltaTime){
        // this.paddle.update(deltaTime)        
        // this.ball.update(deltaTime);
        if (this.lives === 0) {this.gamestate = GAMESTATE.GAMEOVER}
        if (this.gamestate == GAMESTATE.PAUSED  || 
            this.gamestate == GAMESTATE.MENU || 
            this.gamestate == GAMESTATE.GAMEOVER) {return}

        if (this.bricks.length === 0){
            // console.log("new level to be loaded")
            this.currentlevel++;
            this.gamestate = GAMESTATE.NEWLEVEL
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime))
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)
    }

    draw(ctx){
        // this.paddle.draw(ctx)
        // this.ball.draw(ctx);
        [...this.gameObjects, ...this.bricks].forEach(obj=>obj.draw(ctx))

        if (this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0,0,this.gamewidth, this.gameheight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill();

            ctx.font="30px Arial"
            ctx.fillStyle="white"
            ctx.textAlign = "center"
            ctx.fillText("paused", this.gamewidth/2, this.gameheight/2)

        }

        if (this.gamestate == GAMESTATE.MENU){
            ctx.rect(0,0,this.gamewidth, this.gameheight)
            ctx.fillStyle = "rgba(0,0,0,0.9)"
            ctx.fill();

            ctx.font="30px Arial"
            ctx.fillStyle="white"
            ctx.textAlign = "center"
            ctx.fillText("START THE GAME- PRESS SPACEBAR", this.gamewidth/2, this.gameheight/2)

        }

        if (this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0,0,this.gamewidth, this.gameheight)
            ctx.fillStyle = "rgba(0,0,0,0.7)"
            ctx.fill();

            ctx.font="30px Arial"
            ctx.fillStyle="white"
            ctx.textAlign = "center"
            ctx.fillText("GAME OVER!!", this.gamewidth/2, this.gameheight/2)

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