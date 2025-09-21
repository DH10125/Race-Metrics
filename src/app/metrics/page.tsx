'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock categories - will be replaced with real API calls
const mockCategories = [
  { id: '1', name: 'Engine Performance', color: '#ef4444' },
  { id: '2', name: 'Suspension Setup', color: '#f97316' },
  { id: '3', name: 'Tire Performance', color: '#eab308' },
  { id: '4', name: 'Aerodynamics', color: '#22c55e' },
  { id: '5', name: 'Transmission', color: '#3b82f6' },
  { id: '6', name: 'Braking System', color: '#8b5cf6' },
  { id: '7', name: 'Weight Distribution', color: '#ec4899' },
  { id: '8', name: 'Electronics', color: '#06b6d4' },
  { id: '9', name: 'Safety Equipment', color: '#64748b' },
  { id: '10', name: 'Fuel System', color: '#84cc16' },
]

export default function MetricsPage() {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    value: '',
    unit: '',
    type: 'PHYSICAL',
    component: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      categoryId: '',
      name: '',
      value: '',
      unit: '',
      type: 'PHYSICAL',
      component: '',
      notes: ''
    })
    
    // Clear success message after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
                <h1 className="text-2xl font-bold text-gray-900">Record Metrics</h1>
                <p className="text-sm text-gray-600">Log car performance and modification data</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Metric recorded successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Category Selection */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {mockCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Metric Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Metric Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Front Left Tire Pressure"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Value and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                  Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  required
                  placeholder="32.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="PSI, RPM, inches, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Type and Component */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Modification Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PHYSICAL">Physical</option>
                  <option value="ELECTRONIC">Electronic</option>
                </select>
              </div>
              <div>
                <label htmlFor="component" className="block text-sm font-medium text-gray-700 mb-2">
                  Component (Optional)
                </label>
                <input
                  type="text"
                  id="component"
                  name="component"
                  value={formData.component}
                  onChange={handleInputChange}
                  placeholder="Front Left, ECU, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Additional details, conditions, or observations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Recording...' : 'Record Metric'}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Recording Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Recording Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Physical Modifications:</h4>
              <ul className="space-y-1">
                <li>• Suspension settings and heights</li>
                <li>• Tire pressures and compounds</li>
                <li>• Weight distribution and ballast</li>
                <li>• Aerodynamic adjustments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Electronic Modifications:</h4>
              <ul className="space-y-1">
                <li>• ECU parameters and maps</li>
                <li>• Sensor readings and calibrations</li>
                <li>• Data logging configurations</li>
                <li>• Electronic aid settings</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}