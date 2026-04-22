import React from 'react';
import Chart from 'react-apexcharts';

export const ModuleTree = ({ data, config }) => {
  if (!data || !config || !config.valueKey || !config.groupKey) return null;

  const { valueKey, groupKey } = config;

  const chartSeries = [{
    data: data.filter(item => item[groupKey] && item[valueKey] !== undefined).map(item => ({
      x: item[groupKey],
      y: parseFloat(item[valueKey]) || 0
    }))
  }];

  const options = {
    chart: { type: 'treemap', background: 'transparent', toolbar: { show: false } },
    theme: { mode: 'dark' },
    colors: ['#646cff'],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart options={options} series={chartSeries} type="treemap" height="100%" />
    </div>
  );
};
