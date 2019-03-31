export default class Paddle {
    constructor(game){
        this.gameheight=game.gameheight;
        this.gamewidth=game.gamewidth;
        this.width=150;
        this.height=10;
        this.maxspeed = 5;
        this.speed=0;
        this.position= {
            x: game.gamewidth/2 - this.width/2,
            y: game.gameheight-this.height -2
        }
    }

    draw(ctx){
        ctx.fillStyle = 'brown'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime){
        if(!deltaTime) return;
        // this.position.x += 5/deltaTime -- auto move- commented out since this will be through keyevents
    }

    moveleft(){
        this.speed = this.maxspeed
        this.position.x -= this.speed
        if(this.position.x < 0) this.position.x=0
    }

    moveright(){
        this.speed = this.maxspeed;
        this.position.x += this.speed
        if(this.position.x + this.width > this.gamewidth) this.position.x = this.gamewidth -this.width;
    }

    stop(){
        this.speed = 0;
    }
}



