import Brick from './brick.js'
export function buildLevel(game, level){
    let bricks = []

    level.forEach((row, rowindex) => {
        row.forEach((brick, brickindex) => {
            if(brick === 1){
                let position = {
                    x: 80 * brickindex,
                    y: 50 + 24 * rowindex
                }
                bricks.push(new Brick(game, position))
            }
        })
    });

    return bricks
}

export const level1 = [
    [0,1,1,0,0,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
]