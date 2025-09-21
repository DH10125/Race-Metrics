import { CarSpecs, SessionData, Recommendation } from '@/types'

export class RecommendationEngine {
  static generateRecommendations(
    carSpecs: CarSpecs,
    sessions: SessionData[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = []
    
    if (sessions.length < 2) {
      return recommendations // Need at least 2 sessions for comparison
    }

    const latestSession = sessions[sessions.length - 1]
    const previousSessions = sessions.slice(0, -1)
    const averagePreviousLapTime = previousSessions.reduce((sum, s) => sum + s.bestLapTime, 0) / previousSessions.length

    // Analyze lap time trends
    if (latestSession.bestLapTime > averagePreviousLapTime * 1.02) {
      // Lap times are getting worse
      recommendations.push(this.createSuspensionRecommendation(carSpecs, latestSession))
      recommendations.push(this.createTireRecommendation(carSpecs, latestSession))
    }

    // Analyze consistency
    const lapTimeVariance = this.calculateLapTimeVariance(latestSession.telemetry?.lapTimes || [])
    if (lapTimeVariance > 2.0) {
      recommendations.push(this.createConsistencyRecommendation(carSpecs, latestSession))
    }

    // Analyze top speed vs acceleration
    const speedRatio = latestSession.topSpeed / (latestSession.bestLapTime * 10)
    if (speedRatio < 1.5) {
      recommendations.push(this.createEngineRecommendation(carSpecs, latestSession))
    }

    return recommendations
  }

  private static createSuspensionRecommendation(carSpecs: CarSpecs, session: SessionData): Recommendation {
    return {
      id: crypto.randomUUID(),
      sessionId: session.id,
      category: 'suspension',
      title: 'Optimize Suspension Setup',
      description: 'Recent lap times suggest the suspension setup could be improved for better handling',
      suggestedChange: `Consider adjusting spring rates: Front from ${carSpecs.suspension.frontSpringRate} to ${carSpecs.suspension.frontSpringRate - 25} lb/in`,
      expectedImprovement: 'Better cornering speed and 0.2-0.5 second lap time improvement',
      priority: 'high',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }

  private static createTireRecommendation(carSpecs: CarSpecs, session: SessionData): Recommendation {
    return {
      id: crypto.randomUUID(),
      sessionId: session.id,
      category: 'wheels',
      title: 'Adjust Tire Pressures',
      description: 'Tire performance analysis suggests pressure optimization needed',
      suggestedChange: `Adjust tire pressures: Front from ${carSpecs.wheels.frontTirePressure} to ${carSpecs.wheels.frontTirePressure + 2} PSI`,
      expectedImprovement: 'Improved tire contact patch and better grip',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }

  private static createConsistencyRecommendation(carSpecs: CarSpecs, session: SessionData): Recommendation {
    return {
      id: crypto.randomUUID(),
      sessionId: session.id,
      category: 'suspension',
      title: 'Improve Consistency',
      description: 'High lap time variance indicates potential handling issues',
      suggestedChange: 'Review shock dampening settings and alignment',
      expectedImprovement: 'More consistent lap times and better driver confidence',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }

  private static createEngineRecommendation(carSpecs: CarSpecs, session: SessionData): Recommendation {
    return {
      id: crypto.randomUUID(),
      sessionId: session.id,
      category: 'engine',
      title: 'Optimize Engine Performance',
      description: 'Power-to-weight ratio suggests engine tuning opportunities',
      suggestedChange: `Consider advancing timing from ${carSpecs.engine.ignitionTiming}° to ${carSpecs.engine.ignitionTiming + 2}° BTDC`,
      expectedImprovement: 'Increased power output and better acceleration',
      priority: 'low',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }

  private static calculateLapTimeVariance(lapTimes: number[]): number {
    if (lapTimes.length < 2) return 0
    
    const mean = lapTimes.reduce((sum, time) => sum + time, 0) / lapTimes.length
    const variance = lapTimes.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / lapTimes.length
    
    return Math.sqrt(variance)
  }
}

export function formatTime(seconds: number): string {
  if (!seconds || seconds === Infinity) return 'N/A'
  const minutes = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(3)
  return `${minutes}:${secs.padStart(6, '0')}`
}

export function validateHSRACompliance(carSpecs: CarSpecs): { compliant: boolean; violations: string[] } {
  const violations: string[] = []

  // Engine displacement limit for 6-Shooter class
  if (carSpecs.engine.displacement > 360) {
    violations.push('Engine displacement exceeds 360 cubic inch limit')
  }

  // Compression ratio limit
  if (carSpecs.engine.compressionRatio > 10.0) {
    violations.push('Compression ratio exceeds 10.0:1 limit')
  }

  // Weight minimum
  if (carSpecs.weight.totalWeight < 2700) {
    violations.push('Car weight below 2700 lb minimum')
  }

  // Tire size restrictions (example)
  const maxTireWidth = 275 // mm
  if (carSpecs.wheels.frontTireSize.includes('/') && 
      parseInt(carSpecs.wheels.frontTireSize.split('/')[0]) > maxTireWidth) {
    violations.push('Front tire width exceeds maximum allowed')
  }

  return {
    compliant: violations.length === 0,
    violations
  }
}