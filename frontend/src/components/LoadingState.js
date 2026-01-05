import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const messages = [
  "Ingesting CSV stream...",
  "Detecting PII & Anonymizing...",
  "Consulting GenAI Agent...",
  "Calculating Dimensions...",
  "Generating Business Insights..."
];

const LoadingState = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 800); // Change text every 0.8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <Loader2 className="spinner" size={48} />
      <h3 className="loading-text">{messages[msgIndex]}</h3>
    </div>
  );
};

export default LoadingState;