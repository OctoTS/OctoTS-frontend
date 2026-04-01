import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { statusRadarData } from '../../data/mockData'; 

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const StatusRadar = ({ data }) => {
  let finalData = statusRadarData;

  if (data) {
    const authorStats = data.reduce((acc, curr) => {
      acc[curr.author] = (acc[curr.author] || 0) + curr.lines_of_code;
      return acc;
    }, {});

    finalData = {
      labels: Object.keys(authorStats),
      datasets: [{
        label: 'LOC by Author',
        data: Object.values(authorStats),
        backgroundColor: 'rgba(100, 108, 255, 0.2)',
        borderColor: '#646cff',
      }]
    };
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Radar data={finalData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};
