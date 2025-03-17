import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import UserSettings from "@/components/settings/UserSettings";
import { UserProfile, useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, MapPin, Phone, Shield, User } from "lucide-react";

const Settings = () => {
  const { user } = useUser();

  useEffect(() => {
    document.title = "Settings - HealthLynk";
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-0 mb-4">
            <TabsTrigger value="profile" className="rounded-none">
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-none">
              Account Details
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-none">
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <Card className="p-6">
              <UserProfile 
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-none p-0",
                    card: "shadow-none p-0",
                    navbar: "hidden",
                    pageScrollBox: "p-0"
                  }
                }}
              />
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
                <CardDescription>Your personal and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">{user?.fullName || 'No name set'}</h3>
                    <p className="text-sm text-muted-foreground">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
                    {user?.emailAddresses?.length > 0 && (
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        {user.primaryEmailAddress?.emailAddress}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Joined {new Date(user?.createdAt || '').toLocaleDateString()}</span>
                      </div>
                      {user?.phoneNumbers?.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.phoneNumbers[0].phoneNumber}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Security & Verification
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {user?.emailAddresses?.map((email) => (
                        <div key={email.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{email.emailAddress}</span>
                          </div>
                          {email.verification?.status === "verified" && (
                            <Badge variant="default" className="text-xs">Verified</Badge>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-0">
            <UserSettings isOpen={true} onClose={() => {}} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings; 