"use client";

import { useState, useEffect, useRef } from "react";
import UsernamePrompt from "../components/UsernamePrompt";
import ChatBox from "../components/ChatBox";
import { Message, WebSocketMessage } from "../types";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  // Connect to WebSocket server
  useEffect(() => {
    if (username && !wsRef.current) {
      // Use environment variable for WebSocket URL
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "";
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log("Connected to WebSocket server");
        setConnected(true);

        // Register username
        const message: WebSocketMessage = {
          type: "register",
          username,
        };

        wsRef.current?.send(JSON.stringify(message));
      };

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data) as Message;
        setMessages((prevMessages) => [message, ...prevMessages]);
      };

      wsRef.current.onclose = () => {
        console.log("Disconnected from WebSocket server");
        setConnected(false);
        wsRef.current = null;
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      // Clean up on component unmount
      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [username]);

  // Handle sending messages
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputMessage.trim() && connected && wsRef.current) {
      const message: WebSocketMessage = {
        type: "message",
        content: inputMessage,
      };

      wsRef.current.send(JSON.stringify(message));
      setInputMessage("");
    }
  };

  // Handle username submission
  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Real-Time Chat</h1>

      {!username ? (
        <UsernamePrompt onSubmit={handleUsernameSubmit} />
      ) : (
        <ChatBox
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          username={username}
          connected={connected}
        />
      )}
    </div>
  );
}
