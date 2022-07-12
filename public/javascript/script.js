const socket=io();
const chatform=document.getElementById('chat-form');
const {username,room}=Qs.parse(location.server,{
    ignoreQueryPrefix:true,
})
socket.on("message",message=>{
    console.log(message);
    outputmessage(message)
})
socket.emit('joinroom',({username,room}))
chatform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=e.target.elements.msg.value;
    console.log(message);
    socket.emit('chatmessage',message)
    e.target.elements.message.value='';

})


function outputmessage(message){
   const div= document.createElement('div');
   div.classList.add('message');
   div.innerHTML=`	<p class="meta">${message.username}<span>${message.time}</span></p>
   <p class="text">
      ${message.text}
   </p>`
   document.querySelector('.chat-messages').appendChild(div);
}