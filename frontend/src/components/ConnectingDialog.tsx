import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export function ConnectingDialog() {
  return (
    <Dialog open={true}>
      <DialogTitle style={{ display: "none" }}>Connecting...</DialogTitle>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Connecting to chat server...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
