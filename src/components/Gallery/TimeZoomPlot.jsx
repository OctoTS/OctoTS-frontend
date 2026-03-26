import React from 'react';
import ReactECharts from 'echarts-for-react';
import { longTermData } from '../../data/mockData';

export const TimeZoomPlot = () => {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: longTermData.map(d => d.date) },
    yAxis: { type: 'value' },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '60px', 
      top: '10%',
      containLabel: true
    },
    dataZoom: [{ type: 'slider',bottom: '10px', height: 25 }, { type: 'inside' }],
    series: [{
      name: 'Value',
      type: 'line',
      smooth: true,
      areaStyle: { opacity: 0.2 },
      data: longTermData.map(d => d.value),
      color: '#3498db'
    }]
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
