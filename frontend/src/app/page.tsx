"use client";

import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { UsernameDialog } from "@/components/UsernameDialog";
import { ConnectingDialog } from "@/components/ConnectingDialog";
import { MessageList } from "@/components/MessageList";
import { ChatForm } from "@/components/ChatForm";
import { ChatHeader } from "@/components/ChatHeader";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const { messages, connected, connecting, sendMessage } =
    useWebSocket(username);

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {!username && <UsernameDialog onSubmit={handleUsernameSubmit} />}
      {connecting && <ConnectingDialog />}

      {username && (
        <div className="h-[calc(100vh-2rem)]">
          <div className="flex flex-col h-full p-4">
            <ChatHeader username={username} connected={connected} />
            <MessageList messages={messages} currentUsername={username} />
            <ChatForm onSubmit={handleSendMessage} disabled={!connected} />
          </div>
        </div>
      )}
    </div>
  );
}
