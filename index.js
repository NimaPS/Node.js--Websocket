var express=require("express")
var socket = require('socket.io')
//app setup
const app=express()
const server= app.listen(2000, ()=>console.log(" listen to 2000"))

//static file
app.use(express.static('public'))// 'public' :: folder to serve
//so express says: i will look in the public folder if i found a static file (html)
// in it i will serve it to you,, other files you will them by urself


//we install socket in both sides / server/client so they cn contact each other

//socket set up //() ==> invoke
var io=socket(server) //we pass the server we want work with

//want to listen for a connection event //from two sides, and we pass a function to fires when connection occurs
// and in the function we can pass a variable refers to the socket is made
io.on('connection', function(socket){
    console.log('socket ID: '+ socket.id)
    socket.on('chat', function(data){
        //we want to send the data to all clients connected to the server
        io.sockets.emit('chat', data) //sockets not socket
    })

    socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)// emit it to everyone but not to the sender
    })

})

//we have to install socket in the front end to get connection result
//go to https://cdnjs.com/libraries/socket.io website ->copy-> put it
// inside script in the html file

