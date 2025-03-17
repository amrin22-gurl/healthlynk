
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, HelpCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import ThemeToggle from "@/components/ThemeToggle";
import HelpBar from "./HelpBar";
import UserSettings from "@/components/settings/UserSettings";

const AppHeader = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-health-primary" />
          <span className="text-xl font-bold">HealthLynk</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsHelpOpen(true)}
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <HelpBar isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        <UserSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </header>
  );
};

export default AppHeader;
