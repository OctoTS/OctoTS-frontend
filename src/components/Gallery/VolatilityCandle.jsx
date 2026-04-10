import React from 'react';
import Chart from 'react-apexcharts';
import { candleVolatilityData } from '../../data/mockData';

export const VolatilityCandle = ({ data, lang, dataLabel }) => {
  const translations = {
    pl: { seriesName: 'Zmienność' },
    en: { seriesName: 'Volatility' }
  };

  const t = translations[lang] || translations.pl;

  const finalSeries = data ? [{
    name: dataLabel || t.seriesName,
    data: data.map(item => ({
      x: new Date(item.timestamp).getTime(),
      y: [
        item[dataLabel],
        item[dataLabel] + 15,
        item[dataLabel] - 10,
        item[dataLabel] + 5
      ]
    }))
  }] : [{ data: candleVolatilityData }];

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
    tooltip: {
      theme: 'dark'
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={finalSeries} type="candlestick" height="100%" />
    </div>
  );
};
