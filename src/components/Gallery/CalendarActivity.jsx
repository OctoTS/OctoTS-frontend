import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

export const CalendarActivity = () => {
  const data = Array.from({ length: 100 }, (_, i) => {
    const d = new Date(2023, 8, i); // Dane od września 2023
    return {
      day: d.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 400)
    };
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveCalendar
        data={data}
        from="2023-08-01"
        to="2023-11-30"
        emptyColor="#f1f2f6"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        cellSize={30}
        margin={{ top: 40, right: 10, bottom: 10, left: 40 }}
        yearSpacing={0}
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
