import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

export const CalendarActivity = ({ data, config }) => {
  if (!data || !config || !config.valueKey || !config.timeKey) return null;

  const { valueKey, timeKey } = config;
  const validData = data.filter(item => 
    item && item[timeKey] && item[valueKey] !== undefined
  );

  const chartData = validData.map(item => ({
    day: item[timeKey].toString().includes('T') ? item[timeKey].split('T')[0] : item[timeKey],
    value: parseFloat(item[valueKey]) || 0
  }));

  if (chartData.length === 0) return null;

  const years = chartData
    .map(d => parseInt(d.day.split('-')[0]))
    .filter(n => !isNaN(n));

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveCalendar
        data={chartData}
        from={`${minYear}-01-01`}
        to={`${maxYear}-12-31`}
        emptyColor="#f1f2f6"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        cellSize={30}
        margin={{ top: 40, right: 10, bottom: 10, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={3}
        dayBorderColor="#ffffff"
        yearLegendPosition="none"
        monthLegendOffset={15}
        dayLegendOffset={10}
      />
    </div>
  );
};
