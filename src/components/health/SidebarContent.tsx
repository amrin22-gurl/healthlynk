
import { Info, Pin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HomeRemedy from "@/components/health/HomeRemedy";
import DoctorRecommendation from "@/components/health/DoctorRecommendation";
import { remedies, doctors } from "@/config/homeRemedies";

interface SidebarContentProps {
  currentSymptom: {
    name: string;
    severity: "mild" | "moderate" | "severe";
  } | null;
}

const SidebarContent = ({ currentSymptom }: SidebarContentProps) => {
  return (
    <div className="space-y-6">
      {currentSymptom && currentSymptom.severity === "mild" && 
       (currentSymptom.name === "headache" || currentSymptom.name === "cough") && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Pin className="h-4 w-4" />
              Recommended Remedies
            </CardTitle>
            <CardDescription>
              Home remedies for {currentSymptom.name.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <HomeRemedy 
              title={remedies[currentSymptom.name as keyof typeof remedies].title}
              description={remedies[currentSymptom.name as keyof typeof remedies].description}
              severity="mild"
              steps={remedies[currentSymptom.name as keyof typeof remedies].steps}
            />
          </CardContent>
        </Card>
      )}
      
      {currentSymptom && (currentSymptom.severity === "severe" || currentSymptom.severity === "moderate") && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Pin className="h-4 w-4" />
              Medical Attention Needed
            </CardTitle>
            <CardDescription>
              Nearby healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {doctors.map((doctor, index) => (
              <DoctorRecommendation 
                key={index}
                name={doctor.name}
                specialty={doctor.specialty}
                distance={doctor.distance}
                address={doctor.address}
                phone={doctor.phone}
                availability={doctor.availability}
              />
            ))}
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-4 w-4" />
            Health Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
              <span>Stay hydrated by drinking 8-10 glasses of water daily</span>
            </li>
            <li className="flex items-start gap-2">
              <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
              <span>Take short breaks from screens every 20-30 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
              <span>Practice deep breathing exercises for stress reduction</span>
            </li>
            <li className="flex items-start gap-2">
              <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
              <span>Aim for 7-9 hours of quality sleep each night</span>
            </li>
            <li className="flex items-start gap-2">
              <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
              <span>Include fruits and vegetables in every meal</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarContent;
