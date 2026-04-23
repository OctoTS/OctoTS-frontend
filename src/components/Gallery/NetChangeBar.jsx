import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { dzien: 'Pn', typ: 'Dodane', ilosc: 44 },
    { dzien: 'Pn', typ: 'Usunięte', ilosc: -15 },
    { dzien: 'Wt', typ: 'Dodane', ilosc: 55 },
    { dzien: 'Wt', typ: 'Usunięte', ilosc: -25 },
    { dzien: 'Śr', typ: 'Dodane', ilosc: 41 },
    { dzien: 'Śr', typ: 'Usunięte', ilosc: -20 },
    { dzien: 'Cz', typ: 'Dodane', ilosc: 67 },
    { dzien: 'Cz', typ: 'Usunięte', ilosc: -10 },
    { dzien: 'Pt', typ: 'Dodane', ilosc: 22 },
    { dzien: 'Pt', typ: 'Usunięte', ilosc: -30 },
    { dzien: 'So', typ: 'Dodane', ilosc: 43 },
    { dzien: 'So', typ: 'Usunięte', ilosc: -5 },
    { dzien: 'Nd', typ: 'Dodane', ilosc: 21 },
    { dzien: 'Nd', typ: 'Usunięte', ilosc: -12 }
  ],
  en: [
    { day: 'Mon', type: 'Added', amount: 44 },
    { day: 'Mon', type: 'Removed', amount: -15 },
    { day: 'Tue', type: 'Added', amount: 55 },
    { day: 'Tue', type: 'Removed', amount: -25 },
    { day: 'Wed', type: 'Added', amount: 41 },
    { day: 'Wed', type: 'Removed', amount: -20 },
    { day: 'Thu', type: 'Added', amount: 67 },
    { day: 'Thu', type: 'Removed', amount: -10 },
    { day: 'Fri', type: 'Added', amount: 22 },
    { day: 'Fri', type: 'Removed', amount: -30 },
    { day: 'Sat', type: 'Added', amount: 43 },
    { day: 'Sat', type: 'Removed', amount: -5 },
    { day: 'Sun', type: 'Added', amount: 21 },
    { day: 'Sun', type: 'Removed', amount: -12 }
  ]
};

const DEMO_OPTIONS = {
  pl: { xKey: 'dzien', groupBy: 'typ', valueKey: 'ilosc' },
  en: { xKey: 'day', groupBy: 'type', valueKey: 'amount' }
};

export const NetChangeBar = ({ 
  engine = 'apex', 
  chartType = 'bar', 
  rawData, 
  options = {}, 
  lang = 'pl' 
}) => {
  const containerRef = useRef(null);

  const currentLang = lang === 'en' ? 'en' : 'pl';
  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA[currentLang] : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS[currentLang] : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const xKey = activeOptions.xKey || 'x';
  const groupBy = activeOptions.groupBy || 'group';
  const valueKey = activeOptions.valueKey || 'value';

  const fallbackGroup = currentLang === 'en' ? 'Unknown' : 'Nieznana';
  const fallbackX = currentLang === 'en' ? 'Unknown' : 'Nieznane';

  const groups = Array.from(new Set(dataToProcess.map(d => d[groupBy] ? String(d[groupBy]).trim() : fallbackGroup)));

  const finalData = groups.map(group => {
    const groupEntries = dataToProcess.filter(d => (d[groupBy] ? String(d[groupBy]).trim() : fallbackGroup) === group);
    
    return {
      name: group, 
      data: groupEntries.map(d => {
        const parsedY = parseFloat(d[valueKey]);
        return {
          x: d[xKey] ? String(d[xKey]).trim() : fallbackX,
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
    <ChartSnippetWrapper 
      isDemo={isDemo}
      chartType={chartType}
      engine={engine}
      data={finalData}
      options={chartOptions}
      lang={currentLang}
    >
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </ChartSnippetWrapper>
  );
};