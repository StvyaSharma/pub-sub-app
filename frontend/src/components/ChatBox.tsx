"use client";

import { FormEvent } from "react";
import { Message } from "../types";

interface ChatBoxProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: (e: FormEvent) => void;
  username: string;
  connected: boolean;
}

export default function ChatBox({
  messages,
  inputMessage,
  setInputMessage,
  sendMessage,
  username,
  connected,
}: ChatBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-500 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome, {username}</h2>
          <div className="flex items-center">
            <span
              className={`h-3 w-3 rounded-full mr-2 ${connected ? "bg-green-400" : "bg-red-500"}`}
            ></span>
            <span>{connected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            No messages yet. Be the first to send one!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${msg.type === "system" ? "text-center" : ""}`}
            >
              {msg.type === "system" ? (
                <div className="text-sm text-gray-500 italic py-1">
                  {msg.content}
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg ${msg.username === username ? "bg-blue-100 ml-12" : "bg-gray-200 mr-12"}`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold">{msg.username}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Type a message..."
            disabled={!connected}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!connected || !inputMessage.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
