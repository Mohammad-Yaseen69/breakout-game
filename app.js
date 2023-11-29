const canvas = document.querySelector('canvas')
let canvasWidth = 500;
let canvasHeight = 500;
let context;

// Player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocity = 10;


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

    context.fillStyle = 'lightgreen'
    context.fillRect(player.x, player.y, player.width, player.height)

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
}

function movePlayer(e) {
    if (e.code == 'ArrowLeft') {
        let currentPosition = player.x - player.playerVelocity
        if (!outOfBorder(currentPosition)) {
            player.x = currentPosition
        }
    }

    else if (e.code == 'ArrowRight') {
        let currentPosition = player.x +  player.playerVelocity;
        if (!outOfBorder(currentPosition)) {
            player.x = currentPosition
        }
    }
}