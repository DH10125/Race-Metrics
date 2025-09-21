'use client'

import { useState } from 'react'
import { CarSpecs } from '@/types'

interface CarSetupFormProps {
  carSpecs: CarSpecs | null
  onSave: (specs: CarSpecs) => void
}

export default function CarSetupForm({ carSpecs, onSave }: CarSetupFormProps) {
  const [formData, setFormData] = useState<CarSpecs>(carSpecs || {
    id: crypto.randomUUID(),
    carNumber: '',
    driver: '',
    engine: {
      displacement: 350,
      compressionRatio: 9.5,
      fuelSystem: 'carburetor',
      ignitionTiming: 12,
      fuelMixture: 14.7,
    },
    suspension: {
      frontSpringRate: 350,
      rearSpringRate: 225,
      frontShockSetting: 3,
      rearShockSetting: 3,
      frontCamber: -1.5,
      rearCamber: -1.0,
      toe: 0.125,
      caster: 6.0,
    },
    wheels: {
      frontTireSize: '225/50R15',
      rearTireSize: '245/45R15',
      frontTirePressure: 32,
      rearTirePressure: 30,
      wheelOffset: 35,
    },
    weight: {
      totalWeight: 2800,
      frontWeight: 1400,
      rearWeight: 1400,
      leftWeight: 1400,
      rightWeight: 1400,
      crossWeight: 50,
    },
    electronics: {
      rpmLimiter: 6500,
      shiftLight: 6000,
      dataLogger: true,
      transponder: '',
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    alert('Car setup saved successfully!')
  }

  const updateNestedField = (section: keyof CarSpecs, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-racing-black">Car Setup Configuration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Car Number</label>
              <input
                type="text"
                value={formData.carNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, carNumber: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Driver</label>
              <input
                type="text"
                value={formData.driver}
                onChange={(e) => setFormData(prev => ({ ...prev, driver: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        {/* Engine */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Engine Specifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Displacement (cu in)</label>
              <input
                type="number"
                value={formData.engine.displacement}
                onChange={(e) => updateNestedField('engine', 'displacement', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Compression Ratio</label>
              <input
                type="number"
                step="0.1"
                value={formData.engine.compressionRatio}
                onChange={(e) => updateNestedField('engine', 'compressionRatio', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fuel System</label>
              <select
                value={formData.engine.fuelSystem}
                onChange={(e) => updateNestedField('engine', 'fuelSystem', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="carburetor">Carburetor</option>
                <option value="injection">Fuel Injection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ignition Timing (°BTDC)</label>
              <input
                type="number"
                value={formData.engine.ignitionTiming}
                onChange={(e) => updateNestedField('engine', 'ignitionTiming', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Air-Fuel Ratio</label>
              <input
                type="number"
                step="0.1"
                value={formData.engine.fuelMixture}
                onChange={(e) => updateNestedField('engine', 'fuelMixture', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Suspension */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Suspension & Handling</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Front Spring Rate (lb/in)</label>
              <input
                type="number"
                value={formData.suspension.frontSpringRate}
                onChange={(e) => updateNestedField('suspension', 'frontSpringRate', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rear Spring Rate (lb/in)</label>
              <input
                type="number"
                value={formData.suspension.rearSpringRate}
                onChange={(e) => updateNestedField('suspension', 'rearSpringRate', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Front Camber (°)</label>
              <input
                type="number"
                step="0.1"
                value={formData.suspension.frontCamber}
                onChange={(e) => updateNestedField('suspension', 'frontCamber', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rear Camber (°)</label>
              <input
                type="number"
                step="0.1"
                value={formData.suspension.rearCamber}
                onChange={(e) => updateNestedField('suspension', 'rearCamber', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Wheels & Tires */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Wheels & Tires</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Front Tire Size</label>
              <input
                type="text"
                value={formData.wheels.frontTireSize}
                onChange={(e) => updateNestedField('wheels', 'frontTireSize', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rear Tire Size</label>
              <input
                type="text"
                value={formData.wheels.rearTireSize}
                onChange={(e) => updateNestedField('wheels', 'rearTireSize', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Front Pressure (PSI)</label>
              <input
                type="number"
                value={formData.wheels.frontTirePressure}
                onChange={(e) => updateNestedField('wheels', 'frontTirePressure', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rear Pressure (PSI)</label>
              <input
                type="number"
                value={formData.wheels.rearTirePressure}
                onChange={(e) => updateNestedField('wheels', 'rearTirePressure', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-racing-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Save Car Setup
        </button>
      </form>
    </div>
  )
}