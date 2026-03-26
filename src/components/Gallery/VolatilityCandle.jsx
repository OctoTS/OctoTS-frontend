import React from 'react';
import Chart from 'react-apexcharts';
import { candleVolatilityData } from '../../data/mockData';

export const VolatilityCandle = () => {
  const options = {
    chart: { 
      type: 'candlestick', 
      background: 'transparent',
      toolbar: { show: false }
    },
    xaxis: { type: 'datetime' },
    theme: { mode: 'dark' },
    plotOptions: {
      candlestick: {
        colors: { 
          upward: '#646cff', 
          downward: '#ff6384' 
        }
      }
    }
  };

  const series = [{ 
    name: 'LoC Volatility', 
    data: candleVolatilityData 
  }];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={series} type="candlestick" height="100%" />
    </div>
  );
};
