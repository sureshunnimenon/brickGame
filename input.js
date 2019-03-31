// import Paddle from "./paddle.js";

export default class InputHandler {
    constructor(paddle){
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