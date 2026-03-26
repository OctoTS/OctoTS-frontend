import React from 'react';
import ReactECharts from 'echarts-for-react';

export const BoxPlotShowcase = () => {
  const option = {
    tooltip: { trigger: 'item' },
    dataset: [{
      source: [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790]
      ]
    }, {
      transform: { type: 'boxplot' }
    }],
    xAxis: { type: 'category' },
    yAxis: { splitLine: { show: true } },
    series: [{ name: 'boxplot', type: 'boxplot' }]
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
