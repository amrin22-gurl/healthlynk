
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Severity = "mild" | "moderate" | "severe";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  return (
    <Badge 
      className={cn(
        "px-2 py-1 font-medium", 
        {
          "bg-health-mild text-white": severity === "mild",
          "bg-health-moderate text-white": severity === "moderate",
          "bg-health-severe text-white": severity === "severe",
        },
        className
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
};

export default SeverityBadge;
