import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { SessionManager, PerformanceDataManager, DataAnalyzer } from '../utils/dataManager';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';

export default function Analysis() {
  const router = useRouter();
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [comparisonSessions, setComparisonSessions] = useState([]);
  const [viewMode, setViewMode] = useState('single'); // 'single', 'comparison'

  useEffect(() => {
    loadSessions();
    if (router.query.session) {
      loadSessionAnalysis(router.query.session);
    }
  }, [router.query.session]);

  const loadSessions = () => {
    const allSessions = SessionManager.getAllSessions();
    setSessions(allSessions);
  };

  const loadSessionAnalysis = (sessionId) => {
    const session = SessionManager.getSession(sessionId);
    if (session) {
      setSelectedSession(session);
      const data = PerformanceDataManager.getPerformanceData(sessionId);
      setPerformanceData(data);
      
      // Generate comprehensive analysis
      const sessionAnalysis = generateDetailedAnalysis(session, data);
      setAnalysis(sessionAnalysis);
    }
  };

  const generateDetailedAnalysis = (session, data) => {
    const lapTimes = DataAnalyzer.analyzeLapTimes(data);
    const tirePressures = DataAnalyzer.analyzeTirePressures(data);
    const recommendations = DataAnalyzer.generateRecommendations(session, data);

    // Additional analysis
    const engineAnalysis = analyzeEngineMetrics(data);
    const temperatureAnalysis = analyzeTemperatures(data);
    const fuelAnalysis = analyzeFuelConsumption(data);
    const consistencyAnalysis = analyzeConsistency(data);

    return {
      lapTimes,
      tirePressures,
      recommendations,
      engine: engineAnalysis,
      temperatures: temperatureAnalysis,
      fuel: fuelAnalysis,
      consistency: consistencyAnalysis
    };
  };

  const analyzeEngineMetrics = (data) => {
    const engineData = data.filter(d => d.engineMetrics);
    
    if (engineData.length === 0) return null;

    const rpms = engineData.map(d => d.engineMetrics.rpm).filter(rpm => rpm);
    const sparkAdvances = engineData.map(d => d.engineMetrics.sparkAdvance).filter(sa => sa);
    const fuelMs = engineData.map(d => d.engineMetrics.fuelMilliseconds).filter(fm => fm);

    return {
      avgRpm: rpms.length > 0 ? rpms.reduce((sum, rpm) => sum + rpm, 0) / rpms.length : null,
      maxRpm: rpms.length > 0 ? Math.max(...rpms) : null,
      avgSparkAdvance: sparkAdvances.length > 0 ? sparkAdvances.reduce((sum, sa) => sum + sa, 0) / sparkAdvances.length : null,
      avgFuelMs: fuelMs.length > 0 ? fuelMs.reduce((sum, fm) => sum + fm, 0) / fuelMs.length : null,
      dataPoints: engineData.length
    };
  };

  const analyzeTemperatures = (data) => {
    const tempData = data.filter(d => 
      (d.engineMetrics?.temperature) || 
      (d.tireTemperatures && Object.values(d.tireTemperatures).some(t => t)) ||
      (d.environmental?.ambientTemp || d.environmental?.trackTemp)
    );

    if (tempData.length === 0) return null;

    const engineTemps = tempData.map(d => d.engineMetrics?.temperature).filter(t => t);
    const ambientTemps = tempData.map(d => d.environmental?.ambientTemp).filter(t => t);
    const trackTemps = tempData.map(d => d.environmental?.trackTemp).filter(t => t);

    return {
      avgEngineTemp: engineTemps.length > 0 ? engineTemps.reduce((sum, t) => sum + t, 0) / engineTemps.length : null,
      maxEngineTemp: engineTemps.length > 0 ? Math.max(...engineTemps) : null,
      avgAmbientTemp: ambientTemps.length > 0 ? ambientTemps.reduce((sum, t) => sum + t, 0) / ambientTemps.length : null,
      avgTrackTemp: trackTemps.length > 0 ? trackTemps.reduce((sum, t) => sum + t, 0) / trackTemps.length : null
    };
  };

  const analyzeFuelConsumption = (data) => {
    const fuelData = data.filter(d => d.fuelConsumption);
    
    if (fuelData.length === 0) return null;

    const consumption = fuelData.map(d => parseFloat(d.fuelConsumption));
    const totalConsumption = consumption.reduce((sum, f) => sum + f, 0);
    const avgConsumption = totalConsumption / consumption.length;

    return {
      total: totalConsumption,
      average: avgConsumption,
      dataPoints: consumption.length
    };
  };

  const analyzeConsistency = (data) => {
    const lapData = data.filter(d => d.lapTime).map(d => parseFloat(d.lapTime));
    
    if (lapData.length < 3) return null;

    const avg = lapData.reduce((sum, t) => sum + t, 0) / lapData.length;
    const variance = lapData.reduce((sum, t) => sum + Math.pow(t - avg, 2), 0) / lapData.length;
    const stdDev = Math.sqrt(variance);
    const consistencyScore = ((avg - stdDev) / avg) * 100;

    return {
      average: avg,
      standardDeviation: stdDev,
      consistencyScore: Math.max(0, consistencyScore),
      lapCount: lapData.length
    };
  };

  const prepareEngineChartData = () => {
    return performanceData
      .filter(d => d.engineMetrics?.rpm)
      .map((d, index) => ({
        dataPoint: index + 1,
        rpm: d.engineMetrics.rpm,
        temperature: d.engineMetrics.temperature || 0,
        sparkAdvance: d.engineMetrics.sparkAdvance || 0
      }));
  };

  const prepareTireAnalysisData = () => {
    return performanceData
      .filter(d => d.tirePressures)
      .map((d, index) => ({
        dataPoint: index + 1,
        ...d.tirePressures
      }));
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);
    return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
  };

  if (!selectedSession) {
    return (
      <Layout title="Performance Analysis - Race Metrics Pro">
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>Performance Analysis</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              Select a session to analyze performance data and trends
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Select Session to Analyze</h2>
            {sessions.length === 0 ? (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                No sessions available. Create a session first to see analysis.
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {sessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => loadSessionAnalysis(session.id)}
                    style={{
                      padding: '1rem',
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  >
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>{session.name}</h3>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                      {session.trackName} - {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  const engineChartData = prepareEngineChartData();
  const tireAnalysisData = prepareTireAnalysisData();

  return (
    <Layout title={`Analysis: ${selectedSession.name} - Race Metrics Pro`}>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>Performance Analysis</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              {selectedSession.name} - {selectedSession.trackName}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setSelectedSession(null)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Select Different Session
            </button>
            <button
              onClick={() => router.push(`/sessions?id=${selectedSession.id}`)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              View Session Details
            </button>
          </div>
        </div>

        {/* Analysis Summary Cards */}
        {analysis && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {/* Lap Time Summary */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151', fontSize: '1rem' }}>Lap Performance</h3>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                  Best Lap: <strong style={{ color: '#059669' }}>{formatTime(analysis.lapTimes?.best)}</strong>
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                  Average: <strong>{formatTime(analysis.lapTimes?.average)}</strong>
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                  Total Laps: <strong>{analysis.lapTimes?.count || 0}</strong>
                </p>
              </div>
            </div>

            {/* Consistency Score */}
            {analysis.consistency && (
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#374151', fontSize: '1rem' }}>Consistency Score</h3>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: analysis.consistency.consistencyScore > 80 ? '#059669' : 
                           analysis.consistency.consistencyScore > 60 ? '#d97706' : '#dc2626'
                  }}>
                    {analysis.consistency.consistencyScore.toFixed(1)}%
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>
                    σ = {analysis.consistency.standardDeviation.toFixed(3)}s
                  </p>
                </div>
              </div>
            )}

            {/* Engine Performance */}
            {analysis.engine && (
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#374151', fontSize: '1rem' }}>Engine Metrics</h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                    Avg RPM: <strong>{analysis.engine.avgRpm?.toFixed(0) || 'N/A'}</strong>
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                    Max RPM: <strong>{analysis.engine.maxRpm || 'N/A'}</strong>
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                    Avg Spark: <strong>{analysis.engine.avgSparkAdvance?.toFixed(1) || 'N/A'}°</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Temperature Analysis */}
            {analysis.temperatures && (
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#374151', fontSize: '1rem' }}>Temperature Analysis</h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                    Engine: <strong>{analysis.temperatures.avgEngineTemp?.toFixed(0) || 'N/A'}°F</strong>
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                    Ambient: <strong>{analysis.temperatures.avgAmbientTemp?.toFixed(0) || 'N/A'}°F</strong>
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                    Track: <strong>{analysis.temperatures.avgTrackTemp?.toFixed(0) || 'N/A'}°F</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Engine RPM vs Temperature */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Engine RPM vs Temperature</h3>
            {engineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={engineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rpm" name="RPM" />
                  <YAxis dataKey="temperature" name="Temperature" />
                  <Tooltip formatter={(value, name) => [value, name === 'temperature' ? 'Temperature (°F)' : 'RPM']} />
                  <Scatter dataKey="temperature" fill="#dc2626" />
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No engine data available</p>
            )}
          </div>

          {/* Tire Pressure Comparison */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Tire Pressure Analysis</h3>
            {tireAnalysisData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tireAnalysisData.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dataPoint" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="frontLeft" fill="#dc2626" name="Front Left" />
                  <Bar dataKey="frontRight" fill="#2563eb" name="Front Right" />
                  <Bar dataKey="rearLeft" fill="#059669" name="Rear Left" />
                  <Bar dataKey="rearRight" fill="#d97706" name="Rear Right" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No tire pressure data available</p>
            )}
          </div>
        </div>

        {/* Advanced Recommendations */}
        {analysis?.recommendations && analysis.recommendations.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Performance Recommendations</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {analysis.recommendations.map((rec, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: rec.priority === 'high' ? '#fef2f2' : '#f0f9ff',
                    border: `1px solid ${rec.priority === 'high' ? '#fecaca' : '#bae6fd'}`,
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ 
                      margin: 0, 
                      color: rec.priority === 'high' ? '#dc2626' : '#0369a1',
                      fontSize: '1.1rem'
                    }}>
                      {rec.category}
                    </h4>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: rec.priority === 'high' ? '#dc2626' : '#0369a1',
                      color: 'white',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      fontWeight: 'bold'
                    }}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#374151', lineHeight: '1.6' }}>{rec.message}</p>
                  {rec.data && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.75rem', 
                      backgroundColor: 'rgba(255,255,255,0.7)', 
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <strong>Supporting Data:</strong> {JSON.stringify(rec.data, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Options */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Export & Share</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {
                const dataStr = JSON.stringify({
                  session: selectedSession,
                  analysis: analysis,
                  performanceData: performanceData
                }, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${selectedSession.name}-analysis.json`;
                link.click();
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Export Analysis Data
            </button>
            <button
              onClick={() => {
                const text = `Performance Analysis: ${selectedSession.name}\n\n` +
                  `Best Lap: ${formatTime(analysis?.lapTimes?.best)}\n` +
                  `Average Lap: ${formatTime(analysis?.lapTimes?.average)}\n` +
                  `Total Laps: ${analysis?.lapTimes?.count || 0}\n` +
                  `Consistency Score: ${analysis?.consistency?.consistencyScore?.toFixed(1) || 'N/A'}%\n\n` +
                  `Generated by Race Metrics Pro`;
                
                navigator.clipboard.writeText(text).then(() => {
                  alert('Analysis summary copied to clipboard!');
                });
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Copy Summary
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}