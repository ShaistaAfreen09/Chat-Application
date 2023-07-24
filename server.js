const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received message: ', message);
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
