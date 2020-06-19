let socket
let waitingEnnemy = true

function setup () { 
    createCanvas(1000, 600)

    textSize(50);
    textAlign(CENTER, CENTER);

    socket = io.connect('http://localhost:8000')
    socket.on("ready", () => {
        waitingEnnemy = false
    })

    socket.on("data", (data) => {
        background(220)
        fill(0)
        ellipse(data.ball.x, data.ball.y, data.ball.size, data.ball.size)

        text(`Bounce: ${data.bounceCount}`, width / 2, 50)
    })
}    

function draw () { 
    if (waitingEnnemy) {
        background(220)
        text("Waiting ennemy", width / 2, height / 2)
    }

}