import React, { useEffect, useRef } from 'react';

const DEMO_DATA = [
  { timestamp: '2025-01-15T10:00:00', activity: 10 },
  { timestamp: '2025-02-14T12:30:00', activity: 30 },
  { timestamp: '2025-03-08T09:15:00', activity: 50 },
  { timestamp: '2025-04-20T14:45:00', activity: 20 },
  { timestamp: '2025-06-01T16:20:00', activity: 60 },
  { timestamp: '2025-08-15T11:00:00', activity: 40 },
  { timestamp: '2025-11-11T18:00:00', activity: 25 },
  { timestamp: '2025-12-24T20:00:00', activity: 55 },
];

const DEMO_OPTIONS = {
  timeKey: 'timestamp',
  valueKey: 'activity'
};

export const CalendarActivity = ({ engine = 'nivo', chartType = 'calendar', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};

  const activeOptions = { ...baseOptions, ...cleanOptions };

  const timeKey = activeOptions.timeKey || 'timestamp';
  const valueKey = activeOptions.valueKey || 'value'; 

  const finalData = dataToProcess.map(item => {
    let finalVal = parseFloat(item[valueKey]);
    if (isNaN(finalVal)) finalVal = 0;

    const dateStr = item[timeKey] ? String(item[timeKey]).split('T')[0] : '2025-01-01';

    return {
      day: dateStr,
      value: finalVal
    };
  });

  const years = finalData
    .map(d => parseInt(d.day.split('-')[0]))
    .filter(n => !isNaN(n));

  const minYear = years.length > 0 ? Math.min(...years) : new Date().getFullYear();
  const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();

  const { timeKey: _, valueKey: __, ...safeOptions } = activeOptions;

  const chartOptions = {
    from: `${minYear}-01-01`,
    to: `${maxYear}-12-31`,
    emptyColor: "#f1f2f6",
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    cellSize: 30,
    margin: { top: 40, right: 10, bottom: 10, left: 40 },
    yearSpacing: 40,
    monthBorderColor: "#ffffff",
    dayBorderWidth: 3,
    dayBorderColor: "#ffffff",
    yearLegendPosition: "none",
    monthLegendOffset: 15,
    dayLegendOffset: 10,
    ...safeOptions 
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData.length > 0) {
      containerRef.current.innerHTML = '';
      
      const plotElement = window.makeplot(chartType, finalData, chartOptions, engine);
      
      if (plotElement) {
        containerRef.current.appendChild(plotElement);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, valueKey]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isDemo && (
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          background: 'rgba(0,0,0,0.05)', color: '#666',
          padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
        }}>
          Tryb Demo
        </div>
      )}
      
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};