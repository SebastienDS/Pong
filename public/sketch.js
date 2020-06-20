let socket
let waitingEnnemy = true
let playerNum

function setup () { 
    createCanvas(1000, 600)

    textSize(50);
    textAlign(CENTER, CENTER);

    socket = io.connect("/")
    socket.on("ready", (data) => {
        waitingEnnemy = false
        playerNum = data.player
    })

    socket.on("gameEnded", (data) => {
        background(220)
        fill(0)
        text('Game Ended', width / 2, height / 3)
        text(`Game will restart in ${data.timeLeft} seconds`, width / 2, height * 2 / 3)
    })

    socket.on("data", (data) => {
        background(220)
        fill(0)
        ellipse(data.ball.x, data.ball.y, data.ball.size, data.ball.size)

        text(`Bounce: ${data.bounceCount}`, width / 2, 50)
        text(`${data.wins[0]} - ${data.wins[1]}`, width / 2, 100)

        data.players.forEach((player, i) => {
            if (playerNum === i) {
                fill(255, 0, 0)
            } else {
                fill(0)
            }
            rect(player.x, player.y, player.width, player.height)
        });
    })
}    

function draw () { 
    if (waitingEnnemy) {
        background(220)
        fill(0)
        text("Waiting enemy", width / 2, height / 2)
    } else {
        if (keyIsDown(UP_ARROW)) {
            socket.emit("up")
        }
        
        if (keyIsDown(DOWN_ARROW)) {
            socket.emit("down")
        }
    }
    
}

function mouseMoved () {
    socket.emit("mouseMoved", {
        position: mouseY
    })
}