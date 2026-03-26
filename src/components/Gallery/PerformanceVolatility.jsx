import React from 'react';
import ReactECharts from 'echarts-for-react';
import { candleData } from '../../data/mockData';

export const PerformanceVolatility = () => {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { scale: true },
    series: [{
      type: 'candlestick',
      data: candleData,
      itemStyle: { color: '#27ae60', color0: '#e74c3c' }
    }]
  };
  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};
