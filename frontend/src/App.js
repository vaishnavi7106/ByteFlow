import React, { useState } from 'react';
import { uploadDataset } from './services/api'; 

// Components
import FileUpload from './components/FileUpload';
import LoadingState from './components/LoadingState';
import QualityGauge from './components/QualityGauge';
import DimensionBars from './components/DimensionBars';
import InsightCard from './components/InsightCard';
import Recommendations from './components/Recommendations';
import ChatAssistant from './components/ChatAssistant'; 

import './styles/Dashboard.css';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState('analytics');

  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleAnalyze = async (selectedProfile) => {
    const profileToUse = (typeof selectedProfile === 'string' ? selectedProfile : currentProfile);

    if (!file) {
      setCurrentProfile(profileToUse);
      return;
    }

    setLoading(true);
    setCurrentProfile(profileToUse); 

    try {
      const result = await uploadDataset(file, profileToUse);
      
      const mappedData = {
        dqs: result.dqs,
        dimensions: result.dimensions, 
        insights: result.insights,
        recommendations: result.recommendations
      };

      setData(mappedData);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Backend connection failed.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="nav-brand">
          <h2>DataQuality<span className="ai-text">AI</span></h2>
        </div>
        
        {/* Profile Selector */}
        <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.9rem', color: '#8b9bb4' }}>Governance Profile:</span>
            <select 
            value={currentProfile} 
            onChange={(e) => handleAnalyze(e.target.value)} 
            disabled={loading || !file} 
            style={{
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer'
            }}
            >
            <option value="analytics">General Analytics (Balanced)</option>
            <option value="kyc">KYC & Identity (Completeness Focus)</option>
            <option value="fraud">Fraud Detection (Uniqueness Focus)</option>
            <option value="merchant">Merchant Onboarding (Validity Focus)</option>
            </select>
        </div>

        <div className="nav-status">
          <div className="status-item">
            <span className="status-dot"></span>
            Status: <strong>{loading ? 'ANALYZING...' : 'ACTIVE'}</strong>
          </div>
        </div>
      </header>

      <main className="main-content">
        {!data && !loading && (
          <FileUpload onFileChange={handleFileChange} onAnalyze={handleAnalyze} />
        )}

        {loading && <LoadingState />}

        {data && (
          <div className="dashboard-grid">
            <div className="metrics-col">
              <div className="card">
                <QualityGauge score={data.dqs} />
              </div>
              <DimensionBars dimensions={data.dimensions} />
            </div>

            <div className="insights-col">
              <InsightCard insights={data.insights} />
              <Recommendations items={data.recommendations} /> 
              
              {/* Reset Button (Only button left now) */}
              <button 
                className="secondary-btn" 
                onClick={() => { setData(null); setFile(null); }}
                style={{ marginTop: '1rem', width: '100%' }}
              >
                Analyze Another Dataset
              </button>
            </div>
          </div>
        )}
      </main>
      
      <ChatAssistant />
    </div>
  );
}

export default App;