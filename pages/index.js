import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [carData, setCarData] = useState({
    weight: '',
    wheelbase: '',
    trackWidth: '',
    height: '',
    engineDisplacement: ''
  });

  const [results, setResults] = useState(null);

  const hsraStandards = {
    maxWeight: 2500, // lbs
    minWheelbase: 90, // inches
    maxHeight: 60, // inches
    maxEngineDisplacement: 350 // cubic inches
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCar = () => {
    const weight = parseFloat(carData.weight);
    const wheelbase = parseFloat(carData.wheelbase);
    const height = parseFloat(carData.height);
    const engine = parseFloat(carData.engineDisplacement);

    const validation = {
      weight: {
        value: weight,
        standard: hsraStandards.maxWeight,
        passes: !isNaN(weight) && weight <= hsraStandards.maxWeight,
        message: !isNaN(weight) && weight <= hsraStandards.maxWeight ? 'PASS' : `FAIL - ${isNaN(weight) ? 'Invalid value' : 'Exceeds ' + hsraStandards.maxWeight + ' lbs'}`
      },
      wheelbase: {
        value: wheelbase,
        standard: hsraStandards.minWheelbase,
        passes: !isNaN(wheelbase) && wheelbase >= hsraStandards.minWheelbase,
        message: !isNaN(wheelbase) && wheelbase >= hsraStandards.minWheelbase ? 'PASS' : `FAIL - ${isNaN(wheelbase) ? 'Invalid value' : 'Below ' + hsraStandards.minWheelbase + ' inches'}`
      },
      height: {
        value: height,
        standard: hsraStandards.maxHeight,
        passes: !isNaN(height) && height <= hsraStandards.maxHeight,
        message: !isNaN(height) && height <= hsraStandards.maxHeight ? 'PASS' : `FAIL - ${isNaN(height) ? 'Invalid value' : 'Exceeds ' + hsraStandards.maxHeight + ' inches'}`
      },
      engine: {
        value: engine,
        standard: hsraStandards.maxEngineDisplacement,
        passes: !isNaN(engine) && engine <= hsraStandards.maxEngineDisplacement,
        message: !isNaN(engine) && engine <= hsraStandards.maxEngineDisplacement ? 'PASS' : `FAIL - ${isNaN(engine) ? 'Invalid value' : 'Exceeds ' + hsraStandards.maxEngineDisplacement + ' cubic inches'}`
      }
    };

    setResults(validation);
  };

  const overallPass = results && Object.values(results).every(result => result.passes);

  return (
    <div>
      <Head>
        <title>Race Metrics - HSRA Standards Checker</title>
        <meta name="description" content="A tool to review and modify a racecar that meets HSRA standards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#333', textAlign: 'center' }}>Race Metrics</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          A tool to review and modify a racecar that meets HSRA standards
        </p>

        <div style={{ backgroundColor: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>Car Specifications</h2>
          
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Weight (lbs):
              </label>
              <input
                type="number"
                name="weight"
                value={carData.weight}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="e.g., 2200"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Wheelbase (inches):
              </label>
              <input
                type="number"
                name="wheelbase"
                value={carData.wheelbase}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="e.g., 95"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Track Width (inches):
              </label>
              <input
                type="number"
                name="trackWidth"
                value={carData.trackWidth}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="e.g., 58"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Height (inches):
              </label>
              <input
                type="number"
                name="height"
                value={carData.height}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="e.g., 48"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Engine Displacement (cubic inches):
              </label>
              <input
                type="number"
                name="engineDisplacement"
                value={carData.engineDisplacement}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="e.g., 305"
              />
            </div>
          </div>

          <button
            onClick={validateCar}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Check HSRA Compliance
          </button>
        </div>

        {results && (
          <div style={{ backgroundColor: overallPass ? '#d4edda' : '#f8d7da', padding: '1.5rem', borderRadius: '8px', border: `1px solid ${overallPass ? '#c3e6cb' : '#f5c6cb'}` }}>
            <h2 style={{ marginTop: 0, color: overallPass ? '#155724' : '#721c24' }}>
              Validation Results: {overallPass ? 'PASSES HSRA Standards' : 'FAILS HSRA Standards'}
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
                <span><strong>Weight:</strong> {results.weight.value} lbs (Max: {results.weight.standard} lbs)</span>
                <span style={{ color: results.weight.passes ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                  {results.weight.message}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
                <span><strong>Wheelbase:</strong> {results.wheelbase.value}" (Min: {results.wheelbase.standard}")</span>
                <span style={{ color: results.wheelbase.passes ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                  {results.wheelbase.message}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
                <span><strong>Height:</strong> {results.height.value}" (Max: {results.height.standard}")</span>
                <span style={{ color: results.height.passes ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                  {results.height.message}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
                <span><strong>Engine:</strong> {results.engine.value} cu.in. (Max: {results.engine.standard} cu.in.)</span>
                <span style={{ color: results.engine.passes ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                  {results.engine.message}
                </span>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
          <h3>HSRA Standards Reference</h3>
          <ul style={{ margin: 0 }}>
            <li>Maximum Weight: {hsraStandards.maxWeight} lbs</li>
            <li>Minimum Wheelbase: {hsraStandards.minWheelbase} inches</li>
            <li>Maximum Height: {hsraStandards.maxHeight} inches</li>
            <li>Maximum Engine Displacement: {hsraStandards.maxEngineDisplacement} cubic inches</li>
          </ul>
        </div>
      </main>
    </div>
  );
}