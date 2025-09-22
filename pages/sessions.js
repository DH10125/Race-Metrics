import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { SessionManager, PerformanceDataManager, DataAnalyzer } from '../utils/dataManager';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

export default function Sessions() {
  const router = useRouter();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'detail', 'compare'

  useEffect(() => {
    loadSessions();
    
    // Check if a specific session ID is in the URL
    if (router.query.id) {
      loadSessionDetail(router.query.id);
    }
  }, [router.query.id]);

  const loadSessions = () => {
    const allSessions = SessionManager.getAllSessions();
    setSessions(allSessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const loadSessionDetail = (sessionId) => {
    const session = SessionManager.getSession(sessionId);
    if (session) {
      setSelectedSession(session);
      const data = PerformanceDataManager.getPerformanceData(sessionId);
      setPerformanceData(data);
      
      // Generate analysis
      const sessionAnalysis = {
        lapTimes: DataAnalyzer.analyzeLapTimes(data),
        tirePressures: DataAnalyzer.analyzeTirePressures(data),
        recommendations: DataAnalyzer.generateRecommendations(session, data)
      };
      setAnalysis(sessionAnalysis);
      setViewMode('detail');
    }
  };

  const deleteSession = (sessionId) => {
    if (confirm('Are you sure you want to delete this session? This cannot be undone.')) {
      SessionManager.deleteSession(sessionId);
      PerformanceDataManager.deletePerformanceData(sessionId);
      loadSessions();
      if (selectedSession?.id === sessionId) {
        setSelectedSession(null);
        setViewMode('list');
      }
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);
    return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const prepareChartData = () => {
    return performanceData
      .filter(data => data.lapTime)
      .map((data, index) => ({
        lap: index + 1,
        time: parseFloat(data.lapTime),
        timestamp: new Date(data.timestamp).getTime()
      }));
  };

  const prepareTirePressureData = () => {
    return performanceData
      .filter(data => data.tirePressures)
      .map((data, index) => ({
        dataPoint: index + 1,
        frontLeft: data.tirePressures.frontLeft,
        frontRight: data.tirePressures.frontRight,
        rearLeft: data.tirePressures.rearLeft,
        rearRight: data.tirePressures.rearRight
      }));
  };

  if (viewMode === 'detail' && selectedSession) {
    const chartData = prepareChartData();
    const tirePressureData = prepareTirePressureData();

    return (
      <Layout title={`Session: ${selectedSession.name} - Race Metrics Pro`}>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
              >
                ← Back to Sessions
              </button>
              <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>{selectedSession.name}</h1>
              <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
                {selectedSession.trackName} - {formatDate(selectedSession.createdAt)}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => router.push(`/analysis?session=${selectedSession.id}`)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Detailed Analysis
              </button>
              <button
                onClick={() => deleteSession(selectedSession.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete Session
              </button>
            </div>
          </div>

          {/* Session Stats */}
          {analysis && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem' }}>Total Laps</h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {analysis.lapTimes?.count || 0}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem' }}>Best Lap</h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
                  {formatTime(analysis.lapTimes?.best)}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem' }}>Average Lap</h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {formatTime(analysis.lapTimes?.average)}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem' }}>Data Points</h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {performanceData.length}
                </p>
              </div>
            </div>
          )}

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Lap Times Chart */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Lap Times Progression</h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lap" />
                    <YAxis tickFormatter={formatTime} />
                    <Tooltip formatter={(value) => [formatTime(value), 'Lap Time']} />
                    <Line type="monotone" dataKey="time" stroke="#059669" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No lap time data available</p>
              )}
            </div>

            {/* Tire Pressure Chart */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Tire Pressure Trends</h3>
              {tirePressureData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={tirePressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dataPoint" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="frontLeft" stroke="#dc2626" name="Front Left" />
                    <Line type="monotone" dataKey="frontRight" stroke="#2563eb" name="Front Right" />
                    <Line type="monotone" dataKey="rearLeft" stroke="#059669" name="Rear Left" />
                    <Line type="monotone" dataKey="rearRight" stroke="#d97706" name="Rear Right" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No tire pressure data available</p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          {analysis?.recommendations && analysis.recommendations.length > 0 && (
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Session Recommendations</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {analysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '1rem',
                      backgroundColor: rec.priority === 'high' ? '#fef2f2' : '#f0f9ff',
                      border: `1px solid ${rec.priority === 'high' ? '#fecaca' : '#bae6fd'}`,
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ 
                          margin: '0 0 0.5rem 0', 
                          color: rec.priority === 'high' ? '#dc2626' : '#0369a1',
                          fontSize: '1rem'
                        }}>
                          {rec.category}
                        </h4>
                        <p style={{ margin: 0, color: '#374151' }}>{rec.message}</p>
                      </div>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: rec.priority === 'high' ? '#dc2626' : '#0369a1',
                        color: 'white',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Data Table */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Performance Data</h3>
            {performanceData.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Timestamp</th>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Lap Time</th>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>RPM</th>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Engine Temp</th>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Tire Pressure FL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.slice(0, 10).map((data, index) => (
                      <tr key={index}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                          {new Date(data.timestamp).toLocaleTimeString()}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                          {data.lapTime ? formatTime(data.lapTime) : '-'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                          {data.engineMetrics?.rpm || '-'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                          {data.engineMetrics?.temperature ? `${data.engineMetrics.temperature}°F` : '-'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                          {data.tirePressures?.frontLeft ? `${data.tirePressures.frontLeft} PSI` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {performanceData.length > 10 && (
                  <p style={{ marginTop: '1rem', color: '#6b7280', fontStyle: 'italic' }}>
                    Showing first 10 of {performanceData.length} data points
                  </p>
                )}
              </div>
            ) : (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No performance data recorded for this session</p>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Race Sessions - Race Metrics Pro">
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>Race Sessions</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              View and analyze your racing session history
            </p>
          </div>
          <button
            onClick={() => router.push('/logging')}
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
            Start New Session
          </button>
        </div>

        {/* Sessions List */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>All Sessions</h2>
          {sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '1rem' }}>
                No racing sessions yet
              </p>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                Start your first session to begin tracking performance data
              </p>
              <button
                onClick={() => router.push('/logging')}
                style={{
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
                Create First Session
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {sessions.map(session => {
                const data = PerformanceDataManager.getPerformanceData(session.id);
                const lapCount = data.filter(d => d.lapTime).length;
                const bestLap = data
                  .filter(d => d.lapTime)
                  .map(d => parseFloat(d.lapTime))
                  .filter(t => !isNaN(t));
                const bestLapTime = bestLap.length > 0 ? Math.min(...bestLap) : null;

                return (
                  <div
                    key={session.id}
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
                        {session.name}
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Track:</strong> {session.trackName || 'Unknown'}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Date:</strong> {formatDate(session.createdAt)}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Laps:</strong> {lapCount}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                          <strong>Best Lap:</strong> {formatTime(bestLapTime)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: session.status === 'active' ? '#fbbf24' : '#10b981',
                          color: 'white',
                          fontSize: '0.75rem',
                          borderRadius: '4px',
                          fontWeight: 'bold'
                        }}>
                          {session.status?.toUpperCase() || 'COMPLETED'}
                        </span>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          fontSize: '0.75rem',
                          borderRadius: '4px'
                        }}>
                          {data.length} data points
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <button
                        onClick={() => loadSessionDetail(session.id)}
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
                        View Details
                      </button>
                      <button
                        onClick={() => router.push(`/analysis?session=${session.id}`)}
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
                        Analyze
                      </button>
                      <button
                        onClick={() => deleteSession(session.id)}
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}