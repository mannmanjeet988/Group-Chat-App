//import express in express variable
const express = require("express");

//make an express app
const app = express();

//http-  hypertext transfer protocol (communication protocol)
//making server using http and express
const server = require('http').Server(app);    // integrating app with http 

// it will pick index.html from public folder
app.use(express.static('public'));
//app.use(express.static(path.join('public', "js")));

//integrating server with socket.io 
const io = require('socket.io')(server);  

// io will be the watcher present on server whereas socket will be the watcher present on the phone
/* if any new phone(user) tries to connect with server, socketId(socket) will be provided to the user
ans socket id will be unique to every user*/
io.on('connection', (socket)=>{
console.log('connection established', socket.id);


// socket io is my watchman, which keeps a register and tracks everyone.
// if anything happens, this watchman alerts everyone.
// a message is sent, so every one receive that message
    socket.on("message", (data) => {
    // watchman emits to everyone
    io.emit("message", data);
    console.log("Message is being sent to everyone", data.message);
  });

  socket.on("username enter", (data) => {
    // watchman emits to everyone
    io.emit("username enter", data);
  });

  socket.on("username left", (data) => {
    io.emit("username left", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
})



const PORT =9000;    

server.listen(PORT,()=>{
   console.log(`Server is running on the PORT ${PORT}`)
})


