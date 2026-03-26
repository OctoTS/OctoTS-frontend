import React from 'react';
import Chart from 'react-apexcharts';
import { qualityGaugeData } from '../../data/mockData';

export const QualityGauge = () => {
  const options = {
    chart: { type: 'radialBar', background: 'transparent' },
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' },
        dataLabels: { name: { show: false }, value: { color: '#ccc', fontSize: '30px', show: true } }
      }
    },
    fill: { colors: ['#646cff'] },
    labels: ['Quality Score']
  };
  return <Chart options={options} series={qualityGaugeData} type="radialBar" height="100%" />;
};
