const express = require('express')
const socket = require('socket.io')
const Room = require('./Room.js')
const app = express()
const port = 8000

const rooms = []
let playerWaiting = null

app.use(express.static('public'))

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

const io = socket(server)

io.sockets.on('connection', (socket) => {
    console.log(`[+] ${socket.id}`)
    let room = null

    if (playerWaiting === null) {
        playerWaiting = socket
    } else {
        room = new Room(playerWaiting, socket)
        playerWaiting = null
        rooms.push(room)
    }
    
    socket.on('disconnect', () => {
        console.log(`[-] ${socket.id}`)
        const index = rooms.indexOf(room)
        if (index !== -1) {
            rooms.splice(index, 1)
        } else if (socket === playerWaiting) {
            playerWaiting = null
        }
    })
})
