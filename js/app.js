 //dom queries
 const chatList = document.querySelectorAll('.chat-list');
 const newChatForm = document.querySelector('.new-chat');
 const newNameForm = document.querySelector('.new-name');
 const updateMssg = document.querySelector('.update-mssg');
 const rooms = document.querySelector('.chat-rooms');

 //add a new chat
 newChatForm.addEventListener('submit', e => {
     e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
 });

 //update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom class
    //trim to remove white space
    const newName = newNameForm.name.value.trim(); 
    //get value user types into input field
    chatroom.updateName(newName); 
    //reset form input after submit
    newNameForm.reset();  
    //show then hide update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    //hides message after 3 seconds
    setTimeout(() => updateMssg.innerText = '', 3000); 
});

//update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id')); //gets whatever id value user clicks on when changing rooms
        chatroom.getChats(chat => chatUI.render(chat)); //call render to render html
    }
});

//check local storage for a name (if a username in local storage returns true, else anon)
const username = localStorage.username ? localStorage.username : 'anon';

 //class' instances: room = gaming, username = shaun
 const chatUI = new ChatUI(chatList); //passes in chatList in ChatUI constructor
 const chatroom = new Chatroom('general', username); //room = general, username = whatever is passed in

 //callback function set-up: get singe chat object and render
 chatroom.getChats(data => chatUI.render(data));  //fire callback for every chat we get