
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

interface DoctorRecommendationProps {
  name: string;
  specialty: string;
  distance: string;
  address: string;
  phone: string;
  availability: string;
}

const DoctorRecommendation = ({
  name,
  specialty,
  distance,
  address,
  phone,
  availability
}: DoctorRecommendationProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription className="text-sm">{specialty}</CardDescription>
          </div>
          <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
            {distance} away
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-sm">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{availability}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" className="w-1/2">Call</Button>
        <Button className="w-1/2 bg-health-primary hover:bg-health-primary/90">Book Appointment</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorRecommendation;
