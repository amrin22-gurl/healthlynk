
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import VoiceWave from "@/components/VoiceWave";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isSpeaking?: boolean;
}

const ChatMessage = ({ message, isSpeaking = false }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full my-4", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex gap-3 max-w-[80%]", isUser ? "flex-row-reverse" : "flex-row")}>
        <Avatar className={cn("h-8 w-8", isUser ? "bg-health-primary" : "bg-health-accent")}>
          <AvatarFallback>
            {isUser ? "U" : "AI"}
          </AvatarFallback>
          {!isUser && (
            <AvatarImage src="/assets/doctor-avatar.png" alt="Healthcare Assistant" />
          )}
        </Avatar>

        <div className="flex flex-col gap-1">
          <div className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser 
              ? "bg-health-primary text-white rounded-tr-none" 
              : "bg-secondary rounded-tl-none"
          )}>
            <p className="text-sm">{message.content}</p>
          </div>
          
          {!isUser && isSpeaking && (
            <VoiceWave isActive={true} className="ml-2 mt-1" />
          )}
          
          <span className="text-xs text-muted-foreground px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
