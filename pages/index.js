import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { SessionManager, PerformanceDataManager, DataAnalyzer } from '../utils/dataManager';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalLaps: 0,
    bestLapTime: null,
    avgLapTime: null
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load sessions
    const allSessions = SessionManager.getAllSessions();
    setSessions(allSessions.slice(-5)); // Show last 5 sessions

    // Calculate overall stats
    let totalLaps = 0;
    let allLapTimes = [];
    let allPerformanceData = [];

    allSessions.forEach(session => {
      const performanceData = PerformanceDataManager.getPerformanceData(session.id);
      allPerformanceData = [...allPerformanceData, ...performanceData];
      
      const lapTimes = performanceData
        .filter(data => data.lapTime)
        .map(data => parseFloat(data.lapTime))
        .filter(time => !isNaN(time));
      
      totalLaps += lapTimes.length;
      allLapTimes = [...allLapTimes, ...lapTimes];
    });

    const bestLap = allLapTimes.length > 0 ? Math.min(...allLapTimes) : null;
    const avgLap = allLapTimes.length > 0 
      ? allLapTimes.reduce((sum, time) => sum + time, 0) / allLapTimes.length 
      : null;

    setStats({
      totalSessions: allSessions.length,
      totalLaps,
      bestLapTime: bestLap,
      avgLapTime: avgLap
    });

    // Get recent performance data for charts
    const recentPerformanceData = allPerformanceData
      .slice(-20)
      .map((data, index) => ({
        index: index + 1,
        lapTime: parseFloat(data.lapTime) || 0,
        engineTemp: parseFloat(data.engineMetrics?.temperature) || 0,
        rpm: parseFloat(data.engineMetrics?.rpm) || 0
      }));

    setRecentData(recentPerformanceData);

    // Generate recommendations
    if (allSessions.length > 0) {
      const latestSession = allSessions[allSessions.length - 1];
      const latestPerformanceData = PerformanceDataManager.getPerformanceData(latestSession.id);
      const recs = DataAnalyzer.generateRecommendations(latestSession, latestPerformanceData);
      setRecommendations(recs);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);
    return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
  };

  const createNewSession = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/logging';
    }
  };

  return (
    <Layout title="Dashboard - Race Metrics Pro">
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937', fontSize: '2rem' }}>Performance Dashboard</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              Real-time insights for your GM 3.8L FWD racing performance
            </p>
          </div>
          <button
            onClick={createNewSession}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Start New Session
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem', fontWeight: '600' }}>
              Total Sessions
            </h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
              {stats.totalSessions}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem', fontWeight: '600' }}>
              Total Laps
            </h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
              {stats.totalLaps}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem', fontWeight: '600' }}>
              Best Lap Time
            </h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
              {formatTime(stats.bestLapTime)}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.9rem', fontWeight: '600' }}>
              Average Lap Time
            </h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
              {formatTime(stats.avgLapTime)}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Lap Times Chart */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Recent Lap Times</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip formatter={(value) => [formatTime(value), 'Lap Time']} />
                <Line type="monotone" dataKey="lapTime" stroke="#059669" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Engine RPM Chart */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Engine RPM Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rpm" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Performance Recommendations</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {recommendations.map((rec, index) => (
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

        {/* Recent Sessions */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Recent Sessions</h3>
          {sessions.length === 0 ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              No sessions yet. Start your first racing session to see data here.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {sessions.map(session => (
                <div
                  key={session.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#374151' }}>
                      {session.name || `Session ${session.id.slice(0, 8)}`}
                    </h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                      {new Date(session.createdAt).toLocaleDateString()} - {session.trackName || 'Unknown Track'}
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.href = `/sessions?id=${session.id}`}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}