import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Mic, User, Shield, HelpCircle, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { SignInButton, SignUpButton, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import HelpBar from "@/components/layout/HelpBar";
import UserSettings from "@/components/settings/UserSettings";

const Index = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleStartChatting = () => {
    if (isSignedIn) {
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-health-primary" />
          <span className="text-xl font-bold">HealthLynk</span>
        </div>
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
          <SignedOut>
            <Button variant="ghost" asChild>
              <SignInButton mode="modal" redirectUrl="/dashboard">
                <span>Sign In</span>
              </SignInButton>
            </Button>
            <Button className="bg-health-primary hover:bg-health-primary/90" asChild>
              <SignUpButton mode="modal" redirectUrl="/dashboard">
                <span>Sign Up</span>
              </SignUpButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button className="bg-health-primary hover:bg-health-primary/90" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Your Personal <span className="text-health-primary">AI Healthcare</span> Assistant
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Get instant home remedies for minor health issues and doctor recommendations for more serious conditions with our conversational AI assistant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <SignedIn>
              <Button 
                size="lg" 
                className="bg-health-primary hover:bg-health-primary/90"
                onClick={handleStartChatting}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>
            </SignedIn>
            <SignedOut>
              <Button 
                size="lg" 
                className="bg-health-primary hover:bg-health-primary/90"
                asChild
              >
                <SignUpButton mode="modal" redirectUrl="/chat">
                  <div className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Chatting
                  </div>
                </SignUpButton>
              </Button>
            </SignedOut>
            <SignedOut>
              <Button size="lg" variant="outline" asChild>
                <SignInButton mode="modal" redirectUrl="/dashboard">
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Sign In
                  </div>
                </SignInButton>
              </Button>
            </SignedOut>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md relative">
            <div className="bg-card border shadow-xl rounded-2xl p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-health-primary" />
                  <span className="font-semibold">Health Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-health-accent" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm max-w-[80%]">
                  Hello! I'm your healthcare assistant. How can I help you today?
                </div>
                
                <div className="bg-health-primary text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%] ml-auto">
                  I've had a headache for the last few hours.
                </div>
                
                <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm max-w-[80%]">
                  I'm sorry to hear that. Can you tell me if you're experiencing any other symptoms like nausea, sensitivity to light, or fever?
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-3 -left-3 -right-3 -top-3 bg-health-accent/10 rounded-2xl -z-10"></div>
          </div>
        </div>
      </main>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-health-primary/10 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-health-primary" />
            </div>
            <h3 className="text-xl font-semibold">Voice & Chat Support</h3>
            <p className="text-muted-foreground">Talk or type naturally with our AI, which understands context and follows up with relevant questions.</p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-health-accent/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-health-accent" />
            </div>
            <h3 className="text-xl font-semibold">Home Remedies</h3>
            <p className="text-muted-foreground">Get personalized, scientifically-validated home remedies for minor health concerns.</p>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-health-severe/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-health-severe" />
            </div>
            <h3 className="text-xl font-semibold">Doctor Recommendations</h3>
            <p className="text-muted-foreground">For serious symptoms, receive nearby doctor recommendations based on your location.</p>
          </div>
        </div>
      </section>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-health-primary" />
            <span className="font-semibold">HealthLynk</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2023 HealthLynk. All rights reserved.
          </p>
        </div>
      </footer>
      
      <HelpBar isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <UserSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Index;
