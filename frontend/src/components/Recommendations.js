import React, { useState } from 'react';
import { Wrench, CheckCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getFixSuggestions } from '../services/api';
import '../styles/Dashboard.css';

const Recommendations = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [solutions, setSolutions] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);

  const list = items && items.length > 0 ? items : [
    "Standardize date format to ISO-8601",
    "Impute missing Merchant IDs",
    "Validate transaction amounts"
  ];

  const handleToggleFix = async (index, issueText) => {
    // 1. If clicking the already open item, close it.
    if (expandedIndex === index) {
      setExpandedIndex(null);
      return;
    }

    if (solutions[index]) {
      setExpandedIndex(index);
      return;
    }

    // 3. Otherwise, fetch from API
    setLoadingIndex(index);
    const aiResponse = await getFixSuggestions(issueText);
    
    // Save the response
    setSolutions(prev => ({ ...prev, [index]: aiResponse }));
    setLoadingIndex(null);
    setExpandedIndex(index);
  };

  return (
    <div className="card recommendations-card">
      <div className="card-header">
        <Wrench size={24} color="#ffc400" />
        <h3>Suggested Fixes</h3>
      </div>
      
      <div className="rec-list">
        {list.map((item, index) => {
          const isOpen = expandedIndex === index;
          const isLoading = loadingIndex === index;

          return (
            <div key={index} className={`rec-wrapper ${isOpen ? 'open' : ''}`}>
              {/* The Main Row */}
              <div className="rec-item">
                <CheckCircle size={18} className="rec-icon" />
                <span className="rec-text">{item}</span>
                
                <button 
                  className={`fix-btn ${isOpen ? 'active' : ''}`} 
                  onClick={() => handleToggleFix(index, item)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={14} className="spinner" /> 
                  ) : isOpen ? (
                    <>Close <ChevronUp size={14}/></>
                  ) : (
                    <>Apply Fix <ChevronDown size={14}/></>
                  )}
                </button>
              </div>

              {/* The "Underneath" Content Area */}
              {isOpen && solutions[index] && (
                <div className="fix-dropdown">
                  <div className="fix-content-header">
                    <strong>AI Implementation Guide:</strong>
                  </div>
                  <div className="fix-content-body">
                    {/* Convert newlines to breaks for clean formatting */}
                    {solutions[index].split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;