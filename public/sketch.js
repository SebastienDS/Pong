let socket

function setup () { 
    createCanvas(1000, 600)

    socket = io.connect('http://localhost:8000')
}    

function draw () { 
    background(220)
}