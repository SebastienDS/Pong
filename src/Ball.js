class Ball {

    constructor (pos, speed, ballSize, screenSize) {
        this.pos = pos
        this.speed = speed
        this.size = ballSize
        this.screenSize = screenSize
        this.bounceCount = 0
    }

    move () {
        this.pos.x += this.speed.dx
        this.pos.y += this.speed.dy
        this.bounce()
    }

    bounce () {
        if (this.pos.x < 0) {
            this.pos.x = 0
            this.speed.dx *= -1
            this.bounceCount++
        } else if (this.pos.x >= this.screenSize.width) {
            this.pos.x = this.screenSize.width
            this.speed.dx *= -1
            this.bounceCount++
        }

        if (this.pos.y < 0) {
            this.pos.y = 0  
            this.speed.dy *= -1
            this.bounceCount++
        } else if (this.pos.y >= this.screenSize.height) {
            this.pos.y = this.screenSize.height
            this.speed.dy *= -1
            this.bounceCount++
        }
    } 

}

module.exports = Ball