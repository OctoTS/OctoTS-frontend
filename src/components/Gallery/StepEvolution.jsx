import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { stepDependencyData } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export const StepEvolution = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: '#333' }, ticks: { color: '#888' } },
      y: { grid: { color: '#333' }, ticks: { color: '#888' }, beginAtZero: true }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={stepDependencyData} options={options} />
    </div>
  );
};
