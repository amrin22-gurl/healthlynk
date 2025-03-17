
import { HealthConditionSeverity } from "./healthPatterns";

export interface RemedyData {
  title: string;
  description: string;
  severity: HealthConditionSeverity;
  steps: string[];
}

export const remedies: Record<string, RemedyData> = {
  headache: {
    title: "Headache Relief",
    description: "Natural remedies for mild headaches",
    severity: "mild",
    steps: [
      "Apply a cold or warm compress to your head for 10-15 minutes",
      "Practice deep breathing and relaxation techniques",
      "Stay hydrated by drinking plenty of water",
      "Take a break from screens and bright lights",
      "Try gentle neck and shoulder stretches",
      "Consider over-the-counter pain relievers like acetaminophen or ibuprofen if necessary"
    ],
  },
  cough: {
    title: "Cough Management",
    description: "Home care for mild coughs",
    severity: "mild",
    steps: [
      "Stay hydrated with warm fluids like herbal tea with honey",
      "Use a humidifier to add moisture to the air",
      "Try honey (for adults and children over 1 year old)",
      "Gargle with salt water to soothe a sore throat",
      "Avoid irritants like smoke and strong fragrances",
      "Rest and get plenty of sleep"
    ],
  },
};

export const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    distance: "2.3 miles",
    address: "123 Health Street, Medical Center",
    phone: "(555) 123-4567",
    availability: "Available today",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    distance: "3.1 miles",
    address: "456 Wellness Avenue, Suite 200",
    phone: "(555) 987-6543",
    availability: "Next available: Tomorrow",
  },
];
