import React from 'react';
import Chart from 'react-apexcharts';

export const VolatilityCandle = ({ data, config, lang }) => {
  if (!data || !config || !config.valueKey || !config.timeKey) return null;
  const { valueKey, timeKey } = config;

  const translations = {
    pl: { seriesName: 'Zmienność' },
    en: { seriesName: 'Volatility' }
  };
  const t = translations[lang] || translations.en;

  const series = [{
    name: valueKey || t.seriesName,
    data: data.map(item => ({
      x: new Date(item[timeKey]).getTime(),
      y: [
        parseFloat(item[valueKey]),
        parseFloat(item[valueKey]) + 15,
        parseFloat(item[valueKey]) - 10,
        parseFloat(item[valueKey]) + 5
      ]
    }))
  }];

  const options = {
    chart: { 
      type: 'candlestick', 
      background: 'transparent', 
      toolbar: { show: false } 
    },
    xaxis: { 
      type: 'datetime', 
      labels: { style: { colors: '#888' } } 
    },
    yaxis: { 
      labels: { style: { colors: '#888' } } 
    },
    theme: { mode: 'dark' },
    plotOptions: {
      candlestick: { 
        colors: { upward: '#646cff', downward: '#ff6384' } 
      }
    },
    grid: { borderColor: '#333' },
    tooltip: { theme: 'dark' }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={series} type="candlestick" height="100%" />
    </div>
  );
};
