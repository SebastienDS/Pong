class Component {

    constructor (pos, size, screenSize) {
        this.pos = pos
        this.size = size
        this.screenSize = screenSize
    }

    get top () { return this.pos.y }
    get bottom () { return this.pos.y + this.size.height }
    get left () { return this.pos.x }
    get right () { return this.pos.x + this.size.width } 

    collide (other) {
        return !(this.top > other.bottom || this.right < other.left || this.bottom < other.top || this.left > other.right)
    }
}


module.exports = Component