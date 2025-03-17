import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, MessageCircle, Calendar, Clock, ArrowRight } from "lucide-react";
import HomeRemedy from "@/components/health/HomeRemedy";
import DoctorRecommendation from "@/components/health/DoctorRecommendation";
import LiveHealthDashboard from "@/components/health/LiveHealthDashboard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your health activities.
          </p>
        </div>

        <LiveHealthDashboard />

        <Tabs defaultValue="recent">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="remedies">Remedies</TabsTrigger>
              <TabsTrigger value="doctors">Doctor Recommendations</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" asChild>
              <Link to="/chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Start New Consultation</span>
              </Link>
            </Button>
          </div>
          
          <TabsContent value="recent" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Health Consultations</CardTitle>
                <CardDescription>
                  Your most recent interactions with the AI healthcare assistant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <h4 className="font-medium">Headache Consultation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tension headache with mild pain near temples
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">Yesterday</span>
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <Link to="/history" className="flex items-center gap-1">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <h4 className="font-medium">Throat Pain</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sore throat with mild difficulty swallowing
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <Link to="/history" className="flex items-center gap-1">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Allergic Reaction</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Skin rash with itching after trying new food
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <Link to="/history" className="flex items-center gap-1">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="remedies" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <HomeRemedy 
                title="Headache Relief"
                description="Natural remedies for tension headaches"
                severity="mild"
                steps={[
                  "Apply a cold or warm compress to your head",
                  "Practice relaxation techniques",
                  "Stay hydrated",
                  "Get adequate rest"
                ]}
              />
              
              <HomeRemedy 
                title="Sore Throat Soother"
                description="Home remedies for throat pain"
                severity="mild"
                steps={[
                  "Gargle with warm salt water",
                  "Drink warm tea with honey",
                  "Use a humidifier",
                  "Rest your voice"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="doctors" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <DoctorRecommendation 
                name="Dr. Sarah Johnson"
                specialty="General Practitioner"
                distance="2.3 miles"
                address="123 Health Street, Medical Center"
                phone="(555) 123-4567"
                availability="Available tomorrow at 10:00 AM"
              />
              
              <DoctorRecommendation 
                name="Dr. Michael Chen"
                specialty="Neurologist"
                distance="3.5 miles"
                address="456 Wellness Avenue, Neurology Building"
                phone="(555) 987-6543"
                availability="Available Thursday at 2:00 PM"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
