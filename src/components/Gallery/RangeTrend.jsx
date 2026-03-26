import React from 'react';
import Chart from 'react-apexcharts';
import { rangeMetricsData } from '../../data/mockData';

export const RangeTrend = () => {
  const options = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#646cff'],
    fill: { type: 'solid', opacity: 0.2 },
    stroke: { curve: 'smooth', width: 2 },
    theme: { mode: 'dark' },
    xaxis: { type: 'datetime', labels: { style: { colors: '#888' } } },
    yaxis: { labels: { style: { colors: '#888' } } },
    grid: { borderColor: '#333' },
    tooltip: { theme: 'dark' }
  };

  const series = [{ name: 'LoC Deviation Range', data: rangeMetricsData }];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  );
};
