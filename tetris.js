let canvas = document.getElementById("game-canvas") 
let scoreboard = document.getElementById("scoreboard") 
let ctx = canvas.getContext("2d");
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH) 
let model = new GameModel(ctx)

let score = 0 

setInterval(() => {
    newGameState()
}, 1000);


let newGameState = () => {
    fullSend() 
    if (model.fallingPiece === null) {
        const rand = Math.round(Math.random() * 6) + 1
        const newPiece = new Piece(SHAPES[rand], ctx) 
        model.fallingPiece = newPiece 
        model.moveDown()
    } else {
        model.moveDown()
    }
}
//scoreboard
const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            score += SCORE_WORTH 
            model.grid.splice(i, 1) 
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }

    scoreboard.innerHTML = "Score: " + String(score)
} 
//key controls
document.addEventListener("keydown", (e) => {
    e.preventDefault() 
    switch(e.key) {
        case "ArrowUp":
            model.rotate() 
            break 
        case "ArrowDown": 
            model.moveDown() 
            break
        case "ArrowRight":
            model.move("right") 
            break 
        case "ArrowLeft":
            model.move("left") 
            break
    }
})