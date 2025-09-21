'use client'

import { CarSpecs, SessionData, Recommendation, MetricTrend } from '@/types'
import { useMemo } from 'react'

interface MetricsDashboardProps {
  carSpecs: CarSpecs | null
  sessions: SessionData[]
  recommendations: Recommendation[]
}

export default function MetricsDashboard({ carSpecs, sessions, recommendations }: MetricsDashboardProps) {
  const metrics = useMemo(() => {
    if (sessions.length === 0) return null

    const totalSessions = sessions.length
    const bestLapTime = Math.min(...sessions.map(s => s.bestLapTime).filter(t => t > 0))
    const averageLapTime = sessions.reduce((sum, s) => sum + (s.averageLapTime || 0), 0) / totalSessions
    const topSpeed = Math.max(...sessions.map(s => s.topSpeed))
    
    // Calculate trends
    const lapTimeTrend = sessions.length >= 2 ? 
      (sessions[sessions.length - 1].bestLapTime - sessions[0].bestLapTime) / sessions[0].bestLapTime * 100 : 0

    return {
      totalSessions,
      bestLapTime,
      averageLapTime,
      topSpeed,
      lapTimeTrend
    }
  }, [sessions])

  const formatTime = (seconds: number) => {
    if (!seconds || seconds === Infinity) return 'N/A'
    const minutes = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(3)
    return `${minutes}:${secs.padStart(6, '0')}`
  }

  const getRecommendationStats = () => {
    const pending = recommendations.filter(r => r.status === 'pending').length
    const approved = recommendations.filter(r => r.status === 'approved').length
    const implemented = recommendations.filter(r => r.status === 'implemented').length
    
    return { pending, approved, implemented }
  }

  const recentSessions = sessions.slice(-5).reverse()
  const { pending, approved, implemented } = getRecommendationStats()

  if (!carSpecs) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Welcome to Race Metrics</h3>
        <p className="text-gray-500 mb-6">Get started by configuring your car setup and entering session data.</p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. Configure your car setup in the &quot;Car Setup&quot; tab</p>
          <p>2. Record session data after each track day</p>
          <p>3. Review recommendations and track your progress</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-racing-black mb-2">Performance Dashboard</h2>
        <p className="text-gray-600">Car #{carSpecs.carNumber} - {carSpecs.driver}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-racing-blue to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Sessions</p>
              <p className="text-2xl font-bold">{metrics?.totalSessions || 0}</p>
            </div>
            <div className="text-blue-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-racing-red to-red-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Best Lap Time</p>
              <p className="text-2xl font-bold font-mono">{formatTime(metrics?.bestLapTime || 0)}</p>
            </div>
            <div className="text-red-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-racing-yellow to-yellow-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Top Speed</p>
              <p className="text-2xl font-bold">{metrics?.topSpeed || 0} mph</p>
            </div>
            <div className="text-yellow-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Lap Time Trend</p>
              <p className="text-2xl font-bold">
                {metrics?.lapTimeTrend ? 
                  `${metrics.lapTimeTrend > 0 ? '+' : ''}${metrics.lapTimeTrend.toFixed(1)}%` : 
                  'N/A'
                }
              </p>
            </div>
            <div className="text-green-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Recent Sessions</h3>
          </div>
          <div className="p-4">
            {recentSessions.length > 0 ? (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{session.trackName}</p>
                      <p className="text-sm text-gray-600">{new Date(session.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">{formatTime(session.bestLapTime)}</p>
                      <p className="text-xs text-gray-500">{session.topSpeed} mph</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No sessions recorded yet</p>
            )}
          </div>
        </div>

        {/* Recommendations Summary */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{approved}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{implemented}</div>
                <div className="text-sm text-gray-600">Implemented</div>
              </div>
            </div>
            
            {recommendations.length > 0 ? (
              <div className="space-y-2">
                {recommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{rec.title}</p>
                      <p className="text-xs text-gray-500">{rec.category}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rec.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      rec.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      rec.status === 'implemented' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {rec.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recommendations yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Car Specifications Summary */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Current Car Setup</h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Engine</p>
            <p>{carSpecs.engine.displacement} cu in</p>
            <p>{carSpecs.engine.compressionRatio}:1 CR</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Suspension</p>
            <p>F: {carSpecs.suspension.frontSpringRate} lb/in</p>
            <p>R: {carSpecs.suspension.rearSpringRate} lb/in</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Tires</p>
            <p>F: {carSpecs.wheels.frontTireSize}</p>
            <p>R: {carSpecs.wheels.rearTireSize}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Weight</p>
            <p>{carSpecs.weight.totalWeight} lbs</p>
            <p>{carSpecs.weight.crossWeight}% cross</p>
          </div>
        </div>
      </div>
    </div>
  )
}