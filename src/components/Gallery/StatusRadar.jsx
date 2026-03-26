import React from 'react';
import { Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { statusRadarData } from '../../data/mockData';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const StatusRadar = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: { color: '#333' },
        angleLines: { color: '#333' },
        pointLabels: { color: '#ccc', font: { size: 11 } },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { 
        labels: { color: '#ccc' },
        position: 'bottom'
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Radar data={statusRadarData} options={options} />
    </div>
  );
};
