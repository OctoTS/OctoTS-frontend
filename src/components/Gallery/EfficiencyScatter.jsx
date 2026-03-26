import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from 'chart.js';
import { efficiencyScatterData } from '../../data/mockData';

ChartJS.register(LinearScale, PointElement, Tooltip);

export const EfficiencyScatter = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Lines Changed', color: '#888' }, grid: { color: '#333' } },
      y: { title: { display: true, text: 'Review Hours', color: '#888' }, grid: { color: '#333' } }
    }
  };
  return <Scatter data={efficiencyScatterData} options={options} />;
};
