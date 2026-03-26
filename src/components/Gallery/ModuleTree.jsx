import React from 'react';
import Chart from 'react-apexcharts';
import { moduleTreeData } from '../../data/mockData';

export const ModuleTree = () => {
  const options = {
    chart: { type: 'treemap', background: 'transparent', toolbar: { show: false } },
    theme: { mode: 'dark' },
    colors: ['#646cff']
  };
  return <Chart options={options} series={moduleTreeData} type="treemap" height="100%" />;
};
