import React from 'react';
import ReactECharts from 'echarts-for-react';
import { longTermData } from '../../data/mockData';

export const TimeZoomPlot = ({ data, lang, dataLabel }) => {
  const translations = {
    pl: { value: 'Wartość' },
    en: { value: 'Value' }
  };

  const t = translations[lang] || translations.pl;

  const xAxisData = data
    ? data.map(d => d.timestamp)
    : longTermData.map(d => d.date);

  const seriesData = data
    ? data.map(d => d[dataLabel])
    : longTermData.map(d => d.value);

  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: { type: 'value' },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60px',
      top: '10%',
      containLabel: true
    },
    dataZoom: [
      { type: 'slider', bottom: '10px', height: 25 },
      { type: 'inside' }
    ],
    series: [{
      name: data ? dataLabel : t.value,
      type: 'line',
      smooth: true,
      areaStyle: { opacity: 0.2 },
      data: seriesData,
      color: '#3498db'
    }]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
