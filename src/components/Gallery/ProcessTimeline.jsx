import React from 'react';
import ReactECharts from 'echarts-for-react';
import { timelineData } from '../../data/mockData';

export const ProcessTimeline = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const tar = params[1];
        return tar.name + '<br/>Czas trwania: ' + tar.value + ' min';
      }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: { type: 'value', name: 'Minuty' },
    yAxis: { type: 'category', data: timelineData.map(d => d.name).reverse() },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: { borderColor: 'transparent', color: 'transparent' },
        emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
        data: timelineData.map(d => d.start).reverse()
      },
      {
        name: 'Czas trwania',
        type: 'bar',
        stack: 'Total',
        label: { show: true, position: 'inside' },
        data: timelineData.map(d => d.end - d.start).reverse(),
        itemStyle: { color: '#3498db', borderRadius: 5 }
      }
    ]
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
