import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  username: string;
  connected: boolean;
}

export function ChatHeader({ username, connected }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Logged in as: {username}</span>
        <Badge
          variant={connected ? "default" : "destructive"}
          className="capitalize"
        >
          {connected ? "Connected" : "Disconnected"}
        </Badge>
      </div>
    </div>
  );
}
