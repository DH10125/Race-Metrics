'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data for now - will be replaced with real API calls
const mockMetrics = [
  { id: '1', name: 'Engine RPM', value: 6500, unit: 'rpm', category: 'Engine Performance', timestamp: new Date(), type: 'ELECTRONIC' },
  { id: '2', name: 'Tire Pressure FL', value: 32.5, unit: 'PSI', category: 'Tire Performance', timestamp: new Date(), type: 'PHYSICAL' },
  { id: '3', name: 'Suspension Height FR', value: 4.2, unit: 'inches', category: 'Suspension Setup', timestamp: new Date(), type: 'PHYSICAL' },
  { id: '4', name: 'Fuel Pressure', value: 58.3, unit: 'PSI', category: 'Fuel System', timestamp: new Date(), type: 'ELECTRONIC' },
]

const mockRecommendations = [
  { id: '1', title: 'Increase Tire Pressure', description: 'Front left tire pressure is low', priority: 'HIGH', status: 'PENDING' },
  { id: '2', title: 'Adjust Suspension', description: 'Front right suspension height needs adjustment', priority: 'MEDIUM', status: 'PENDING' },
  { id: '3', title: 'Check Fuel System', description: 'Fuel pressure slightly below optimal', priority: 'LOW', status: 'PENDING' },
]

export default function Dashboard() {
  const [metrics] = useState(mockMetrics)
  const [recommendations] = useState(mockRecommendations)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800'
      case 'HIGH': return 'bg-orange-100 text-orange-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    return type === 'PHYSICAL' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                ← Back to Home
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Real-time race car metrics overview</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href="/metrics" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Record Metrics
              </Link>
              <Link href="/recommendations" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                View All Recommendations
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Metrics</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Recommendations</p>
                <p className="text-2xl font-bold text-gray-900">{recommendations.filter(r => r.status === 'PENDING').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600">Online</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-900">Just now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Metrics */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{metric.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(metric.type)}`}>
                          {metric.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{metric.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {metric.value} {metric.unit}
                      </p>
                      <p className="text-xs text-gray-500">
                        {metric.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link href="/metrics" className="text-blue-600 hover:text-blue-700 font-medium">
                  View all metrics →
                </Link>
              </div>
            </div>
          </div>

          {/* Pending Recommendations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pending Recommendations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recommendations.filter(r => r.status === 'PENDING').map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{rec.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700 transition-colors">
                        Accept
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 transition-colors">
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link href="/recommendations" className="text-blue-600 hover:text-blue-700 font-medium">
                  View all recommendations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}