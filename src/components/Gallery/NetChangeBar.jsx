import React, { useEffect, useRef } from 'react';

// 0a. Definiujemy dane demo (fallback) dla Stacked Bar Chart
const DEMO_DATA = [
  { day: 'Mon', type: 'Dodane', amount: 44 },
  { day: 'Mon', type: 'Usunięte', amount: -15 },
  { day: 'Tue', type: 'Dodane', amount: 55 },
  { day: 'Tue', type: 'Usunięte', amount: -25 },
  { day: 'Wed', type: 'Dodane', amount: 41 },
  { day: 'Wed', type: 'Usunięte', amount: -20 },
  { day: 'Thu', type: 'Dodane', amount: 67 },
  { day: 'Thu', type: 'Usunięte', amount: -10 },
  { day: 'Fri', type: 'Dodane', amount: 22 },
  { day: 'Fri', type: 'Usunięte', amount: -30 },
  { day: 'Sat', type: 'Dodane', amount: 43 },
  { day: 'Sat', type: 'Usunięte', amount: -5 },
  { day: 'Sun', type: 'Dodane', amount: 21 },
  { day: 'Sun', type: 'Usunięte', amount: -12 }
];

// 0b. Domyślne opcje dla danych demo
const DEMO_OPTIONS = {
  xKey: 'day',
  groupBy: 'type',
  valueKey: 'amount'
};

export const NetChangeBar = ({ engine = 'apex', chartType = 'bar', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const activeOptions = isDemo && Object.keys(options).length === 0 ? DEMO_OPTIONS : { ...DEMO_OPTIONS, ...options };

  const xKey = activeOptions.xKey || 'x';
  const groupBy = activeOptions.groupBy || 'group';
  const valueKey = activeOptions.valueKey || 'value';

  const groups = Array.from(new Set(dataToProcess.map(d => d[groupBy] ? String(d[groupBy]).trim() : 'Nieznana')));

  const finalData = groups.map(group => {
    const groupEntries = dataToProcess.filter(d => (d[groupBy] ? String(d[groupBy]).trim() : 'Nieznana') === group);
    
    return {
      name: group, 
      data: groupEntries.map(d => {
        const parsedY = parseFloat(d[valueKey]);
        return {
          x: d[xKey] ? String(d[xKey]).trim() : 'Nieznane',
          y: isNaN(parsedY) ? 0 : parsedY
        };
      })
    };
  });

  const { xKey: _, groupBy: __, valueKey: ___, ...safeOptions } = activeOptions;

  const chartOptions = {
    chart: { 
      type: chartType, 
      stacked: true, 
      background: 'transparent', 
      toolbar: { show: false } 
    },
    colors: ['#646cff', '#ff6384'], 
    plotOptions: { 
      bar: { borderRadius: 5 } 
    },
    theme: { mode: 'dark' },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: '#64748b',
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 5
      }
    },
    grid: {
      borderColor: '#333',
      strokeDasharray: 4
    },
    tooltip: { theme: 'dark' },
    series: finalData,
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
  }, [chartType, engine, dataToProcess, xKey, groupBy, valueKey]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isDemo && (
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          background: 'rgba(255,255,255,0.1)', color: '#ccc', 
          padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
        }}>
          Tryb Demo
        </div>
      )}
      
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};