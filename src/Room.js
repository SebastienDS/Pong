const Ball = require('./Ball.js')

class Room {

    constructor (player1, player2) {
        console.log("New Room")
        this.players = [player1, player2]
        this.players.forEach(player => {
            player.emit("ready")
        })
        this.ball = new Ball({
            x: 500, 
            y: 300
        }, {
            dx: 5,
            dy: 4
        }, 15, {
            width: 1000,
            height: 600
        })
        console.log(this.ball)
        this.startGame()
    }

    startGame () {
        setInterval(() => {
            this.sendData()
            this.ball.move()
        }, 30);
    }

    sendData () {
        this.players.forEach(player => {
            player.emit("data", {
                ball: {
                    x: this.ball.pos.x,
                    y: this.ball.pos.y,
                    size: this.ball.size
                },
                bounceCount: this.ball.bounceCount
            })
        })
    }
}

module.exports = Room