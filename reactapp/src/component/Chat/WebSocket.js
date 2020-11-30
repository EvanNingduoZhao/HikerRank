class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  // connect(chatUrl) {
  connect() {
    // const path = 'ws://127.0.0.1:8000/ws/chat/${chatUrl}/';
    const path = 'ws://127.0.0.1:8000/ws/chat/test/';
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketNewMessage(JSON.stringify({
      command: 'fetch_messages'
    }));
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }

  // disconnect() {
  //   this.socketRef.close();
  // }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    console.log(parsedData);
    console.log(parsedData.command);
    console.log(parsedData.message);
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      console.log(this.callbacks[command]);
      this.callbacks[command](parsedData.message);
    }
  }

  // fetchMessages(username, chatId) {
  //   this.sendMessage({
  //     command: "fetch_messages",
  //     username: username,
  //     // chatId: chatId
  //   });
  // }
  fetchMessages(username) {
    this.sendMessage({
      command: "fetch_messages",
      username: username
      // chatId: chatId
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content
      // chatId: message.chatId
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
  }

  sendMessage(data) {
    console.log(data);
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
