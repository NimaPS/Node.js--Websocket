//make connection
//this socket for the fron end
// we can access to io since we embeded the url for the socket io in the htnml file
var socket= io.connect('http://localhost:2000') // () where we wanna make the connection
//it deos not make sense if we connect this socket to a new server! no chatting will happen

//Query DOM
var message=document.getElementById('message')
var handle= document.getElementById('handle')
var btn= document.getElementById('send')
var output=document.getElementById('output')
var feedback= document.getElementById('feedback');

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
    })



//EMIT EVENTS
btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle:handle.value //now we want to handle this msg so we go to index.js and deal with socket.on to deal with handeling the msg in the server
    })//(name of msg "what we call it? chat msg - call it as u want", what actual msg is - data we sending to the server - here it's obj {} inside it
    //1: msg , 2: habdle)
})

//Listen for events
socket.on('chat',function(data){
    feedback.innerHTML=""
    output.innerHTML +='<p> <strong>'+ data.handle +': </strong>'+data.message + '</p>'
})

socket.on('typing', function(data){
feedback.innerHTML = '<p><em>'+ data +' is typing a msg... </em></p>';
})