import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const StatusRadar = ({ data, config, lang }) => {
  if (!data || !config || !config.valueKey || !config.groupKey) return null;
  const { valueKey, groupKey } = config;

  const translations = {
    pl: { label: 'Wkład' },
    en: { label: 'Contribution' }
  };
  const t = translations[lang] || translations.en;

  const groups = Array.from(new Set(data.map(item => item[groupKey])));
  const values = groups.map(g => 
    data.filter(d => d[groupKey] === g)
        .reduce((sum, curr) => sum + (parseFloat(curr[valueKey]) || 0), 0)
  );

  const chartData = {
    labels: groups,
    datasets: [{
      label: t.label,
      data: values,
      backgroundColor: 'rgba(100, 108, 255, 0.2)',
      borderColor: '#646cff',
      pointBackgroundColor: '#646cff',
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#333' },
        grid: { color: '#333' },
        pointLabels: { color: '#888' },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return <Radar data={chartData} options={options} />;
};
