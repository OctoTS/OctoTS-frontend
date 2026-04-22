import React from 'react';
import Chart from 'react-apexcharts';

export const RangeTrend = ({ data, config, lang }) => {
  if (!data || !config || !config.valueKey || !config.timeKey) return null;
  const { valueKey, timeKey } = config;

  const translations = {
    pl: { range: 'Zakres' },
    en: { range: 'Range' }
  };
  const t = translations[lang] || translations.en;

  const series = [{
    name: config.labelY || t.range,
    data: data.map(item => ({
      x: new Date(item[timeKey]).getTime(),
      y: [
        Math.floor(parseFloat(item[valueKey]) * 0.85),
        Math.ceil(parseFloat(item[valueKey]) * 1.15)
      ]
    }))
  }];

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

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  );
};
