import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const EfficiencyScatter = ({ data, config }) => {
  if (!data || !config || !config.valueKey) return null;

  const { valueKey, labelY } = config;

  const validData = data.filter(item => 
    item && item[valueKey] !== undefined && !isNaN(parseFloat(item[valueKey]))
  );

  if (validData.length === 0) return null;

  const chartData = {
    datasets: [{
      label: labelY || valueKey,
      data: validData.map((item, index) => ({ 
        x: index, 
        y: parseFloat(item[valueKey]) 
      })),
      backgroundColor: '#646cff',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        grid: { color: '#333' },
        ticks: { display: false },
        title: { display: true, text: 'Index', color: '#888' }
      },
      y: { 
        grid: { color: '#333' },
        ticks: { color: '#888' },
        beginAtZero: true,
        title: { display: true, text: labelY || '', color: '#888' }
      }
    },
    plugins: {
      legend: { display: !!labelY }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
};
