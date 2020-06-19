const Ball = require('./Ball.js')
const Player = require('./Player.js')


class Room {

    constructor (player1, player2, screenSize) {
        console.log("New Room")
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
        }, 15, this.screenSize)
        this.players.forEach(player => {
            player.socket.emit("ready")
        })
        this.startGame()
    }

    startGame () {
        setInterval(() => {
            this.sendData()
            this.ball.move()
        }, 30);
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
                    size: this.ball.size
                },
                players: playersData,
                bounceCount: this.ball.bounceCount
            })
        })
    }
}

module.exports = Room