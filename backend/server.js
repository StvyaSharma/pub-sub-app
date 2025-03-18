const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Handle messages from clients
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      // Handle different message types
      switch (data.type) {
        case "register":
          // Register new user
          clients.set(ws, { username: data.username });
          broadcastMessage({
            type: "system",
            content: `${data.username} has joined the chat`,
            timestamp: new Date().toISOString(),
          });
          break;

        case "message":
          // Broadcast message to all clients
          broadcastMessage({
            type: "message",
            username: clients.get(ws).username,
            content: data.content,
            timestamp: new Date().toISOString(),
          });
          break;
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    if (clients.has(ws)) {
      const { username } = clients.get(ws);
      clients.delete(ws);
      broadcastMessage({
        type: "system",
        content: `${username} has left the chat`,
        timestamp: new Date().toISOString(),
      });
    }
    console.log("Client disconnected");
  });
});

// Function to broadcast messages to all connected clients
function broadcastMessage(message) {
  const messageStr = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
