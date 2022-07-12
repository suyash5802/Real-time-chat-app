const path=require('path')
const express=require('express');
const http=require('http');
const app=express();
const server=http.createServer(app)
const nametime=require('./utils/message');
const {userjoin,getusername}=require('./utils/user')
const socketio=require('socket.io');
const io=socketio(server);
const botname='ChatCord-Bot'





app.use(express.static(path.join(__dirname,'public')))
io.on('connection',socket=>{

    socket.on('joinroom',({username,room})=>{
        const user=userjoin(socket.id,username,room)
        socket.join(user.room);
        socket.emit("message",nametime(botname,'Welcome to chatbot'))
        socket.broadcast.to(user.room).emit('message',nametime(botname, ` ${user.username} has joined the chat`  ))
    })
    socket.on('chatmessage',(msg)=>{
        const user=userjoin(socket.id)
        io.to(user.room).emit('message',nametime(user.username,msg))
    })
   
    socket.on("disconect",()=>{
      io.emit('message',nametime(botname,"someone has left the chat"));
    })

})



server.listen(3000,()=>{
    console.log("server started on port 3000");
    
})