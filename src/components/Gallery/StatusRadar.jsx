import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { statusRadarData } from '../../data/mockData';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const StatusRadar = ({ data, lang, dataLabel }) => {
  const translations = {
    pl: { label: 'Wkład per Autor' },
    en: { label: 'Contribution by Author' }
  };

  const t = translations[lang] || translations.pl;
  let finalData = statusRadarData;

  if (data) {
    const authorStats = data.reduce((acc, curr) => {
      acc[curr.author] = (acc[curr.author] || 0) + (curr[dataLabel] || 0);
      return acc;
    }, {});

    finalData = {
      labels: Object.keys(authorStats),
      datasets: [{
        label: `${dataLabel} (${t.label})`,
        data: Object.values(authorStats),
        backgroundColor: 'rgba(100, 108, 255, 0.2)',
        borderColor: '#646cff',
        pointBackgroundColor: '#646cff',
        pointBorderColor: '#fff',
      }]
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#333' },
        grid: { color: '#333' },
        pointLabels: { color: '#888', font: { size: 10 } },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#888' }
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Radar data={finalData} options={options} />
    </div>
  );
};
