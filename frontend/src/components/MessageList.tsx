import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types";
import { memo, useRef, useEffect } from "react";

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
}

// Memoized individual message component
const ChatMessage = memo(
  ({
    message,
    currentUsername,
  }: {
    message: Message;
    currentUsername: string;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }} // Changed to -20 to animate from top
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`mb-4 ${
          !message.username
            ? "flex flex-col items-center"
            : message.username === currentUsername
              ? "flex flex-col items-end"
              : "flex flex-col items-start"
        }`}
      >
        {!message.username ? (
          <p className="text-center text-sm text-muted-foreground">
            {message.content}
          </p>
        ) : (
          <div>
            <div
              className={`text-xs w-full font-semibold px-1 ${
                message.username === currentUsername
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {message.username}
            </div>
            <div
              className={`p-2 px-6 rounded-xl ${
                message.username === currentUsername
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        )}
      </motion.div>
    );
  },
);

// We need to set displayName for memoized component in development
ChatMessage.displayName = "ChatMessage";

export const MessageList = memo(function MessageList({
  messages,
  currentUsername,
}: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = 0; // Scroll to top since messages are reversed
      }
    }
  }, [messages.length]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="flex-1 rounded-md border p-4 overflow-hidden"
    >
      <div className="max-w-md mx-auto flex flex-col-reverse">
        {" "}
        {/* Use flex-col-reverse to show newest at bottom */}
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.timestamp}-${index}`}
              message={message}
              currentUsername={currentUsername}
            />
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
});
