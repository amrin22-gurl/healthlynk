
export const healthPatterns = {
  headache: {
    keywords: ["headache", "head pain", "migraine"],
    followUp: "Can you describe the intensity and location of your headache? Is it throbbing, sharp, or dull?",
    severity: "mild",
  },
  fever: {
    keywords: ["fever", "high temperature", "chills"],
    followUp: "When did your fever start? Have you taken your temperature? What other symptoms are you experiencing?",
    severity: "moderate",
  },
  cough: {
    keywords: ["cough", "coughing", "chest congestion"],
    followUp: "Is your cough dry or productive? How long have you been coughing? Do you have any difficulty breathing?",
    severity: "mild",
  },
  stomachPain: {
    keywords: ["stomach pain", "abdominal pain", "belly ache"],
    followUp: "Where exactly is the pain located? Is it constant or comes and goes? Have you experienced any nausea or vomiting?",
    severity: "moderate",
  },
  emergency: {
    keywords: ["chest pain", "can't breathe", "unconscious", "severe bleeding"],
    followUp: "This sounds serious and requires immediate medical attention. Please contact emergency services or go to the nearest emergency room right away.",
    severity: "severe",
  },
};

export type HealthConditionSeverity = "mild" | "moderate" | "severe";

export const analyzeMessage = (text: string): { condition: string | null; severity: HealthConditionSeverity | null } => {
  const textLower = text.toLowerCase();
  
  for (const [condition, data] of Object.entries(healthPatterns)) {
    for (const keyword of data.keywords) {
      if (textLower.includes(keyword)) {
        return {
          condition,
          severity: data.severity as HealthConditionSeverity
        };
      }
    }
  }
  
  return { condition: null, severity: null };
};
