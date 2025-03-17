
import { useState } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import VoiceWave from "@/components/VoiceWave";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isListening: boolean;
  onToggleVoice: () => void;
}

const ChatInput = ({ onSendMessage, isListening, onToggleVoice }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-end gap-2 border rounded-lg p-2 bg-background">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your health concerns..."
        className="min-h-12 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className={isListening ? "bg-health-accent text-white" : ""} 
          onClick={onToggleVoice}
        >
          {isListening ? (
            <>
              <VoiceWave isActive={true} className="absolute" />
              <MicOff className="h-4 w-4" />
            </>
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>

        <Button 
          size="icon" 
          className="bg-health-primary hover:bg-health-primary/90"
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
