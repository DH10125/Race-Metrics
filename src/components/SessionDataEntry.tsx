'use client'

import { useState } from 'react'
import { CarSpecs, SessionData } from '@/types'

interface SessionDataEntryProps {
  carSpecs: CarSpecs | null
  onSessionSave: (session: SessionData) => void
}

export default function SessionDataEntry({ carSpecs, onSessionSave }: SessionDataEntryProps) {
  const [sessionData, setSessionData] = useState<Partial<SessionData>>({
    id: crypto.randomUUID(),
    date: new Date().toISOString().split('T')[0],
    trackCondition: 'dry',
    temperature: 75,
    humidity: 50,
    bestLapTime: 0,
    averageLapTime: 0,
    topSpeed: 0,
    driverFeedback: '',
    mechanicNotes: '',
    telemetry: {
      rpmData: [],
      speedData: [],
      throttlePosition: [],
      brakePosition: [],
      lapTimes: [],
    }
  })

  const [lapTimeInput, setLapTimeInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!carSpecs) {
      alert('Please configure car setup first!')
      return
    }

    const session: SessionData = {
      ...sessionData,
      carId: carSpecs.id,
      trackName: sessionData.trackName || '',
      date: sessionData.date || new Date().toISOString(),
      trackCondition: sessionData.trackCondition || 'dry',
      temperature: sessionData.temperature || 75,
      humidity: sessionData.humidity || 50,
      bestLapTime: sessionData.bestLapTime || 0,
      averageLapTime: sessionData.averageLapTime || 0,
      topSpeed: sessionData.topSpeed || 0,
      driverFeedback: sessionData.driverFeedback || '',
      mechanicNotes: sessionData.mechanicNotes || '',
      telemetry: sessionData.telemetry || {
        rpmData: [],
        speedData: [],
        throttlePosition: [],
        brakePosition: [],
        lapTimes: [],
      }
    } as SessionData

    onSessionSave(session)
    alert('Session data saved successfully!')
    
    // Reset form
    setSessionData({
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      trackCondition: 'dry',
      temperature: 75,
      humidity: 50,
      bestLapTime: 0,
      averageLapTime: 0,
      topSpeed: 0,
      driverFeedback: '',
      mechanicNotes: '',
      telemetry: {
        rpmData: [],
        speedData: [],
        throttlePosition: [],
        brakePosition: [],
        lapTimes: [],
      }
    })
    setLapTimeInput('')
  }

  const addLapTime = () => {
    if (lapTimeInput && !isNaN(Number(lapTimeInput))) {
      const lapTime = Number(lapTimeInput)
      const currentLapTimes = sessionData.telemetry?.lapTimes || []
      const newLapTimes = [...currentLapTimes, lapTime]
      
      setSessionData(prev => ({
        ...prev,
        telemetry: {
          ...prev.telemetry,
          lapTimes: newLapTimes
        } as any,
        bestLapTime: Math.min(...newLapTimes),
        averageLapTime: newLapTimes.reduce((a, b) => a + b, 0) / newLapTimes.length
      }))
      
      setLapTimeInput('')
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00.000'
    const minutes = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(3)
    return `${minutes}:${secs.padStart(6, '0')}`
  }

  if (!carSpecs) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Car Setup Found</h3>
        <p className="text-gray-500">Please configure your car setup first before entering session data.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-racing-black">Session Data Entry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Session Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Session Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={sessionData.date}
                onChange={(e) => setSessionData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Track Name</label>
              <input
                type="text"
                value={sessionData.trackName || ''}
                onChange={(e) => setSessionData(prev => ({ ...prev, trackName: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Track Condition</label>
              <select
                value={sessionData.trackCondition}
                onChange={(e) => setSessionData(prev => ({ ...prev, trackCondition: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="dry">Dry</option>
                <option value="wet">Wet</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Temperature (°F)</label>
              <input
                type="number"
                value={sessionData.temperature}
                onChange={(e) => setSessionData(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Performance Data */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Performance Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Top Speed (mph)</label>
              <input
                type="number"
                value={sessionData.topSpeed}
                onChange={(e) => setSessionData(prev => ({ ...prev, topSpeed: Number(e.target.value) }))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Best Lap Time</label>
              <div className="text-lg font-mono text-racing-blue">
                {formatTime(sessionData.bestLapTime || 0)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Average Lap Time</label>
              <div className="text-lg font-mono text-racing-blue">
                {formatTime(sessionData.averageLapTime || 0)}
              </div>
            </div>
          </div>
          
          {/* Lap Times Entry */}
          <div>
            <label className="block text-sm font-medium mb-2">Add Lap Times (seconds)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                step="0.001"
                value={lapTimeInput}
                onChange={(e) => setLapTimeInput(e.target.value)}
                placeholder="e.g., 87.456"
                className="flex-1 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={addLapTime}
                className="px-4 py-2 bg-racing-blue text-white rounded-md hover:bg-blue-700"
              >
                Add Lap
              </button>
            </div>
            
            {sessionData.telemetry?.lapTimes && sessionData.telemetry.lapTimes.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">
                  Lap Times ({sessionData.telemetry.lapTimes.length} laps):
                </p>
                <div className="flex flex-wrap gap-2">
                  {sessionData.telemetry.lapTimes.map((time, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">
                      {formatTime(time)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Driver Feedback</label>
              <textarea
                value={sessionData.driverFeedback}
                onChange={(e) => setSessionData(prev => ({ ...prev, driverFeedback: e.target.value }))}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="How did the car feel? Any handling issues, vibrations, etc..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mechanic Notes</label>
              <textarea
                value={sessionData.mechanicNotes}
                onChange={(e) => setSessionData(prev => ({ ...prev, mechanicNotes: e.target.value }))}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Technical observations, setup changes, maintenance needed..."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-racing-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Save Session Data
        </button>
      </form>
    </div>
  )
}