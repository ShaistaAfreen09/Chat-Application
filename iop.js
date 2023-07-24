const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const ws = new WebSocket('ws://localhost:3000');

let clientId = Math.random().toString(36).substr(2, 9);

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message.sender, message.content);
};

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  sendMessage(message);
});

function displayMessage(sender, content) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${content}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage(message) {
  if (message.trim() !== '') {
    const data = {
      sender: clientId,
      content: message,
    };
    ws.send(JSON.stringify(data));
    messageInput.value = '';
    displayMessage('You', message);
  }
}

