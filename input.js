import Game from "./game.js";

// import Paddle from "./paddle.js";

export default class InputHandler {
    constructor(paddle, Game){
        document.addEventListener('keydown', (e) => {
            // alert(e.keyCode)
            switch (e.keyCode) {
                case 37: 
                    // alert ('move left')
                    paddle.moveleft();
                    break;
                case 39:
                    // alert ('move right')
                    paddle.moveright();
                    break;
                case 27:
                    Game.togglePause();
                    break;

                    case 32:
                    Game.start();
                    break;

            }
        })

        document.addEventListener('keyup', (e) => {
            // alert(e.keyCode)
            switch (e.keyCode) {
                case 37: 
                    paddle.stop();
                    break;
                case 39:
                    paddle.stop();
                    break; 
            }
        })
    }
}