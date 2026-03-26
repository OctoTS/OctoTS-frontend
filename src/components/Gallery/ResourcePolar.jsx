import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip } from 'chart.js';
import { resourcePolarData } from '../../data/mockData';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

export const ResourcePolar = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { r: { grid: { color: '#333' }, ticks: { display: false } } }
  };
  return <PolarArea data={resourcePolarData} options={options} />;
};
