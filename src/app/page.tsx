'use client'

import { useState } from 'react'
import { CarSpecs, SessionData, Recommendation } from '@/types'
import CarSetupForm from '@/components/CarSetupForm'
import SessionDataEntry from '@/components/SessionDataEntry'
import MetricsDashboard from '@/components/MetricsDashboard'
import RecommendationsPanel from '@/components/RecommendationsPanel'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'setup' | 'session' | 'dashboard' | 'recommendations'>('dashboard')
  const [carSpecs, setCarSpecs] = useState<CarSpecs | null>(null)
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: '📊' },
    { id: 'setup' as const, label: 'Car Setup', icon: '🔧' },
    { id: 'session' as const, label: 'Session Data', icon: '⏱️' },
    { id: 'recommendations' as const, label: 'Recommendations', icon: '💡' },
  ]

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-racing-black mb-2">
          Race Metrics Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive tracking and optimization for 6-Shooter class racing
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-racing-blue shadow-sm'
                  : 'text-gray-600 hover:text-racing-blue'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'dashboard' && (
          <MetricsDashboard 
            carSpecs={carSpecs}
            sessions={sessions}
            recommendations={recommendations}
          />
        )}
        
        {activeTab === 'setup' && (
          <CarSetupForm 
            carSpecs={carSpecs}
            onSave={setCarSpecs}
          />
        )}
        
        {activeTab === 'session' && (
          <SessionDataEntry 
            carSpecs={carSpecs}
            onSessionSave={(session) => setSessions(prev => [...prev, session])}
          />
        )}
        
        {activeTab === 'recommendations' && (
          <RecommendationsPanel 
            recommendations={recommendations}
            onUpdateRecommendation={(id, updates) => {
              setRecommendations(prev => 
                prev.map(rec => rec.id === id ? { ...rec, ...updates } : rec)
              )
            }}
          />
        )}
      </div>
    </div>
  )
}