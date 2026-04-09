import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { stepDependencyData } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export const StepEvolution = ({ data, lang, dataLabel }) => {
  const translations = {
    pl: { label: 'Ewolucja' },
    en: { label: 'Evolution' }
  };

  const t = translations[lang] || translations.pl;

  const finalChartData = data ? {
    labels: data.map(item => item.timestamp.split('T')[0]),
    datasets: [{
      label: `${dataLabel} (${t.label})`,
      data: data.map(item => item[dataLabel]),
      stepped: true,
      borderColor: '#646cff',
      backgroundColor: 'rgba(100, 108, 255, 0.1)',
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#646cff'
    }]
  } : stepDependencyData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: '#333' },
        ticks: { color: '#888' }
      },
      y: {
        grid: { color: '#333' },
        ticks: { color: '#888' },
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={finalChartData} options={options} />
    </div>
  );
};
