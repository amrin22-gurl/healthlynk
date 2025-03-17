
import { useState } from "react";
import { FileText } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeverityBadge from "@/components/health/SeverityBadge";
import ChatContainer from "@/components/chat/ChatContainer";
import SidebarContent from "@/components/health/SidebarContent";
import { exportChatToPdf } from "@/services/pdfService";
import { useToast } from "@/hooks/use-toast";

const ChatPage = () => {
  const [currentSymptom, setCurrentSymptom] = useState<{
    name: string;
    severity: "mild" | "moderate" | "severe";
  } | null>(null);
  const [messages, setMessages] = useState([]);
  const { toast } = useToast();

  const handleExportPdf = () => {
    if (messages.length <= 1) {
      toast({
        title: "Nothing to export",
        description: "Have a conversation first before exporting.",
        variant: "destructive",
      });
      return;
    }

    const success = exportChatToPdf(messages);
    if (success) {
      toast({
        title: "Export successful",
        description: "Your consultation has been saved as a PDF.",
      });
    } else {
      toast({
        title: "Export failed",
        description: "There was a problem creating your PDF file.",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">AI Health Consultation</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExportPdf}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Export as PDF</span>
            </Button>
            {currentSymptom && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Current symptom:</span>
                <SeverityBadge severity={currentSymptom.severity} />
              </div>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 h-full">
          <div className="md:col-span-2 flex flex-col h-full">
            <ChatContainer 
              setCurrentSymptom={setCurrentSymptom} 
              onMessagesChange={setMessages}
            />
          </div>
          
          <div className="hidden md:block">
            <SidebarContent currentSymptom={currentSymptom} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
