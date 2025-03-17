import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, AlertTriangle, Thermometer, Brain } from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import { healthPatterns } from "@/config/healthPatterns";

interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  normalRange: {
    min: number;
    max: number;
  };
}

interface HealthAlert {
  id: string;
  type: "mild" | "moderate" | "severe";
  message: string;
  timestamp: Date;
}

interface HealthCondition {
  name: string;
  severity: "mild" | "moderate" | "severe";
  affectedMetrics: string[];
}

const estimateMetricValue = (
  metric: HealthMetric,
  conditions: HealthCondition[]
): HealthMetric => {
  let newValue = metric.value;
  let newStatus: "normal" | "warning" | "critical" = "normal";
  let newTrend: "up" | "down" | "stable" = "stable";

  // Find conditions that affect this metric
  const relevantConditions = conditions.filter(condition => 
    condition.affectedMetrics.includes(metric.name)
  );

  if (relevantConditions.length > 0) {
    // Calculate impact based on severity
    const severityImpact = relevantConditions.reduce((acc, condition) => {
      const multiplier = condition.severity === "severe" ? 1.5 : 
                        condition.severity === "moderate" ? 1.2 : 1.1;
      return acc * multiplier;
    }, 1);

    // Apply impact based on metric type
    switch (metric.name) {
      case "Heart Rate":
        newValue = 75 * severityImpact;
        newStatus = newValue > 100 ? "warning" : newValue > 120 ? "critical" : "normal";
        break;
      case "Blood Pressure":
        newValue = 120 * severityImpact;
        newStatus = newValue > 140 ? "warning" : newValue > 160 ? "critical" : "normal";
        break;
      case "Body Temperature":
        newValue = 37.2 * severityImpact;
        newStatus = newValue > 38.5 ? "warning" : newValue > 39.5 ? "critical" : "normal";
        break;
      case "Stress Level":
        newValue = 45 * severityImpact;
        newStatus = newValue > 70 ? "warning" : newValue > 85 ? "critical" : "normal";
        break;
    }

    // Determine trend based on severity
    const hasSevereCondition = relevantConditions.some(c => c.severity === "severe");
    const hasModerateCondition = relevantConditions.some(c => c.severity === "moderate");
    
    if (hasSevereCondition) {
      newTrend = "up";
    } else if (hasModerateCondition) {
      newTrend = Math.random() > 0.5 ? "up" : "stable";
    }
  }

  return {
    ...metric,
    value: newValue,
    status: newStatus,
    trend: newTrend
  };
};

const LiveHealthDashboard = () => {
  const [conditions, setConditions] = useState<HealthCondition[]>([
    {
      name: "Headache",
      severity: "mild",
      affectedMetrics: ["Stress Level", "Heart Rate"]
    },
    {
      name: "Fever",
      severity: "moderate",
      affectedMetrics: ["Body Temperature", "Heart Rate"]
    }
  ]);

  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      name: "Heart Rate",
      value: 75,
      unit: "bpm",
      status: "normal",
      trend: "stable",
      normalRange: { min: 60, max: 100 }
    },
    {
      name: "Blood Pressure",
      value: 120,
      unit: "mmHg",
      status: "normal",
      trend: "stable",
      normalRange: { min: 90, max: 140 }
    },
    {
      name: "Body Temperature",
      value: 37.2,
      unit: "°C",
      status: "normal",
      trend: "stable",
      normalRange: { min: 36.1, max: 37.2 }
    },
    {
      name: "Stress Level",
      value: 45,
      unit: "%",
      status: "warning",
      trend: "up",
      normalRange: { min: 0, max: 50 }
    }
  ]);

  const [alerts, setAlerts] = useState<HealthAlert[]>([
    {
      id: "1",
      type: "mild",
      message: "Increased stress levels detected. Consider taking a break.",
      timestamp: new Date()
    },
    {
      id: "2",
      type: "moderate",
      message: "Blood pressure slightly elevated. Monitor for changes.",
      timestamp: new Date()
    }
  ]);

  // Simulate real-time updates with disease-based estimation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics based on conditions
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => estimateMetricValue(metric, conditions))
      );

      // Generate relevant alerts based on conditions
      conditions.forEach(condition => {
        if (Math.random() > 0.7) {
          const newAlert: HealthAlert = {
            id: Date.now().toString(),
            type: condition.severity,
            message: `${condition.name} symptoms are ${condition.severity}. Monitor your health.`,
            timestamp: new Date()
          };
          setAlerts(prev => [newAlert, ...prev].slice(0, 5));
        }
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [conditions]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              {metric.name === "Heart Rate" && <Heart className="h-4 w-4 text-health-primary" />}
              {metric.name === "Blood Pressure" && <Activity className="h-4 w-4 text-health-primary" />}
              {metric.name === "Body Temperature" && <Thermometer className="h-4 w-4 text-health-primary" />}
              {metric.name === "Stress Level" && <Brain className="h-4 w-4 text-health-primary" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value.toFixed(1)} {metric.unit}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <SeverityBadge severity={metric.status === "critical" ? "severe" : metric.status === "warning" ? "moderate" : "mild"} />
                <span className="text-xs text-muted-foreground">
                  {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Normal: {metric.normalRange.min}-{metric.normalRange.max} {metric.unit}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-health-severe" />
            Health Alerts
          </CardTitle>
          <CardDescription>
            Real-time health alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={alert.type} />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveHealthDashboard; 