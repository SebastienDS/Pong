class Player {

    constructor (socket, pos, size, screenSize) {
        this.socket = socket
        this.pos = pos
        this.size = size
        this.screenSize = screenSize
        this.initListener()
    }

    initListener () {   
        this.socket.on("up", () => {
            this.pos.y -= 5
            if (this.pos.y < 0) {
                this.pos.y = 0
            }
        })

        this.socket.on("down", () => {
            this.pos.y += 5
            if (this.pos.y + this.size.height > this.screenSize.height) {
                this.pos.y = this.screenSize.height - this.size.height
            }
        })
    }
}

module.exports = Player