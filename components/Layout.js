import { useState } from 'react';
import Head from 'next/head';

const Layout = ({ children, title = "Race Metrics - Performance Logging System" }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/' },
    { id: 'logging', label: 'Data Logging', href: '/logging' },
    { id: 'analysis', label: 'Performance Analysis', href: '/analysis' },
    { id: 'sessions', label: 'Race Sessions', href: '/sessions' },
    { id: 'settings', label: 'Car Settings', href: '/settings' }
  ];

  const handleNavigation = (href, id) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Car Performance Logging and Optimization System for HSRA FWD Racing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
            Race Metrics Pro
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#cbd5e1', fontSize: '0.9rem' }}>
            GM 3.8L FWD Performance Logging & Optimization System
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: '#2563eb',
        borderBottom: '1px solid #1e40af'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href, item.id)}
                style={{
                  padding: '1rem 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: activeTab === item.id ? '#fbbf24' : '#e2e8f0',
                  fontWeight: activeTab === item.id ? 'bold' : 'normal',
                  cursor: 'pointer',
                  borderBottom: activeTab === item.id ? '3px solid #fbbf24' : '3px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        minHeight: 'calc(100vh - 200px)'
      }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#374151',
        color: '#9ca3af',
        padding: '1rem 0',
        textAlign: 'center',
        borderTop: '1px solid #4b5563'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            © 2024 Race Metrics Pro - HSRA FWD Racing Performance System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;