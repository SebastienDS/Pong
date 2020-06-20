const Component = require('./Component.js')

class Player extends Component {

    constructor (socket, pos, size, screenSize) {
        super(pos, size, screenSize)
        this.socket = socket
        this.initListener()
    }

    initListener () {   
        this.socket.on("up", () => {
            this.moveUp()
        })

        this.socket.on("down", () => {
            this.moveDown()
        })

        this.socket.on("mouseMoved", (data) => {
            this.pos.y = data.position
            this.limitMovement()
        })
    }

    moveUp () {
        this.pos.y -= 5
        this.limitMovement()
    }

    moveDown () {
        this.pos.y += 5
        this.limitMovement()
    }

    limitMovement () {
        if (this.pos.y < 0) {
            this.pos.y = 0
        } else if (this.pos.y + this.size.height > this.screenSize.height) {
            this.pos.y = this.screenSize.height - this.size.height
        }
    }
}

module.exports = Player