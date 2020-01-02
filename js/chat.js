//adding new chat docs (done)
//setting up real-time listener to get new chats
//updating the username
//updating the room

 class Chatroom {
     constructor(room, username) {
        this.room = room; //key value pair
        this.username = username; //key value pair
        this.chats = db.collection('chats'); //key value pair & get database
        this.unsub; //make empty variable to use later to opt out of live sync
     }
     async addChat(message) {
         //format a chat object
         const now = new Date(); //make a date object to use date/time in a message
         const chat = { 
             message, //same as message: message
             username: this.username, //the key is username, whatever we pass in is this.username
             room: this.room, //the key is room, whatever we pass in is this.room
             created_at: firebase.firestore.Timestamp.fromDate(now) //the key is created_at, whatever we pass in is firebase...;pass in 'now' object to fromDate method to create a date stamp when user submits a chat 
         };
         // store & add the above chat object upon user submit
         const response = await this.chats.add(chat); //if await promise succeeds we add the chat
         return response; //use 'return this' to use method chaining if necessary
     }
     getChats(callback) { //pass callback
        //store in new variable to later opt out of live sync when we call the function
        this.unsub = this.chats //setting up real-time listener/live-sync of chats
            .where('room', '==', this.room) //get docs from specific chatrooms only (double == in firebase)
            .orderBy('created_at') //order by time created
            .onSnapshot(snapshot => { // output paramater 'snapshot' to store live sync
                //use output paramater with docChanges method to loop through all data
                //then pass in paramater 'change' to store the looped data
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') { 
                    callback(change.doc.data()); //callback fired every time 'change' is equal to 'added'; takes data from each of the documents that are looped through and stored in 'change' paramater
                    }
                });
            });
     }
     updateName(username) {
        this.username = username; //update property to new property user passes in
        localStorage.setItem('username', username);
     }
     updateRoom(room) {
         this.room = room; // update property to new property user passes in
         console.log('room updated');
         if(this.unsub) {
            this.unsub(); //empty function, so opt out of live sync/ realtime listener upon call
        }
     }
 }