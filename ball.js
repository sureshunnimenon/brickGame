export default class Ball {
    constructor(game){
        this.imgBall = document.getElementById("img_ball")

        this.position = {x:10, y:10}
        this.speed = { x: 2, y:2}
        this.size = 12;

        this.game = game;

        this.gameheight = game.gameheight;
        this.gamewidth = game.gamewidth;
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
        //checks if the ball is hitting the top or bottom 
        if (this.position.y + this.size > this.gameheight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        // checks if the ball is hitting the paddle
        if (this.position.y + this.size >= this.game.paddle.position.y){
            // alert('hit') 
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }
}