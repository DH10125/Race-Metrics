'use client'

import Link from 'next/link'

// Mock car data
const mockCar = {
  id: '1',
  name: 'Thunder Bolt',
  make: 'Custom',
  model: '6-Shooter Special',
  year: 2023,
  vin: 'SAMPLE123456789',
  createdAt: new Date('2024-01-10'),
  totalMetrics: 147,
  lastUpdated: new Date()
}

export default function CarsPage() {
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
                <h1 className="text-2xl font-bold text-gray-900">Car Management</h1>
                <p className="text-sm text-gray-600">Manage your 6-Shooter class race cars</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Add New Car
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Current Car */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Current Active Car</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{mockCar.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Make</p>
                    <p className="text-lg text-gray-900">{mockCar.make}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Model</p>
                    <p className="text-lg text-gray-900">{mockCar.model}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Year</p>
                    <p className="text-lg text-gray-900">{mockCar.year}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">VIN</p>
                    <p className="text-sm text-gray-900 font-mono">{mockCar.vin}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Metrics Recorded</p>
                    <p className="text-2xl font-bold text-blue-600">{mockCar.totalMetrics}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Added to System</p>
                    <p className="text-lg text-gray-900">{mockCar.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Updated</p>
                    <p className="text-lg text-gray-900">
                      {mockCar.lastUpdated.toLocaleDateString()} at {mockCar.lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="ml-6 flex flex-col space-y-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Edit Details
                </button>
                <Link 
                  href="/metrics" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center"
                >
                  Record Metrics
                </Link>
                <Link 
                  href="/dashboard" 
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-center"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Car Specifications */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">6-Shooter Class Specifications</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">HSRA Compliance Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Engine displacement limits</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Weight requirements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Safety equipment installed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Tire specifications met</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tracking Categories</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-50 text-red-700 px-3 py-2 rounded">Engine Performance</div>
                  <div className="bg-orange-50 text-orange-700 px-3 py-2 rounded">Suspension Setup</div>
                  <div className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded">Tire Performance</div>
                  <div className="bg-green-50 text-green-700 px-3 py-2 rounded">Aerodynamics</div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded">Transmission</div>
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded">Braking System</div>
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded">Weight Distribution</div>
                  <div className="bg-cyan-50 text-cyan-700 px-3 py-2 rounded">Electronics</div>
                  <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded">Safety Equipment</div>
                  <div className="bg-lime-50 text-lime-700 px-3 py-2 rounded">Fuel System</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}