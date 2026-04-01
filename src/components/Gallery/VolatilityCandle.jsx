import React from 'react';
import Chart from 'react-apexcharts';
import { candleVolatilityData } from '../../data/mockData';

export const VolatilityCandle = ({ data }) => {
  const finalSeries = data ? [{
    data: data.map(item => ({
      x: new Date(item.timestamp).getTime(),
      y: [
        item.lines_of_code, 
        item.lines_of_code + 15, 
        item.lines_of_code - 10, 
        item.lines_of_code + 5
      ]
    }))
  }] : [{ data: candleVolatilityData }];

  const options = {
    chart: { type: 'candlestick', background: 'transparent', toolbar: { show: false } },
    xaxis: { type: 'datetime', labels: { style: { colors: '#888' } } },
    yaxis: { labels: { style: { colors: '#888' } } },
    theme: { mode: 'dark' },
    plotOptions: {
      candlestick: { colors: { upward: '#646cff', downward: '#ff6384' } }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={finalSeries} type="candlestick" height="100%" />
    </div>
  );
};
