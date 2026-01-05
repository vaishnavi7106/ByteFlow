import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const QualityGauge = ({ score }) => {
  const data = {
    labels: ['Quality', 'Gap'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [
          score > 75 ? '#00E676' : score > 50 ? '#FFC400' : '#FF1744', 
          'rgba(255, 255, 255, 0.1)', // Subtle track color
        ],
        borderWidth: 0,
        circumference: 360,
        cutout: '85%', // Thinner ring looks more modern
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // CRITICAL: Allows CSS to resize it
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: {
        animateScale: true,
        animateRotate: true
    }
  };

  return (
    <div className="gauge-wrapper">
      <Doughnut data={data} options={options} />
      <div className="score-overlay">
        <h1>{score}</h1>
        <span>DQS</span>
      </div>
    </div>
  );
};

export default QualityGauge;