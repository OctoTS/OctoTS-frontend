import React from 'react';
import ReactECharts from 'echarts-for-react';
import { hourlyData } from '../../data/mockData';

export const HourlyCycle = () => {
  const option = {
    tooltip: { position: 'top' },
    grid: { height: '65%', top: '5%', bottom: '25%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: Array.from({length: 24}, (_, i) => i+'h'),
      splitArea: { show: true }
    },
    yAxis: { 
      type: 'category', 
      data: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].reverse(),
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%', 
      inRange: { color: ['#ebf5fb', '#3498db'] }
    },
    series: [{
      name: 'Aktywność',
      type: 'heatmap',
      data: hourlyData,
      label: { show: false },
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }]
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
