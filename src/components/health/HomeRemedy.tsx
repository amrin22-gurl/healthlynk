
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import SeverityBadge from "./SeverityBadge";

interface HomeRemedyProps {
  title: string;
  description: string;
  severity: "mild" | "moderate" | "severe";
  steps: string[];
}

const HomeRemedy = ({ title, description, severity, steps }: HomeRemedyProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <SeverityBadge severity={severity} />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-2">
              <Heart className="h-5 w-5 text-health-primary shrink-0 mt-0.5" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HomeRemedy;
