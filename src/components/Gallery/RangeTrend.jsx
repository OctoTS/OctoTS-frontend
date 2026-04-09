import React from 'react';
import Chart from 'react-apexcharts';
import { rangeMetricsData } from '../../data/mockData';

export const RangeTrend = ({ data, lang, dataLabel }) => {
  const translations = {
    pl: { range: 'Zakres odchylenia' },
    en: { range: 'Deviation Range' }
  };

  const t = translations[lang] || translations.pl;

  const finalSeriesData = data ? data.map(item => ({
    x: new Date(item.timestamp).getTime(),
    y: [
      Math.floor(item[dataLabel] * 0.85),
      Math.ceil(item[dataLabel] * 1.15)
    ]
  })) : rangeMetricsData;

  const series = [{
    name: data ? `${dataLabel} (${t.range})` : `LoC ${t.range}`,
    data: finalSeriesData
  }];

  const options = {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: { show: false }
    },
    colors: ['#646cff'],
    fill: { type: 'solid', opacity: 0.2 },
    stroke: { curve: 'smooth', width: 2 },
    theme: { mode: 'dark' },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#888' } }
    },
    yaxis: {
      labels: { style: { colors: '#888' } }
    },
    grid: { borderColor: '#333' },
    tooltip: { theme: 'dark' }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  );
};
