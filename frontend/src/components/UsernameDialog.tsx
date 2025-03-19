import { useState, FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsernameDialogProps {
  onSubmit: (username: string) => void;
}

export function UsernameDialog({ onSubmit }: UsernameDialogProps) {
  const [tempUsername, setTempUsername] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      onSubmit(tempUsername);
    }
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter your username</AlertDialogTitle>
          <AlertDialogDescription>
            Please choose a username to join the chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
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
  );
}
