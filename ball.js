import { detectCollision } from './collisionDetection.js'

export default class Ball {
    constructor(game){
        this.imgBall = document.getElementById("img_ball");
        
        this.size = 12;
        this.game = game;
        this.gameheight = game.gameheight;
        this.gamewidth = game.gamewidth;
        this.reset()
    }
    reset(){

        this.position = {x:10, y:400}
        this.speed = { x: 2, y:-2}
    }

    draw(ctx){
        ctx.drawImage(this.imgBall, this.position.x, this.position.y, this.size, this.size)
    }

    update(deltaTime){
        console.log(this.game.paddle.position.x)
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        // checks if the ball is hitting the wall on right or left
        if (this.position.x + this.size > this.gamewidth  || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        //checks if the ball is hitting the top 
        if (this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        // check if ball is hotting the bottom

        if(this.position.y + this.size > this.gameheight){
            this.game.lives --;
            this.reset()
        }

        // // checks if the ball is hitting the paddle
        // if (this.position.y + this.size >= this.game.paddle.position.y && 
        //     this.position.x >= this.game.paddle.position.x &&
        //     this.position.x+this.size <= this.game.paddle.position.x+this.game.paddle.width){
        //     // alert('hit') 
        //     this.speed.y = -this.speed.y 
        //     this.position.y = this.game.paddle.position.y - this.size
        // }

        if (detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y 
            this.position.y = this.game.paddle.position.y - this.size
        }
    }
}