const express = require('express')
const socket = require('socket.io')
const app = express()
const port = 8000

app.use(express.static('public'))

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

const io = socket(server)

io.sockets.on('connection', (socket) => {
    console.log(`[+] ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`[-] ${socket.id}`)
    })
})
