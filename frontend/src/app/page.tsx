"use client";

import { useState, useEffect, useRef } from "react";
import { Message, WebSocketMessage } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [messages] = useState<Message[]>([]);
  const [connected] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [tempUsername, setTempUsername] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket connection logic remains the same
  useEffect(() => {
    // ... (keep your existing WebSocket logic)
  }, [username]);

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

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      setUsername(tempUsername);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Real-Time Chat</h1>

        <AlertDialog open={!username}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Enter your username</AlertDialogTitle>
              <AlertDialogDescription>
                Please choose a username to join the chat.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleUsernameSubmit}>
              <Input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Username"
                className="mb-4"
              />
              <AlertDialogFooter>
                <Button type="submit" disabled={!tempUsername.trim()}>
                  Join Chat
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>

        {username && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Logged in as: {username}</span>
                <Badge variant={connected ? "outline" : "destructive"}>
                  {connected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </div>

            <ScrollArea className="h-[500px] rounded-md border p-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 ${
                      message.username === username
                        ? "flex flex-col items-end"
                        : "flex flex-col items-start"
                    }`}
                  >
                    <Card
                      className={`p-3 max-w-[80%] ${
                        message.username === username
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {message.username}
                      </p>
                      <p>{message.content}</p>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={!connected}
              />
              <Button
                type="submit"
                disabled={!connected || !inputMessage.trim()}
              >
                Send
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}
