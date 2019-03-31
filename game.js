import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'

export default class Game {
    constructor(gamewidth, gameheight){
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;        
    }   

    start(){
        this.paddle = new Paddle(this)
        this.ball = new Ball(this);   
        
        this.gameObjects = [this.ball, this.paddle]

        new InputHandler(this.paddle);
    }

    update(deltaTime){
        // this.paddle.update(deltaTime)        
        // this.ball.update(deltaTime);
        this.gameObjects.forEach(obj => obj.update(deltaTime))
    }

    draw(ctx){
        // this.paddle.draw(ctx)
        // this.ball.draw(ctx);
        this.gameObjects.forEach(obj=>obj.draw(ctx))

    }
}