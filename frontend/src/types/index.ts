export interface Message {
  type: "system" | "message";
  username?: string;
  content: string;
  timestamp: string;
}

export interface WebSocketMessage {
  type: "register" | "message";
  username?: string;
  content?: string;
}
