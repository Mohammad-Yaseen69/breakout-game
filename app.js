const canvas = document.querySelector('canvas')
let canvasWidth = 500;
let canvasHeight = 500;
let context;

// Player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocity = 10;

// Ball
let ballWidth = 10
let ballHeight = 10
let ballVelocityX = 3
let ballVelocityY = 2

const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: ballWidth,
    height: ballHeight,
    VelocityX: ballVelocityX,
    VelocityY: ballVelocityY
}


const player = {
    x: canvasWidth / 2 - playerWidth / 2,
    y: canvasHeight - playerHeight - 5,
    height: playerHeight,
    width: playerWidth,
    playerVelocity: playerVelocity
}

window.onload = () => {
    canvas.height = canvasHeight
    canvas.width = canvasWidth
    context = canvas.getContext('2d')

    requestAnimationFrame(update)
    document.addEventListener('keydown', movePlayer)
}


function outOfBorder(XPosition) {
    return (XPosition < 0 || XPosition + playerWidth > canvasWidth)
}

function update() {
    requestAnimationFrame(update)

    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = 'lightgreen'
    context.fillRect(player.x, player.y, player.width, player.height)

    context.fillStyle = 'white'
    ball.x += ball.VelocityX
    ball.y += ball.VelocityY
    context.fillRect(ball.x, ball.y, ball.width, ball.height)

    // Bounce Off
    if (ball.y <= 0) {
        ball.VelocityY *= -1
    }
    else if (ball.x <= 0 || ball.x + ball.width >= 500) {
        ball.VelocityX *= -1
    }
    else if (ball.y >= 500) {
        ball.x = canvasWidth / 2
        ball.y = canvasHeight / 2
    }

    if (topCollision(ball, player)) {
        ball.VelocityY *= -1
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.VelocityX *= -1
    }
    else if(bottomCollision(ball , player)){
        ball.x = canvasWidth / 2
        ball.y = canvasHeight / 2 
    }
}

function movePlayer(e) {
    if (e.code == 'ArrowLeft') {
        let currentPosition = player.x - player.playerVelocity
        if (!outOfBorder(currentPosition)) {
            player.x = currentPosition
        }
    }

    else if (e.code == 'ArrowRight') {
        let currentPosition = player.x + player.playerVelocity;
        if (!outOfBorder(currentPosition)) {
            player.x = currentPosition
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
}

function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y
}
function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y
}
function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.y
}
function rightCollision(ball, block) {
    return detectCollision(ball, block) && (block.x + block.width) >= ball.y
}