class ChatEngine {
    constructor(chatBoxId, userEmail) {
      this.chatBox = $(`#${chatBoxId}`);
      this.userEmail = userEmail;
      this.socket = io.connect('http://localhost:5000');
  
      if (this.userEmail) {
        this.connectionHandler();
      }
    }
  
    connectionHandler() {
      this.socket.on('connect', () => { // Use arrow function here
        console.log('connection established using sockets...!');
        
        this.socket.emit('join_room', {
          user_email: this.userEmail,
          chatroom: 'codeial',
        });
  
        this.socket.on('user_joined', (data) => { // Use arrow function here
          console.log('a user joined!', data);
        });
      });
    }
  }
  