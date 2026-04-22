import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const ResourcePolar = ({ data, config }) => {
  if (!data || !config || !config.valueKey || !config.groupKey) return null;
  const { valueKey, groupKey } = config;

  const categories = Array.from(new Set(data.map(item => item[groupKey])));
  const values = categories.map(cat => 
    data.filter(d => d[groupKey] === cat)
        .reduce((sum, curr) => sum + (parseFloat(curr[valueKey]) || 0), 0)
  );

  const chartData = {
    labels: categories,
    datasets: [{
      data: values,
      backgroundColor: [
        'rgba(100, 108, 255, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      r: { 
        grid: { color: '#333' }, 
        ticks: { display: false },
        angleLines: { color: '#333' }
      } 
    },
    plugins: {
      legend: { labels: { color: '#888', font: { size: 10 } } }
    }
  };

  return <PolarArea data={chartData} options={options} />;
};
