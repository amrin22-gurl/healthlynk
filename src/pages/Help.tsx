import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, Shield, Heart, Info, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const Help = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (topicId: string) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground mt-1">
            Find answers to common questions and learn how to use HealthLynk
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {helpTopics.map((topic) => (
            <Card key={topic.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {topic.icon}
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedTopic === topic.id ? "transform rotate-180" : ""
                    }`} 
                  />
                </div>
              </CardHeader>
              <CardContent 
                className={`grid transition-all ${
                  expandedTopic === topic.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-muted-foreground py-4">
                    {topic.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Need Additional Help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you with any questions or concerns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you can't find the answer you're looking for, our support team is available 24/7 to help you.
              We typically respond within 1 business day.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = "mailto:support@healthlynk.com"}
            >
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Help; 