const socket = io();
// when script will run, a connection will be establihsed

let username="";

document.getElementById("join-btn").addEventListener("click",(event)=>{
event.preventDefault();  // to prevent default submission of form

username=document.getElementById("username-input").value.trim();
if(username!==""){
   document.querySelector(".form-username").style.display="none";
   document.querySelector(".chatroom-container").style.display="block";
   document.querySelector(".chatroom-header").innerText=`Chatroom - ${username}`;
   socket.emit("username enter",(username));
}
else{
    alert("Username can not be empty")
}
});


document.getElementById("send-btn").addEventListener("click",(event)=>{
  event.preventDefault();

  const data={
   username:username,
   message:document.getElementById("message-input").value,
  }
// emission, emit
  // emit the message to the watchman -> give message to watchman
  socket.emit("message",(data));

  addMessage(data,true);
   
   // var msgdiv= document.createElement("div");
   // var msg =document.getElementById("message-input").value;
   // msgdiv.innerText =  msg;
   // msgdiv.setAttribute("class","message sent");
   // document.querySelector("#message-container").appendChild(msgdiv);  
})
   
   // receive user enterred
   socket.on("username enter", (USERNAME) => {
      if (USERNAME !== username) {
        var msgDiv = document.createElement("div");
        msgDiv.innerText = `${USERNAME} has enterred!`;
        document.querySelector("#message-container").appendChild(msgDiv);
      }
    });

   socket.on("message",(data)=>{
      if(data.username!==username){
         addMessage(data,false)
      }
   })

 function addMessage(data,flag){
   var msgdiv= document.createElement("div");
   msgdiv.innerText =  `${data.username}: ${data.message}`;
   if(flag){
      msgdiv.setAttribute("class","message sent");
   } else{
      msgdiv.setAttribute("class","message received");
   }
   document.querySelector("#message-container").appendChild(msgdiv);  
}

document.getElementById("exit-btn").addEventListener("click", () => {
   socket.emit("username left", username);
});