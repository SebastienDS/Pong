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
    }

    moveUp () {
        this.pos.y -= 5
        if (this.pos.y < 0) {
            this.pos.y = 0
        }
    }

    moveDown () {
        this.pos.y += 5
        if (this.pos.y + this.size.height > this.screenSize.height) {
            this.pos.y = this.screenSize.height - this.size.height
        }
    }
}

module.exports = Player