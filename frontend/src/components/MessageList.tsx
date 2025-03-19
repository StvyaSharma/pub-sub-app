import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types";

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
}

export function MessageList({ messages, currentUsername }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 rounded-md border p-4 overflow-hidden">
      <div className="max-w-md mx-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
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
                  <div className="text-xs  w-full font-semibold">
                    {message.username}
                  </div>
                  <div
                    className={`p-2 px-6 rounded-xl  ${
                      message.username === currentUsername
                        ? "bg-primary text-primary-foreground "
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
