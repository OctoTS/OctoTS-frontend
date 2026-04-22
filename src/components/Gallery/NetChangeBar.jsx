import React from 'react';
import Chart from 'react-apexcharts';

export const NetChangeBar = ({ data, config, lang }) => {
  if (!data || !config || !config.valueKey) return null;

  const { valueKey } = config;

  const chartSeries = [
    { 
      name: lang === 'pl' ? 'Dodano' : 'Added', 
      data: data.map(item => parseFloat(item[valueKey]) || 0) 
    },
    { 
      name: lang === 'pl' ? 'Usunięto' : 'Removed', 
      data: data.map(item => -(parseFloat(item[valueKey]) * 0.2) || 0) 
    }
  ];

  const options = {
    chart: { type: 'bar', stacked: true, background: 'transparent', toolbar: { show: false } },
    colors: ['#646cff', '#ff6384'],
    plotOptions: { bar: { borderRadius: 5 } },
    theme: { mode: 'dark' },
    xaxis: { 
      categories: data.map((_, i) => i + 1),
      labels: { style: { colors: '#888' } }
    },
    yaxis: { labels: { style: { colors: '#888' } } },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: { colors: '#64748b' }
    },
    grid: { borderColor: '#333', strokeDasharray: 4 },
    tooltip: { theme: 'dark' }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={chartSeries} type="bar" height="100%" />
    </div>
  );
};
