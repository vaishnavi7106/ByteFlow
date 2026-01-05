import React from 'react';
import { Bot } from 'lucide-react';

const InsightCard = ({ insights }) => {
  // Assuming 'insights' is the raw text from backend
  return (
    <div className="insight-card">
      <div className="card-header">
        <Bot size={24} color="#00bcd4" />
        <h3>GenAI Analyst</h3>
      </div>
      <div className="card-body">
        {/* If insights is JSON, parse it. If text, display it. */}
        <p>{typeof insights === 'string' ? insights : JSON.stringify(insights)}</p>
      </div>
    </div>
  );
};

export default InsightCard;