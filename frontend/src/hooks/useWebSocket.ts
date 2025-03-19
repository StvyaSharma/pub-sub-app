import { useState, useEffect, useRef } from "react";
import { Message, WebSocketMessage } from "@/types";

export function useWebSocket(username: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (username && !wsRef.current) {
      setConnecting(true);
      const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws`;

      try {
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          setConnecting(false);
          setConnected(true);

          const message: WebSocketMessage = {
            type: "register",
            username,
          };
          wsRef.current?.send(JSON.stringify(message));
        };

        wsRef.current.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data) as Message;
            setMessages((prevMessages) => [message, ...prevMessages]);
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        };

        wsRef.current.onclose = () => {
          setConnected(false);
          setConnecting(false);
          wsRef.current = null;

          setTimeout(() => {
            if (!wsRef.current) {
              // Username reset logic will be handled by parent component
            }
          }, 5000);
        };

        wsRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          setConnecting(false);
        };
      } catch (error) {
        console.error("Error creating WebSocket connection:", error);
        setConnecting(false);
      }

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [username]);

  const sendMessage = (content: string) => {
    if (content.trim() && connected && wsRef.current) {
      const message: WebSocketMessage = {
        type: "message",
        content,
      };

      wsRef.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  };

  return {
    messages,
    connected,
    connecting,
    sendMessage,
  };
}
