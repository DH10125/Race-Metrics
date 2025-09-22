import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { CarSettingsManager } from '../utils/dataManager';

export default function CarSettings() {
  const router = useRouter();
  const [currentSettings, setCurrentSettings] = useState({
    // Basic Car Info
    name: '',
    year: '',
    make: 'GM',
    model: '',
    engineType: '3.8L V6',
    
    // Engine Settings
    sparkAdvanceBase: '',
    fuelMapBase: '',
    revLimiter: '',
    stoichRatioTarget: '14.7',
    
    // Suspension & Chassis
    camberFL: '', camberFR: '', camberRL: '', camberRR: '',
    casterFL: '', casterFR: '',
    toeFL: '', toeFR: '', toeRL: '', toeRR: '',
    reboundFL: '', reboundFR: '', reboundRL: '', reboundRR: '',
    compressionFL: '', compressionFR: '', compressionRL: '', compressionRR: '',
    
    // Spring Rates
    springRateFL: '', springRateFR: '', springRateRL: '', springRateRR: '',
    
    // Anti-roll Bars
    frontAntiRollBar: '',
    rearAntiRollBar: '',
    
    // Transmission
    linePressureBase: '',
    shiftPoint1to2: '', shiftPoint2to3: '', shiftPoint3to4: '',
    gearRatio1: '', gearRatio2: '', gearRatio3: '', gearRatio4: '',
    finalDrive: '',
    
    // Weight & Balance
    totalWeight: '',
    weightDistribution: '60', // Front weight percentage
    cornerBalance: '',
    
    // Tire Settings
    tireCompound: '',
    tirePressureBaseFL: '', tirePressureBaseFR: '',
    tirePressureBaseRL: '', tirePressureBaseRR: '',
    
    // Aerodynamics
    frontSplitter: '',
    rearWing: '',
    undertray: '',
    
    // Notes
    setupNotes: '',
    lastModified: ''
  });

  const [savedSettings, setSavedSettings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadSavedSettings();
  }, []);

  const loadSavedSettings = () => {
    const settings = CarSettingsManager.getAllCarSettings();
    setSavedSettings(settings.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)));
  };

  const handleInputChange = (field, value) => {
    setCurrentSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveCurrentSettings = () => {
    if (!currentSettings.name.trim()) {
      alert('Please enter a name for this setup');
      return;
    }

    const settingsToSave = {
      ...currentSettings,
      lastModified: new Date().toISOString()
    };

    CarSettingsManager.saveCarSettings(settingsToSave);
    loadSavedSettings();
    setIsEditing(false);
    alert('Settings saved successfully!');
  };

  const loadSettings = (settingsId) => {
    const settings = CarSettingsManager.getCarSettings(settingsId);
    if (settings) {
      setCurrentSettings(settings);
      setIsEditing(true);
    }
  };

  const deleteSettings = (settingsId) => {
    if (confirm('Are you sure you want to delete this setup?')) {
      CarSettingsManager.deleteCarSettings(settingsId);
      loadSavedSettings();
    }
  };

  const newSetup = () => {
    setCurrentSettings({
      name: '',
      year: '',
      make: 'GM',
      model: '',
      engineType: '3.8L V6',
      sparkAdvanceBase: '',
      fuelMapBase: '',
      revLimiter: '',
      stoichRatioTarget: '14.7',
      camberFL: '', camberFR: '', camberRL: '', camberRR: '',
      casterFL: '', casterFR: '',
      toeFL: '', toeFR: '', toeRL: '', toeRR: '',
      reboundFL: '', reboundFR: '', reboundRL: '', reboundRR: '',
      compressionFL: '', compressionFR: '', compressionRL: '', compressionRR: '',
      springRateFL: '', springRateFR: '', springRateRL: '', springRateRR: '',
      frontAntiRollBar: '',
      rearAntiRollBar: '',
      linePressureBase: '',
      shiftPoint1to2: '', shiftPoint2to3: '', shiftPoint3to4: '',
      gearRatio1: '', gearRatio2: '', gearRatio3: '', gearRatio4: '',
      finalDrive: '',
      totalWeight: '',
      weightDistribution: '60',
      cornerBalance: '',
      tireCompound: '',
      tirePressureBaseFL: '', tirePressureBaseFR: '',
      tirePressureBaseRL: '', tirePressureBaseRR: '',
      frontSplitter: '',
      rearWing: '',
      undertray: '',
      setupNotes: '',
      lastModified: ''
    });
    setIsEditing(true);
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
    <Layout title="Car Settings - Race Metrics Pro">
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>Car Settings & Setup</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              Manage your GM 3.8L FWD racing car configurations and setups
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {isEditing ? (
              <>
                <button
                  onClick={saveCurrentSettings}
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
                  Save Setup
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={newSetup}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                New Setup
              </button>
            )}
          </div>
        </div>

        {/* Setup Editor */}
        {isEditing && (
          <>
            {/* Basic Information */}
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Basic Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Setup Name *</label>
                  <input
                    type="text"
                    value={currentSettings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g., Qualifying Setup"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Year</label>
                  <input
                    type="number"
                    value={currentSettings.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g., 2010"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Make</label>
                  <select
                    value={currentSettings.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    style={inputStyle}
                  >
                    <option value="GM">General Motors</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Pontiac">Pontiac</option>
                    <option value="Buick">Buick</option>
                    <option value="Oldsmobile">Oldsmobile</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Model</label>
                  <input
                    type="text"
                    value={currentSettings.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g., Grand Prix"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Engine Type</label>
                  <select
                    value={currentSettings.engineType}
                    onChange={(e) => handleInputChange('engineType', e.target.value)}
                    style={inputStyle}
                  >
                    <option value="3.8L V6">3.8L V6 Naturally Aspirated</option>
                    <option value="3.8L V6 SC">3.8L V6 Supercharged</option>
                    <option value="3.8L V6 Turbo">3.8L V6 Turbocharged</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Engine Settings */}
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Engine Settings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Base Spark Advance (degrees)</label>
                  <input
                    type="number"
                    value={currentSettings.sparkAdvanceBase}
                    onChange={(e) => handleInputChange('sparkAdvanceBase', e.target.value)}
                    style={inputStyle}
                    step="0.1"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fuel Map Base</label>
                  <input
                    type="text"
                    value={currentSettings.fuelMapBase}
                    onChange={(e) => handleInputChange('fuelMapBase', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g., Map 1"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Rev Limiter (RPM)</label>
                  <input
                    type="number"
                    value={currentSettings.revLimiter}
                    onChange={(e) => handleInputChange('revLimiter', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Target Stoich Ratio</label>
                  <input
                    type="number"
                    value={currentSettings.stoichRatioTarget}
                    onChange={(e) => handleInputChange('stoichRatioTarget', e.target.value)}
                    style={inputStyle}
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Suspension Settings */}
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Suspension & Chassis</h2>
              
              {/* Camber */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '1rem' }}>Camber (degrees)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Front Left</label>
                    <input
                      type="number"
                      value={currentSettings.camberFL}
                      onChange={(e) => handleInputChange('camberFL', e.target.value)}
                      style={inputStyle}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Front Right</label>
                    <input
                      type="number"
                      value={currentSettings.camberFR}
                      onChange={(e) => handleInputChange('camberFR', e.target.value)}
                      style={inputStyle}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Rear Left</label>
                    <input
                      type="number"
                      value={currentSettings.camberRL}
                      onChange={(e) => handleInputChange('camberRL', e.target.value)}
                      style={inputStyle}
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Rear Right</label>
                    <input
                      type="number"
                      value={currentSettings.camberRR}
                      onChange={(e) => handleInputChange('camberRR', e.target.value)}
                      style={inputStyle}
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Toe */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '1rem' }}>Toe (degrees)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Front Left</label>
                    <input
                      type="number"
                      value={currentSettings.toeFL}
                      onChange={(e) => handleInputChange('toeFL', e.target.value)}
                      style={inputStyle}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Front Right</label>
                    <input
                      type="number"
                      value={currentSettings.toeFR}
                      onChange={(e) => handleInputChange('toeFR', e.target.value)}
                      style={inputStyle}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Rear Left</label>
                    <input
                      type="number"
                      value={currentSettings.toeRL}
                      onChange={(e) => handleInputChange('toeRL', e.target.value)}
                      style={inputStyle}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Rear Right</label>
                    <input
                      type="number"
                      value={currentSettings.toeRR}
                      onChange={(e) => handleInputChange('toeRR', e.target.value)}
                      style={inputStyle}
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Spring Rates */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '1rem' }}>Spring Rates (lb/in)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Front Left</label>
                    <input
                      type="number"
                      value={currentSettings.springRateFL}
                      onChange={(e) => handleInputChange('springRateFL', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Front Right</label>
                    <input
                      type="number"
                      value={currentSettings.springRateFR}
                      onChange={(e) => handleInputChange('springRateFR', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Rear Left</label>
                    <input
                      type="number"
                      value={currentSettings.springRateRL}
                      onChange={(e) => handleInputChange('springRateRL', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Rear Right</label>
                    <input
                      type="number"
                      value={currentSettings.springRateRR}
                      onChange={(e) => handleInputChange('springRateRR', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transmission */}
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Transmission Settings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Line Pressure (PSI)</label>
                  <input
                    type="number"
                    value={currentSettings.linePressureBase}
                    onChange={(e) => handleInputChange('linePressureBase', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>1-2 Shift Point (RPM)</label>
                  <input
                    type="number"
                    value={currentSettings.shiftPoint1to2}
                    onChange={(e) => handleInputChange('shiftPoint1to2', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>2-3 Shift Point (RPM)</label>
                  <input
                    type="number"
                    value={currentSettings.shiftPoint2to3}
                    onChange={(e) => handleInputChange('shiftPoint2to3', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>3-4 Shift Point (RPM)</label>
                  <input
                    type="number"
                    value={currentSettings.shiftPoint3to4}
                    onChange={(e) => handleInputChange('shiftPoint3to4', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Final Drive Ratio</label>
                  <input
                    type="number"
                    value={currentSettings.finalDrive}
                    onChange={(e) => handleInputChange('finalDrive', e.target.value)}
                    style={inputStyle}
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Weight & Balance */}
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Weight & Balance</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Total Weight (lbs)</label>
                  <input
                    type="number"
                    value={currentSettings.totalWeight}
                    onChange={(e) => handleInputChange('totalWeight', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Front Weight Distribution (%)</label>
                  <input
                    type="number"
                    value={currentSettings.weightDistribution}
                    onChange={(e) => handleInputChange('weightDistribution', e.target.value)}
                    style={inputStyle}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Corner Balance</label>
                  <input
                    type="text"
                    value={currentSettings.cornerBalance}
                    onChange={(e) => handleInputChange('cornerBalance', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g., 25.5/24.5/26/24"
                  />
                </div>
              </div>
            </div>

            {/* Setup Notes */}
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Setup Notes</h2>
              <textarea
                value={currentSettings.setupNotes}
                onChange={(e) => handleInputChange('setupNotes', e.target.value)}
                style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
                placeholder="Add any notes about this setup, track-specific adjustments, weather conditions, etc..."
              />
            </div>
          </>
        )}

        {/* Saved Settings List */}
        {!isEditing && (
          <div style={sectionStyle}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Saved Car Setups</h2>
            {savedSettings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  No car setups saved yet
                </p>
                <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                  Create your first car setup to store and manage your racing configurations
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {savedSettings.map(settings => (
                  <div
                    key={settings.id}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '2rem',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '1.2rem' }}>
                        {settings.name}
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Car:</strong> {settings.year} {settings.make} {settings.model}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Engine:</strong> {settings.engineType}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Weight:</strong> {settings.totalWeight ? `${settings.totalWeight} lbs` : 'Not specified'}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Modified:</strong> {new Date(settings.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {settings.setupNotes && (
                        <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '0.9rem', fontStyle: 'italic' }}>
                          {settings.setupNotes.substring(0, 100)}{settings.setupNotes.length > 100 ? '...' : ''}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <button
                        onClick={() => loadSettings(settings.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#2563eb',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Edit Setup
                      </button>
                      <button
                        onClick={() => {
                          const dataStr = JSON.stringify(settings, null, 2);
                          const dataBlob = new Blob([dataStr], {type: 'application/json'});
                          const url = URL.createObjectURL(dataBlob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `${settings.name}-setup.json`;
                          link.click();
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Export
                      </button>
                      <button
                        onClick={() => deleteSettings(settings.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}