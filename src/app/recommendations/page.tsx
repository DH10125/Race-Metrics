'use client'

import { useState } from 'react'
import Link from 'next/link'

type RecommendationStatus = 'PENDING' | 'ACCEPTED' | 'DENIED' | 'IMPLEMENTED'
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

interface Recommendation {
  id: string
  title: string
  description: string
  change: string
  expectedImpact: string
  priority: Priority
  status: RecommendationStatus
  createdAt: Date
  metricName?: string
  respondedAt?: Date
  respondedBy?: string
  response?: string
}

// Mock recommendations data
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Increase Front Left Tire Pressure',
    description: 'Front left tire pressure is currently at 30.2 PSI, which is below the optimal range for 6-Shooter class racing.',
    change: 'Increase tire pressure to 32-34 PSI',
    expectedImpact: 'Improved cornering stability and reduced tire wear. Expected lap time improvement of 0.2-0.4 seconds.',
    priority: 'HIGH',
    status: 'PENDING',
    createdAt: new Date('2024-01-15T10:30:00'),
    metricName: 'Tire Pressure FL'
  },
  {
    id: '2',
    title: 'Adjust Front Right Suspension Height',
    description: 'Front right suspension is 0.3 inches higher than front left, causing handling imbalance.',
    change: 'Lower front right suspension by 0.2-0.3 inches',
    expectedImpact: 'Improved vehicle balance and cornering predictability. Better weight distribution.',
    priority: 'MEDIUM',
    status: 'PENDING',
    createdAt: new Date('2024-01-15T09:15:00'),
    metricName: 'Suspension Height FR'
  },
  {
    id: '3',
    title: 'Optimize Fuel Pressure Settings',
    description: 'Fuel pressure reading at 56.8 PSI is slightly below optimal range for current engine configuration.',
    change: 'Increase fuel pressure to 58-60 PSI range',
    expectedImpact: 'Better engine performance at high RPM. Improved throttle response.',
    priority: 'LOW',
    status: 'PENDING',
    createdAt: new Date('2024-01-15T08:45:00'),
    metricName: 'Fuel Pressure'
  },
  {
    id: '4',
    title: 'ECU Timing Adjustment',
    description: 'Based on recent track data, ignition timing can be optimized for better performance.',
    change: 'Advance timing by 2-3 degrees at peak torque RPM',
    expectedImpact: 'Increased horsepower and torque output. Better acceleration.',
    priority: 'MEDIUM',
    status: 'ACCEPTED',
    createdAt: new Date('2024-01-14T16:20:00'),
    respondedAt: new Date('2024-01-14T17:30:00'),
    respondedBy: 'Mike Johnson',
    response: 'Approved for next session. Will adjust during pre-race setup.'
  },
  {
    id: '5',
    title: 'Rear Wing Angle Adjustment',
    description: 'Current rear wing angle may be producing excessive drag for this track configuration.',
    change: 'Reduce rear wing angle by 2-3 degrees',
    expectedImpact: 'Reduced drag, higher top speed on straights. May slightly reduce cornering downforce.',
    priority: 'LOW',
    status: 'DENIED',
    createdAt: new Date('2024-01-14T14:15:00'),
    respondedAt: new Date('2024-01-14T15:45:00'),
    respondedBy: 'Sarah Wilson',
    response: 'Track has too many high-speed corners. Need the downforce for stability.'
  }
]

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations)
  const [filter, setFilter] = useState<'ALL' | RecommendationStatus>('ALL')

  const handleResponse = (id: string, status: 'ACCEPTED' | 'DENIED', response: string) => {
    setRecommendations(prev => prev.map(rec => 
      rec.id === id 
        ? { 
            ...rec, 
            status, 
            response, 
            respondedAt: new Date(), 
            respondedBy: 'Current User' 
          } as Recommendation
        : rec
    ))
  }

  const filteredRecommendations = filter === 'ALL' 
    ? recommendations 
    : recommendations.filter(rec => rec.status === filter)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-200'
      case 'DENIED': return 'bg-red-100 text-red-800 border-red-200'
      case 'IMPLEMENTED': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRecommendationCount = (status: string) => {
    return status === 'ALL' 
      ? recommendations.length 
      : recommendations.filter(rec => rec.status === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                ← Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Recommendations</h1>
                <p className="text-sm text-gray-600">AI-powered performance optimization suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'ALL', label: 'All Recommendations' },
                { key: 'PENDING', label: 'Pending' },
                { key: 'ACCEPTED', label: 'Accepted' },
                { key: 'DENIED', label: 'Denied' },
                { key: 'IMPLEMENTED', label: 'Implemented' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'ALL' | RecommendationStatus)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({getRecommendationCount(tab.key)})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {filteredRecommendations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
              <p className="text-gray-600">
                {filter === 'ALL' 
                  ? 'No recommendations available at this time.' 
                  : `No ${filter.toLowerCase()} recommendations found.`}
              </p>
            </div>
          ) : (
            filteredRecommendations.map(recommendation => (
              <div key={recommendation.id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {recommendation.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(recommendation.status)}`}>
                          {recommendation.status}
                        </span>
                      </div>
                      {recommendation.metricName && (
                        <p className="text-sm text-gray-600 mb-2">
                          Related to: <span className="font-medium">{recommendation.metricName}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Created {recommendation.createdAt.toLocaleDateString()} at {recommendation.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Issue Description</h4>
                      <p className="text-gray-700">{recommendation.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Recommended Change</h4>
                      <p className="text-gray-700">{recommendation.change}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Expected Impact</h4>
                      <p className="text-gray-700">{recommendation.expectedImpact}</p>
                    </div>

                    {/* Response Section */}
                    {recommendation.status === 'PENDING' ? (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Mechanic Response</h4>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleResponse(recommendation.id, 'ACCEPTED', 'Approved for implementation.')}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleResponse(recommendation.id, 'DENIED', 'Declined - need more analysis.')}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    ) : recommendation.response && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Mechanic Response</h4>
                        <div className="bg-gray-50 rounded-md p-3">
                          <p className="text-gray-700 mb-2">{recommendation.response}</p>
                          <p className="text-xs text-gray-500">
                            Responded by {recommendation.respondedBy} on{' '}
                            {recommendation.respondedAt?.toLocaleDateString()} at{' '}
                            {recommendation.respondedAt?.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}