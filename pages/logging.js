import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { SessionManager, PerformanceDataManager } from '../utils/dataManager';

export default function DataLogging() {
  const [currentSession, setCurrentSession] = useState(null);
  const [isLogging, setIsLogging] = useState(false);
  const [performanceData, setPerformanceData] = useState({
    // Engine Metrics
    sparkAdvance: '',
    fuelMilliseconds: '',
    revLimit: '',
    stoichRatio: '',
    rpm: '',
    temperature: '',
    
    // Suspension & Chassis
    camberFL: '', camberFR: '', camberRL: '', camberRR: '',
    casterFL: '', casterFR: '',
    toeInFL: '', toeInFR: '', toeInRL: '', toeInRR: '',
    reboundFL: '', reboundFR: '', reboundRL: '', reboundRR: '',
    
    // Tires
    pressureFL: '', pressureFR: '', pressureRL: '', pressureRR: '',
    treadDepthFL: '', treadDepthFR: '', treadDepthRL: '', treadDepthRR: '',
    tempFL: '', tempFR: '', tempRL: '', tempRR: '',
    
    // Transmission
    linePressure: '',
    shiftPoint1to2: '', shiftPoint2to3: '', shiftPoint3to4: '',
    gearRatio1: '', gearRatio2: '', gearRatio3: '', gearRatio4: '',
    
    // Weight Distribution
    weightFL: '', weightFR: '', weightRL: '', weightRR: '',
    
    // Race Data
    lapTime: '',
    fuelConsumption: '',
    
    // Environmental
    trackTemp: '',
    ambientTemp: '',
    humidity: '',
    trackCondition: ''
  });

  const [sessionInfo, setSessionInfo] = useState({
    name: '',
    trackName: '',
    trackCondition: 'dry',
    notes: ''
  });

  useEffect(() => {
    // Check if there's an active session in localStorage
    const activeSessionId = localStorage.getItem('activeSessionId');
    if (activeSessionId) {
      const session = SessionManager.getSession(activeSessionId);
      if (session) {
        setCurrentSession(session);
        setIsLogging(true);
      }
    }
  }, []);

  const startNewSession = () => {
    if (!sessionInfo.name.trim()) {
      alert('Please enter a session name');
      return;
    }

    const session = SessionManager.createSession({
      name: sessionInfo.name,
      trackName: sessionInfo.trackName,
      trackCondition: sessionInfo.trackCondition,
      notes: sessionInfo.notes,
      status: 'active'
    });

    setCurrentSession(session);
    setIsLogging(true);
    localStorage.setItem('activeSessionId', session.id);
  };

  const endSession = () => {
    if (currentSession) {
      SessionManager.updateSession(currentSession.id, {
        status: 'completed',
        endedAt: new Date().toISOString()
      });
    }
    
    setCurrentSession(null);
    setIsLogging(false);
    localStorage.removeItem('activeSessionId');
  };

  const logDataPoint = () => {
    if (!currentSession) return;

    const dataPoint = {
      engineMetrics: {
        sparkAdvance: parseFloat(performanceData.sparkAdvance) || null,
        fuelMilliseconds: parseFloat(performanceData.fuelMilliseconds) || null,
        revLimit: parseFloat(performanceData.revLimit) || null,
        stoichRatio: parseFloat(performanceData.stoichRatio) || null,
        rpm: parseFloat(performanceData.rpm) || null,
        temperature: parseFloat(performanceData.temperature) || null
      },
      suspension: {
        camber: {
          frontLeft: parseFloat(performanceData.camberFL) || null,
          frontRight: parseFloat(performanceData.camberFR) || null,
          rearLeft: parseFloat(performanceData.camberRL) || null,
          rearRight: parseFloat(performanceData.camberRR) || null
        },
        caster: {
          frontLeft: parseFloat(performanceData.casterFL) || null,
          frontRight: parseFloat(performanceData.casterFR) || null
        },
        toeIn: {
          frontLeft: parseFloat(performanceData.toeInFL) || null,
          frontRight: parseFloat(performanceData.toeInFR) || null,
          rearLeft: parseFloat(performanceData.toeInRL) || null,
          rearRight: parseFloat(performanceData.toeInRR) || null
        },
        rebound: {
          frontLeft: parseFloat(performanceData.reboundFL) || null,
          frontRight: parseFloat(performanceData.reboundFR) || null,
          rearLeft: parseFloat(performanceData.reboundRL) || null,
          rearRight: parseFloat(performanceData.reboundRR) || null
        }
      },
      tirePressures: {
        frontLeft: parseFloat(performanceData.pressureFL) || null,
        frontRight: parseFloat(performanceData.pressureFR) || null,
        rearLeft: parseFloat(performanceData.pressureRL) || null,
        rearRight: parseFloat(performanceData.pressureRR) || null
      },
      tireTemperatures: {
        frontLeft: parseFloat(performanceData.tempFL) || null,
        frontRight: parseFloat(performanceData.tempFR) || null,
        rearLeft: parseFloat(performanceData.tempRL) || null,
        rearRight: parseFloat(performanceData.tempRR) || null
      },
      transmission: {
        linePressure: parseFloat(performanceData.linePressure) || null,
        shiftPoints: {
          '1to2': parseFloat(performanceData.shiftPoint1to2) || null,
          '2to3': parseFloat(performanceData.shiftPoint2to3) || null,
          '3to4': parseFloat(performanceData.shiftPoint3to4) || null
        }
      },
      weightDistribution: {
        frontLeft: parseFloat(performanceData.weightFL) || null,
        frontRight: parseFloat(performanceData.weightFR) || null,
        rearLeft: parseFloat(performanceData.weightRL) || null,
        rearRight: parseFloat(performanceData.weightRR) || null
      },
      lapTime: parseFloat(performanceData.lapTime) || null,
      fuelConsumption: parseFloat(performanceData.fuelConsumption) || null,
      environmental: {
        trackTemp: parseFloat(performanceData.trackTemp) || null,
        ambientTemp: parseFloat(performanceData.ambientTemp) || null,
        humidity: parseFloat(performanceData.humidity) || null,
        trackCondition: performanceData.trackCondition || null
      }
    };

    PerformanceDataManager.savePerformanceData(currentSession.id, dataPoint);
    
    // Clear form fields that should be reset between data points
    setPerformanceData(prev => ({
      ...prev,
      lapTime: '',
      fuelConsumption: '',
      rpm: '',
      temperature: ''
    }));

    alert('Data point logged successfully!');
  };

  const handleInputChange = (field, value) => {
    setPerformanceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.9rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.9rem'
  };

  const sectionStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  return (
    <Layout title="Data Logging - Race Metrics Pro">
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>Data Logging</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              {isLogging ? `Logging session: ${currentSession?.name}` : 'Start a new logging session'}
            </p>
          </div>
          
          {isLogging ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={logDataPoint}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Log Data Point
              </button>
              <button
                onClick={endSession}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                End Session
              </button>
            </div>
          ) : null}
        </div>

        {/* Session Setup */}
        {!isLogging && (
          <div style={sectionStyle}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Start New Session</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Session Name *</label>
                <input
                  type="text"
                  value={sessionInfo.name}
                  onChange={(e) => setSessionInfo(prev => ({ ...prev, name: e.target.value }))}
                  style={inputStyle}
                  placeholder="e.g., Practice Session 1"
                />
              </div>
              <div>
                <label style={labelStyle}>Track Name</label>
                <input
                  type="text"
                  value={sessionInfo.trackName}
                  onChange={(e) => setSessionInfo(prev => ({ ...prev, trackName: e.target.value }))}
                  style={inputStyle}
                  placeholder="e.g., Thunderhill Raceway"
                />
              </div>
              <div>
                <label style={labelStyle}>Track Condition</label>
                <select
                  value={sessionInfo.trackCondition}
                  onChange={(e) => setSessionInfo(prev => ({ ...prev, trackCondition: e.target.value }))}
                  style={inputStyle}
                >
                  <option value="dry">Dry</option>
                  <option value="wet">Wet</option>
                  <option value="damp">Damp</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>Session Notes</label>
              <textarea
                value={sessionInfo.notes}
                onChange={(e) => setSessionInfo(prev => ({ ...prev, notes: e.target.value }))}
                style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
                placeholder="Any additional notes about this session..."
              />
            </div>
            <button
              onClick={startNewSession}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 2rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Start Session
            </button>
          </div>
        )}

        {/* Logging Interface */}
        {isLogging && (
          <>
            {/* Engine Metrics */}
            <div style={sectionStyle}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Engine Metrics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Spark Advance (degrees)</label>
                  <input
                    type="number"
                    value={performanceData.sparkAdvance}
                    onChange={(e) => handleInputChange('sparkAdvance', e.target.value)}
                    style={inputStyle}
                    step="0.1"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fuel Milliseconds (ms)</label>
                  <input
                    type="number"
                    value={performanceData.fuelMilliseconds}
                    onChange={(e) => handleInputChange('fuelMilliseconds', e.target.value)}
                    style={inputStyle}
                    step="0.1"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Rev Limit (RPM)</label>
                  <input
                    type="number"
                    value={performanceData.revLimit}
                    onChange={(e) => handleInputChange('revLimit', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Stoichiometric Ratio</label>
                  <input
                    type="number"
                    value={performanceData.stoichRatio}
                    onChange={(e) => handleInputChange('stoichRatio', e.target.value)}
                    style={inputStyle}
                    step="0.1"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Current RPM</label>
                  <input
                    type="number"
                    value={performanceData.rpm}
                    onChange={(e) => handleInputChange('rpm', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Engine Temp (°F)</label>
                  <input
                    type="number"
                    value={performanceData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Tire Data */}
            <div style={sectionStyle}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Tire Data</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>Tire Pressures (PSI)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Front Left</label>
                      <input
                        type="number"
                        value={performanceData.pressureFL}
                        onChange={(e) => handleInputChange('pressureFL', e.target.value)}
                        style={inputStyle}
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Front Right</label>
                      <input
                        type="number"
                        value={performanceData.pressureFR}
                        onChange={(e) => handleInputChange('pressureFR', e.target.value)}
                        style={inputStyle}
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Rear Left</label>
                      <input
                        type="number"
                        value={performanceData.pressureRL}
                        onChange={(e) => handleInputChange('pressureRL', e.target.value)}
                        style={inputStyle}
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Rear Right</label>
                      <input
                        type="number"
                        value={performanceData.pressureRR}
                        onChange={(e) => handleInputChange('pressureRR', e.target.value)}
                        style={inputStyle}
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>Tire Temperatures (°F)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Front Left</label>
                      <input
                        type="number"
                        value={performanceData.tempFL}
                        onChange={(e) => handleInputChange('tempFL', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Front Right</label>
                      <input
                        type="number"
                        value={performanceData.tempFR}
                        onChange={(e) => handleInputChange('tempFR', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Rear Left</label>
                      <input
                        type="number"
                        value={performanceData.tempRL}
                        onChange={(e) => handleInputChange('tempRL', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Rear Right</label>
                      <input
                        type="number"
                        value={performanceData.tempRR}
                        onChange={(e) => handleInputChange('tempRR', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Race Data */}
            <div style={sectionStyle}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Race Data</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Lap Time (seconds)</label>
                  <input
                    type="number"
                    value={performanceData.lapTime}
                    onChange={(e) => handleInputChange('lapTime', e.target.value)}
                    style={inputStyle}
                    step="0.001"
                    placeholder="e.g., 87.542"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fuel Consumption (gallons)</label>
                  <input
                    type="number"
                    value={performanceData.fuelConsumption}
                    onChange={(e) => handleInputChange('fuelConsumption', e.target.value)}
                    style={inputStyle}
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Environmental Data */}
            <div style={sectionStyle}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Environmental Data</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Track Temperature (°F)</label>
                  <input
                    type="number"
                    value={performanceData.trackTemp}
                    onChange={(e) => handleInputChange('trackTemp', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Ambient Temperature (°F)</label>
                  <input
                    type="number"
                    value={performanceData.ambientTemp}
                    onChange={(e) => handleInputChange('ambientTemp', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Humidity (%)</label>
                  <input
                    type="number"
                    value={performanceData.humidity}
                    onChange={(e) => handleInputChange('humidity', e.target.value)}
                    style={inputStyle}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Track Condition</label>
                  <select
                    value={performanceData.trackCondition}
                    onChange={(e) => handleInputChange('trackCondition', e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">Select condition</option>
                    <option value="dry">Dry</option>
                    <option value="wet">Wet</option>
                    <option value="damp">Damp</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}