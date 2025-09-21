export interface CarSpecs {
  id: string;
  carNumber: string;
  driver: string;
  // Engine specifications
  engine: {
    displacement: number; // cubic inches
    compressionRatio: number;
    fuelSystem: 'carburetor' | 'injection';
    ignitionTiming: number; // degrees BTDC
    fuelMixture: number; // air-fuel ratio
  };
  // Suspension & Handling
  suspension: {
    frontSpringRate: number; // lbs/in
    rearSpringRate: number; // lbs/in
    frontShockSetting: number;
    rearShockSetting: number;
    frontCamber: number; // degrees
    rearCamber: number; // degrees
    toe: number; // degrees
    caster: number; // degrees
  };
  // Tire & Wheel Setup
  wheels: {
    frontTireSize: string;
    rearTireSize: string;
    frontTirePressure: number; // PSI
    rearTirePressure: number; // PSI
    wheelOffset: number; // mm
  };
  // Weight & Balance
  weight: {
    totalWeight: number; // lbs
    frontWeight: number; // lbs
    rearWeight: number; // lbs
    leftWeight: number; // lbs
    rightWeight: number; // lbs
    crossWeight: number; // %
  };
  // Electronics
  electronics: {
    rpmLimiter: number;
    shiftLight: number;
    dataLogger: boolean;
    transponder: string;
  };
}

export interface SessionData {
  id: string;
  carId: string;
  date: string;
  trackName: string;
  trackCondition: 'dry' | 'wet' | 'mixed';
  temperature: number; // Fahrenheit
  humidity: number; // %
  // Performance data
  bestLapTime: number; // seconds
  averageLapTime: number; // seconds
  topSpeed: number; // mph
  // Telemetry
  telemetry: {
    rpmData: number[];
    speedData: number[];
    throttlePosition: number[];
    brakePosition: number[];
    lapTimes: number[];
  };
  // Post-session notes
  driverFeedback: string;
  mechanicNotes: string;
}

export interface Recommendation {
  id: string;
  sessionId: string;
  category: 'engine' | 'suspension' | 'wheels' | 'weight' | 'electronics';
  title: string;
  description: string;
  suggestedChange: string;
  expectedImprovement: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'denied' | 'implemented';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface MetricTrend {
  metric: string;
  values: Array<{
    date: string;
    value: number;
    sessionId: string;
  }>;
  trend: 'improving' | 'declining' | 'stable';
  changePercent: number;
}

export interface HSRACompliance {
  compliant: boolean;
  violations: Array<{
    rule: string;
    description: string;
    severity: 'warning' | 'violation';
  }>;
  lastChecked: string;
}