import React from 'react';
import '../styles/Dashboard.css';

const DimensionBars = ({ dimensions }) => {
  // Helper to determine color based on score
  const getColor = (score) => {
    if (score >= 80) return '#00e676'; // Green
    if (score >= 50) return '#ffc400'; // Yellow
    return '#ff1744'; // Red
  };

  return (
    <div className="card dimensions-card">
      <h3 className="card-title">Quality Dimensions</h3>
      <div className="bars-container">
        {Object.entries(dimensions).map(([key, score]) => (
          <div key={key} className="dim-row">
            <div className="dim-header">
              <span className="dim-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span className="dim-score" style={{ color: getColor(score) }}>
                {score}%
              </span>
            </div>
            
            <div className="progress-bg">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${score}%`, 
                  backgroundColor: getColor(score) 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DimensionBars;