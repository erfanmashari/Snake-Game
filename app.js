// access to canvas
const canvas = document.querySelector("#snake")
const ctx = canvas.getContext("2d")

// create unit
const box = 32

// create ground image
const ground = new Image()
ground.src = "./img/ground.png"

// create food image
const foodImg = new Image()
foodImg.src = "./img/food.png"

// create food image
const goldImg = new Image()
goldImg.src = "./img/golden.png"

// create game over image
const overImg = new Image()
overImg.src = "./img/gameover.png"

// create audios
const eat = new Audio()
const dead = new Audio()
const left = new Audio()
const up = new Audio()
const right = new Audio()
const down = new Audio()
const gameOver = new Audio()
const goldS = new Audio()

// set source for audios
eat.src = "./audio/eat.mp3"
dead.src = "./audio/dead.mp3"
left.src = "./audio/left.mp3"
up.src = "./audio/up.mp3"
right.src = "./audio/right.mp3"
down.src = "./audio/down.mp3"
gameOver.src = "./audio/gameover.mp3"
goldS.src = "./audio/gold.wav"

// make snake array
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let score = 0

// set food court
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// set gold apple court
let gold = {
    x: Math.floor(Math.random() * 17 - 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// get direction
let d;
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && d !== "RIGHT") {
        d = "LEFT"

        // play audio
        left.play()
    } else if (e.key === "ArrowUp" && d !== "DOWN") {
        d = "UP"

        // play audio
        up.play()
    } else if (e.key === "ArrowRight" && d !== "LEFT") {
        d = "RIGHT"

        // play audio
        right.play()
    } else if (e.key === "ArrowDown" && d !== "UP") {
        d = "DOWN"

        // play audio
        down.play()
    }
})

function snakeTail(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false
}

// make game function
function game() {
    // show images
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)

    // write score
    ctx.fillStyle = "white"
    ctx.font = "40px snas-serif"
    ctx.fillText(score, 2 * box, 1.6 * box)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "white";
        ctx.strokeStyle = "red"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)

        if (i > 0) {
            if (snake[i].x === food.x && snake[i].y === food.y) {
                // change food location
                food = {
                    x: Math.floor(Math.random() * 17 + 1) * box,
                    y: Math.floor(Math.random() * 15 + 3) * box
                }
            } else if (snake[i].x === gold.x && snake[i].y === gold.y) {
                // change food location
                gold = {
                    x: Math.floor(Math.random() * 17 + 1) * box,
                    y: Math.floor(Math.random() * 15 + 3) * box
                }
            }
        }
    }

    // get head court
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX === food.x && snakeY === food.y) {
        score++

        // play audio
        eat.play()

        // change food location
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        // delete tail
        snake.pop()
    }

    // show golden apple
    if (score % 5 === 0 && score !== 0) {
        // show image
        ctx.drawImage(goldImg, gold.x, gold.y)

        // play sound
        goldS.play()

        setTimeout(() => {
            goldS.pause()
        }, 400);

        if (snakeX === gold.x && snakeY === gold.y) {
            score += 7

            // play audio
            eat.play()
        }
    }

    // set events for key
    if (d === "LEFT") snakeX -= box
    if (d === "UP") snakeY -= box
    if (d === "RIGHT") snakeX += box
    if (d === "DOWN") snakeY += box

    // set new head cout
    let head = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX === 0 || snakeY === 2 * box || snakeX === 18 * box || snakeY === 18 * box || snakeTail(head, snake)) {
        clearInterval(gamePlay)

        // play audio
        dead.play()

        setTimeout(() => {
            // play audio
            gameOver.play()

            // showgame over image
            ctx.drawImage(overImg, 1.5 * box, box)
        }, 500);

        setTimeout(() => {
            // create button
            const button = document.createElement("button")
            button.classList = "col-lg-3 btn btn-danger text-white d-block mx-auto"
            button.innerHTML = "Refresh"

            // append it to html
            document.querySelector("#body").appendChild(button)

            button.addEventListener("click", e => {
                e.preventDefault()

                // reload page
                location.reload()
            })
        }, 2000);
    }

    // add head to snake Array
    snake.unshift(head)
}

const gamePlay = setInterval(game, 100)