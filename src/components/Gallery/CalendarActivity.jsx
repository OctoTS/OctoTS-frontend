import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { calendarData } from '../../data/mockData';

export const CalendarActivity = ({ data, dataLabel }) => {
  const finalData = data ? data.map(item => ({
    day: item.timestamp.split('T')[0],
    value: item[dataLabel]
  })) : calendarData;

  const years = finalData
    .map(d => parseInt(d.day.split('-')[0]))
    .filter(n => !isNaN(n));

  const minYear = years.length > 0 ? Math.min(...years) : 2025;
  const maxYear = years.length > 0 ? Math.max(...years) : 2025;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveCalendar
        data={finalData}
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
