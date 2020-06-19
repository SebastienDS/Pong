let socket
let waitingEnnemy = true

function setup () { 
    createCanvas(1000, 600)

    textSize(50);
    textAlign(CENTER, CENTER);

    socket = io.connect("/")
    socket.on("ready", () => {
        waitingEnnemy = false
    })

    socket.on("gameEnded", () => {
        background(220)
        text('Game Ended ... Please refresh', width / 2, height / 2)
    })

    socket.on("data", (data) => {
        background(220)
        fill(0)
        ellipse(data.ball.x, data.ball.y, data.ball.size, data.ball.size)

        text(`Bounce: ${data.bounceCount}`, width / 2, 50)

        data.players.forEach(player => {
            rect(player.x, player.y, player.width, player.height)
        });
    })
}    

function draw () { 
    if (waitingEnnemy) {
        background(220)
        text("Waiting ennemy", width / 2, height / 2)
    } else {
        if (keyIsDown(UP_ARROW)) {
            socket.emit("up")
        }
        
        if (keyIsDown(DOWN_ARROW)) {
            socket.emit("down")
        }
    }
    
}