export interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface Metric {
  id: string;
  carId: string;
  categoryId: string;
  name: string;
  value: number;
  unit?: string;
  timestamp: Date;
  notes?: string;
  type: MetricType;
  component?: string;
}

export interface Recommendation {
  id: string;
  carId: string;
  metricId?: string;
  title: string;
  description: string;
  change: string;
  expectedImpact: string;
  priority: Priority;
  status: RecommendationStatus;
  response?: string;
  respondedAt?: Date;
  respondedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum MetricType {
  PHYSICAL = 'PHYSICAL',
  ELECTRONIC = 'ELECTRONIC'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum RecommendationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  IMPLEMENTED = 'IMPLEMENTED'
}

export interface MetricWithCategory extends Metric {
  category: MetricCategory;
}

export interface RecommendationWithMetric extends Recommendation {
  metric?: Metric;
}