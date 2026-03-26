import React from 'react';
import Chart from 'react-apexcharts';
import { netChangeData } from '../../data/mockData';

export const NetChangeBar = () => {
  const options = {
    chart: { type: 'bar', stacked: true, background: 'transparent', toolbar: { show: false } },
    colors: ['#646cff', '#ff6384'],
    plotOptions: { bar: { borderRadius: 5 } },
    theme: { mode: 'dark' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },

    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: '#64748b',
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 5
      }
    },
    grid: {
      borderColor: '#333',
      strokeDasharray: 4
    },
    tooltip: { theme: 'dark' }

  };
  return <Chart options={options} series={netChangeData} type="bar" height="100%" />;
};
