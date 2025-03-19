import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatFormProps {
  onSubmit: (message: string) => void;
  disabled: boolean;
}

export function ChatForm({ onSubmit, disabled }: ChatFormProps) {
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !disabled) {
      onSubmit(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || !inputMessage.trim()}>
        Send
      </Button>
    </form>
  );
}
