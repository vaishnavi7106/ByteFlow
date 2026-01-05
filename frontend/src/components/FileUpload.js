import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, ShieldCheck, Activity, Server, Briefcase } from 'lucide-react';
import '../styles/Dashboard.css';

const FileUpload = ({ onFileChange, onAnalyze }) => {
  const [activeTab, setActiveTab] = useState('upload'); 
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  
  // New State: Profile Selection
  const [selectedProfile, setSelectedProfile] = useState('analytics');
  
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file) => {
    if (!file.name.endsWith('.csv')) { alert("Please upload a CSV file."); return; }
    setFileName(file.name);
    onFileChange(file); // Pass file up
  };

  return (
    <div className="upload-container-wrapper">
      <div className="governance-badge">
        <ShieldCheck size={16} />
        <span>Secure Ingestion Gateway <span style={{opacity:0.5}}>|</span> v2.4.0</span>
      </div>

      <div className="upload-box" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
        {/* --- 1. PROFILE SELECTOR --- */}
        <div className="profile-selector">
          <label><Briefcase size={14}/> Governance Profile:</label>
          <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
            <option value="analytics">General Analytics (Balanced)</option>
            <option value="kyc">KYC & Identity (Completeness Focus)</option>
            <option value="fraud">Fraud Detection (Uniqueness Focus)</option>
            <option value="merchant">Merchant Onboarding (Validity Focus)</option>
          </select>
        </div>

        {/* --- 2. UPLOAD AREA --- */}
        <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={handleChange} accept=".csv" />
        
        {!fileName ? (
          <>
            <div className={`upload-icon-wrapper ${dragActive ? 'active' : ''}`}>
               <UploadCloud size={48} color={dragActive ? "#00ff88" : "#8b9bb4"} />
            </div>
            <div>
               <h3 style={{margin: '10px 0 0', color: 'white'}}>Drop Transaction Data</h3>
            </div>
            <button className="secondary-btn" onClick={() => inputRef.current.click()}>Browse Local Drive</button>
          </>
        ) : (
          <div className="file-preview">
            <FileText size={40} color="#00f0ff" />
            <div className="file-info">
               <h4>{fileName}</h4>
               <span className="success-tag">Ready to Audit</span>
            </div>
            <button className="icon-btn" onClick={() => { setFileName(null); onFileChange(null); }}>
               <X size={20} />
            </button>
          </div>
        )}

        {/* --- 3. ANALYZE BUTTON (Passes Profile) --- */}
        {fileName && (
          <button className="primary-btn pulse-anim" onClick={() => onAnalyze(selectedProfile)}>
            Initialize {selectedProfile.toUpperCase()} Agent
          </button>
        )}
      </div>

      <div className="system-footer">
        <div className="sys-stat"><span className="sys-label"><Activity size={10}/> Latency</span><span className="sys-value">24ms</span></div>
        <div className="sys-stat"><span className="sys-label"><Server size={10}/> Region</span><span className="sys-value">ap-south-1</span></div>
      </div>
    </div>
  );
};

export default FileUpload;