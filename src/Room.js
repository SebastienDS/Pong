const Ball = require('./Ball.js')
const Player = require('./Player.js')


class Room {

    constructor (player1, player2, screenSize) {
        console.log("New Room")
        this.interval = null
        this.screenSize = screenSize
        this.players = [
            new Player(player1, {
                x: 50,
                y: 250,
            }, {
                width: 25,
                height: 75
            }, this.screenSize), 
            
            new Player(player2, {
                x: 925,
                y: 250,
            }, {
                width: 25,
                height: 75
            }, this.screenSize)
        ]
        this.ball = new Ball({
            x: 500, 
            y: 300
        }, {
            dx: 5,
            dy: 4
        }, {
            width: 15,
            height: 15
        }, this.screenSize)
        this.players.forEach(player => {
            player.socket.emit("ready")
        })
        this.startGame()
    }

    startGame () {
        this.interval = setInterval(() => {
            if (this.ball.died) {
                this.players.forEach(player => {
                    player.socket.emit("gameEnded")
                })
                this.close()
            } else {
                this.sendData()
                this.ball.move()
                this.players.forEach(player => {
                    if (player.collide(this.ball)) {
                        this.ball.bounce()
                    }
                })
            }
        }, 30);
    }

    close () {
        clearInterval(this.interval)
    }

    sendData () {
        const playersData = [];
        this.players.forEach(player => {
            playersData.push({
                x: player.pos.x,
                y: player.pos.y,
                width: player.size.width,
                height: player.size.height,
            })
        })

        this.players.forEach(player => {
            player.socket.emit("data", {
                ball: {
                    x: this.ball.pos.x,
                    y: this.ball.pos.y,
                    size: this.ball.size.width
                },
                players: playersData,
                bounceCount: this.ball.bounceCount
            })
        })
    }
}

module.exports = Room