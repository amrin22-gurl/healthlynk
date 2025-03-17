
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircleQuestion, 
  X, 
  ChevronDown, 
  Shield, 
  Info,
  Heart
} from "lucide-react";

type HelpTopic = {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
};

const helpTopics: HelpTopic[] = [
  {
    id: "chat",
    title: "How to use the Chat Assistant",
    content: "Simply type your health concerns in the chat box or use the microphone button to speak. Our AI will analyze your symptoms and provide home remedies for minor issues or doctor recommendations for serious conditions. You can ask follow-up questions for more information or clarification.",
    icon: <MessageCircleQuestion className="h-5 w-5 text-health-primary" />,
  },
  {
    id: "security",
    title: "Privacy & Security",
    content: "We take your privacy seriously. All conversations are encrypted and your personal health data is never shared with third parties. Our AI is designed to provide general health information, not to replace professional medical advice.",
    icon: <Shield className="h-5 w-5 text-health-primary" />,
  },
  {
    id: "remedies",
    title: "Home Remedies",
    content: "For minor health issues, our AI provides scientifically-backed home remedies. These are carefully sourced from medical literature and reviewed by healthcare professionals. Always follow proper medical advice for persistent symptoms.",
    icon: <Heart className="h-5 w-5 text-health-primary" />,
  },
  {
    id: "doctor",
    title: "Doctor Recommendations",
    content: "For serious symptoms, we recommend consulting a healthcare professional. When available, we can suggest nearby doctors based on your location. You'll need to enable location services to use this feature.",
    icon: <Info className="h-5 w-5 text-health-primary" />,
  },
];

interface HelpBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpBar = ({ isOpen, onClose }: HelpBarProps) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (topicId: string) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg z-40 transition-transform">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircleQuestion className="h-5 w-5 text-health-primary" />
          <span>Help Center</span>
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4 space-y-4">
          {helpTopics.map((topic) => (
            <Card key={topic.id}>
              <CardHeader 
                className="py-3 cursor-pointer" 
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {topic.icon}
                    <CardTitle className="text-md">{topic.title}</CardTitle>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedTopic === topic.id ? "transform rotate-180" : ""
                    }`} 
                  />
                </div>
              </CardHeader>
              {expandedTopic === topic.id && (
                <CardContent className="py-2 text-sm text-muted-foreground">
                  {topic.content}
                </CardContent>
              )}
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle className="text-md">Contact Support</CardTitle>
              <CardDescription>
                Need additional help? Contact our support team.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = "mailto:support@healthlynk.com"}
              >
                Email Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpBar;
