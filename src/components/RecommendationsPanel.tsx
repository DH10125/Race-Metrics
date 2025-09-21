'use client'

import { Recommendation } from '@/types'

interface RecommendationsPanelProps {
  recommendations: Recommendation[]
  onUpdateRecommendation: (id: string, updates: Partial<Recommendation>) => void
}

export default function RecommendationsPanel({ recommendations, onUpdateRecommendation }: RecommendationsPanelProps) {
  const handleStatusChange = (id: string, status: Recommendation['status'], notes?: string) => {
    onUpdateRecommendation(id, {
      status,
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Mechanic', // In a real app, this would be the logged-in user
      reviewNotes: notes
    })
  }

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getStatusColor = (status: Recommendation['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'denied': return 'bg-red-100 text-red-800'
      case 'implemented': return 'bg-green-100 text-green-800'
    }
  }

  // Generate sample recommendations if none exist
  const sampleRecommendations: Recommendation[] = recommendations.length === 0 ? [
    {
      id: '1',
      sessionId: 'sample',
      category: 'suspension',
      title: 'Reduce Front Spring Rate',
      description: 'Front end appears to be pushing in corners based on lap time analysis',
      suggestedChange: 'Decrease front spring rate from 350 to 325 lb/in',
      expectedImprovement: 'Better front grip, estimated 0.2-0.4 second lap time improvement',
      priority: 'high',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      sessionId: 'sample',
      category: 'engine',
      title: 'Advance Ignition Timing',
      description: 'Engine performance analysis suggests timing could be optimized',
      suggestedChange: 'Advance timing from 12° to 14° BTDC',
      expectedImprovement: 'Increased power output, better throttle response',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      sessionId: 'sample',
      category: 'wheels',
      title: 'Adjust Tire Pressure',
      description: 'Tire wear patterns suggest pressure adjustments needed',
      suggestedChange: 'Increase rear tire pressure from 30 to 32 PSI',
      expectedImprovement: 'More even tire wear, better rear stability',
      priority: 'low',
      status: 'approved',
      createdAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Mechanic',
      reviewNotes: 'Good observation, will implement before next session'
    }
  ] : recommendations

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-racing-black">Performance Recommendations</h2>
        <div className="text-sm text-gray-600">
          {sampleRecommendations.length} recommendation{sampleRecommendations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {sampleRecommendations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations Yet</h3>
          <p className="text-gray-500">
            Record some session data first, and our analysis engine will generate performance recommendations.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sampleRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(recommendation.priority)}`}>
                        {recommendation.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {recommendation.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {recommendation.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(recommendation.status)}`}>
                    {recommendation.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Analysis</h4>
                  <p className="text-gray-700">{recommendation.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Suggested Change</h4>
                  <p className="text-gray-700">{recommendation.suggestedChange}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Expected Improvement</h4>
                  <p className="text-gray-700">{recommendation.expectedImprovement}</p>
                </div>

                {recommendation.reviewNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Review Notes</h4>
                    <p className="text-gray-700 italic">&quot;{recommendation.reviewNotes}&quot;</p>
                    <p className="text-xs text-gray-500 mt-1">
                      - {recommendation.reviewedBy} on {new Date(recommendation.reviewedAt!).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {recommendation.status === 'pending' && (
                  <div className="flex space-x-2 pt-4 border-t">
                    <button
                      onClick={() => {
                        const notes = prompt('Add review notes (optional):')
                        handleStatusChange(recommendation.id, 'approved', notes || '')
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => {
                        const notes = prompt('Reason for denial (optional):')
                        handleStatusChange(recommendation.id, 'denied', notes || '')
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      ✗ Deny
                    </button>
                  </div>
                )}

                {recommendation.status === 'approved' && (
                  <div className="flex space-x-2 pt-4 border-t">
                    <button
                      onClick={() => {
                        const notes = prompt('Implementation notes (optional):')
                        handleStatusChange(recommendation.id, 'implemented', notes || '')
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      🔧 Mark as Implemented
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500">
                Created on {new Date(recommendation.createdAt).toLocaleDateString()} at {new Date(recommendation.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Performance Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Performance Tips</h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• Make one change at a time to properly evaluate its impact</p>
          <p>• Keep detailed notes on all setup changes and their effects</p>
          <p>• Consider track conditions when implementing recommendations</p>
          <p>• Always prioritize safety-related recommendations first</p>
        </div>
      </div>
    </div>
  )
}