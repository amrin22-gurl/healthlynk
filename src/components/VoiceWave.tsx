
import { cn } from "@/lib/utils";

interface VoiceWaveProps {
  isActive: boolean;
  className?: string;
}

const VoiceWave = ({ isActive, className }: VoiceWaveProps) => {
  return (
    <div className={cn("flex items-end justify-center h-8 space-x-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-health-primary rounded-full transition-all duration-150",
            isActive ? "animate-wave" : "h-1"
          )}
          style={{ 
            height: isActive ? `${Math.max(3, Math.random() * 24)}px` : "4px",
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWave;
