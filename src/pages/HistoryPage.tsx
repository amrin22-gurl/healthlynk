
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SeverityBadge from "@/components/health/SeverityBadge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ConsultationHistoryItem {
  id: string;
  date: string;
  symptom: string;
  severity: "mild" | "moderate" | "severe";
  recommendation: string;
}

const historyData: ConsultationHistoryItem[] = [
  {
    id: "1",
    date: "Today, 10:30 AM",
    symptom: "Tension Headache",
    severity: "mild",
    recommendation: "Home remedies: cold compress, hydration, rest"
  },
  {
    id: "2",
    date: "Yesterday, 3:15 PM",
    symptom: "Sore Throat",
    severity: "moderate",
    recommendation: "Salt water gargle, warm tea with honey, throat lozenges"
  },
  {
    id: "3",
    date: "3 days ago, 9:45 AM",
    symptom: "Lower Back Pain",
    severity: "moderate",
    recommendation: "Gentle stretching, heat therapy, OTC pain relievers"
  },
  {
    id: "4",
    date: "1 week ago, 2:00 PM",
    symptom: "High Fever with Rash",
    severity: "severe",
    recommendation: "Referred to Dr. Johnson, urgent care recommended"
  },
  {
    id: "5",
    date: "2 weeks ago, 11:20 AM",
    symptom: "Seasonal Allergies",
    severity: "mild",
    recommendation: "OTC antihistamines, nasal irrigation, air purifier"
  }
];

const HistoryPage = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Health History</h1>
            <p className="text-muted-foreground mt-1">
              Review your previous consultations and health recommendations.
            </p>
          </div>
          
          <Button className="bg-health-primary hover:bg-health-primary/90" asChild>
            <Link to="/chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>New Consultation</span>
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All History</TabsTrigger>
            <TabsTrigger value="remedies">Home Remedies</TabsTrigger>
            <TabsTrigger value="doctors">Doctor Visits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>
                  A record of your AI health consultations and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {historyData.map((item) => (
                    <div key={item.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{item.symptom}</h4>
                          <SeverityBadge severity={item.severity} />
                        </div>
                        <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/chat?history=${item.id}`} className="flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="remedies" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Home Remedies History</CardTitle>
                <CardDescription>
                  A record of home remedies recommended for your symptoms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {historyData
                    .filter((item) => item.severity !== "severe")
                    .map((item) => (
                      <div key={item.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{item.symptom}</h4>
                            <SeverityBadge severity={item.severity} />
                          </div>
                          <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/chat?history=${item.id}`} className="flex items-center gap-1">
                            <span>Details</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="doctors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Referrals</CardTitle>
                <CardDescription>
                  A record of doctor recommendations for more serious symptoms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {historyData
                    .filter((item) => item.severity === "severe")
                    .map((item) => (
                      <div key={item.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{item.symptom}</h4>
                            <SeverityBadge severity={item.severity} />
                          </div>
                          <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/chat?history=${item.id}`} className="flex items-center gap-1">
                            <span>Details</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
