const Component = require('./Component.js')

class Ball extends Component {

    constructor (pos, speed, ballSize, screenSize) {
        super(pos, ballSize, screenSize)
        this.speed = speed
        this.bounceCount = 0
        this.died = false
        this.winner = null
    }

    move () {
        this.pos.x += this.speed.dx
        this.pos.y += this.speed.dy
        this.screenBounce()
    }

    screenBounce () {
        if (this.pos.x < 0) {
            this.pos.x = 0
            this.speed.dx *= -1
            this.bounceCount++
            this.died = true
            this.winner = 1
        } else if (this.pos.x >= this.screenSize.width) {
            this.pos.x = this.screenSize.width
            this.speed.dx *= -1
            this.bounceCount++
            this.died = true
            this.winner = 0 
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

    bounce () {
        this.speed.dx *= -1.1
        this.speed.dy *= this.getRandomSpeed(0.9, 1.4)

        this.bounceCount++
    }

    getRandomSpeed (min, max) {
        return Math.random() * (max - min) + min;
    }

}

module.exports = Ball