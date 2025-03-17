/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage, { Message } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { useToast } from "@/hooks/use-toast";
import { fetchAIResponse } from "@/services/aiService";
import { analyzeMessage } from "@/config/healthPatterns";

interface ChatContainerProps {
  setCurrentSymptom: (symptom: { name: string; severity: "mild" | "moderate" | "severe" } | null) => void;
  onMessagesChange?: (messages: Message[]) => void;
}

const ChatContainer = ({ setCurrentSymptom, onMessagesChange }: ChatContainerProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your healthcare assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);
  
  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
        
        toast({
          title: "Recognized speech",
          description: transcript,
        });
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Failed to recognize speech. Please try again or type your message.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported');
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please type your message instead.",
        variant: "destructive"
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  useEffect(() => {
    if (isListening && recognitionRef.current) {
      toast({
        title: "Listening...",
        description: "Say something about your health concern",
      });
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
        toast({
          title: "Error",
          description: "Failed to start voice recognition. Please try again.",
          variant: "destructive"
        });
      }
    } else if (!isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }, [isListening]);
  
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].role === "assistant") {
      setIsSpeaking(true);
      const timer = setTimeout(() => {
        setIsSpeaking(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsWaitingForResponse(true);
    
    processUserMessage(text);
  };
  
  const processUserMessage = async (userInput: string) => {
    try {
      const { condition, severity } = analyzeMessage(userInput);
      
      if (condition) {
        if (condition === "emergency") {
          setCurrentSymptom({
            name: "Emergency condition",
            severity: "severe"
          });
        } else if (condition) {
          setCurrentSymptom({
            name: condition,
            severity: severity || "mild"
          });
        }
      }
      
      // Get AI response
      const responseText = await fetchAIResponse(userInput, condition);
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize for the inconvenience. I'm currently experiencing technical difficulties. Please try again in a moment, or if this is urgent, please consult with a healthcare professional directly.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsWaitingForResponse(false);
    }
  };
  
  const fallbackAnalyzeUserMessage = (text: string) => {
    const textLower = text.toLowerCase();
    let responseText = "I understand. Can you tell me more about your symptoms so I can provide better assistance?";
    
    const { condition } = analyzeMessage(text);
    if (condition && condition in healthPatterns) {
      responseText = healthPatterns[condition as keyof typeof healthPatterns].followUp;
    }
    
    if (textLower.includes("thank")) {
      responseText = "You're welcome! Is there anything else I can help you with?";
    } else if (textLower.includes("help")) {
      responseText = "I can help with assessing your symptoms, suggesting home remedies for minor conditions, or recommending when you should see a doctor. What are you experiencing?";
    } else if (textLower.match(/yes|sure|okay|please/i)) {
      responseText = "Great! To provide the most accurate information, could you describe your symptoms in detail?";
    }
    
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
  };
  
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-card shadow-sm">
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isSpeaking={isSpeaking && messages[messages.length - 1].id === message.id}
            />
          ))}
          {isWaitingForResponse && (
            <div className="flex w-full my-4 justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="h-8 w-8 rounded-full bg-health-accent flex items-center justify-center animate-pulse">
                  AI
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-2xl px-4 py-2.5 bg-secondary rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="mt-4 relative">
        {messages.length > 4 && (
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-4 bottom-full mb-2"
            onClick={scrollToBottom}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isListening={isListening}
          onToggleVoice={toggleVoiceInput}
        />
      </div>
    </div>
  );
};

export default ChatContainer;

// Import for the fallback functionality
import { healthPatterns } from "@/config/healthPatterns";
