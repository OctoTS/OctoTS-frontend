import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { autor: 'Anna', data: '2023-01-01', pozycja: 1 },
    { autor: 'Anna', data: '2023-02-01', pozycja: 2 },
    { autor: 'Anna', data: '2023-03-01', pozycja: 1 },
    { autor: 'Anna', data: '2023-04-01', pozycja: 3 },
    { autor: 'Jan', data: '2023-01-01', pozycja: 2 },
    { autor: 'Jan', data: '2023-02-01', pozycja: 1 },
    { autor: 'Jan', data: '2023-03-01', pozycja: 3 },
    { autor: 'Jan', data: '2023-04-01', pozycja: 2 },
    { autor: 'Marek', data: '2023-01-01', pozycja: 3 },
    { autor: 'Marek', data: '2023-02-01', pozycja: 3 },
    { autor: 'Marek', data: '2023-03-01', pozycja: 2 },
    { autor: 'Marek', data: '2023-04-01', pozycja: 1 },
  ],
  en: [
    { author: 'Anna', date: '2023-01-01', rank: 1 },
    { author: 'Anna', date: '2023-02-01', rank: 2 },
    { author: 'Anna', date: '2023-03-01', rank: 1 },
    { author: 'Anna', date: '2023-04-01', rank: 3 },
    { author: 'John', date: '2023-01-01', rank: 2 },
    { author: 'John', date: '2023-02-01', rank: 1 },
    { author: 'John', date: '2023-03-01', rank: 3 },
    { author: 'John', date: '2023-04-01', rank: 2 },
    { author: 'Mark', date: '2023-01-01', rank: 3 },
    { author: 'Mark', date: '2023-02-01', rank: 3 },
    { author: 'Mark', date: '2023-03-01', rank: 2 },
    { author: 'Mark', date: '2023-04-01', rank: 1 },
  ]
};

const DEMO_OPTIONS = {
  pl: { groupBy: 'autor', timeKey: 'data', valueKey: 'pozycja' },
  en: { groupBy: 'author', timeKey: 'date', valueKey: 'rank' }
};

export const BumpChart = ({ 
  engine = 'nivo', 
  chartType = 'bump', 
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

  const groupBy = activeOptions.groupBy || 'author'; 
  const timeKey = activeOptions.timeKey || 'timestamp';
  const valueKey = activeOptions.valueKey || 'value';

  const fallbackDate = currentLang === 'en' ? 'No date' : 'Brak daty';
  const fallbackGroup = currentLang === 'en' ? 'Unknown' : 'Nieznana';

  let finalData = [];
  let chartWidth = '100%';
  let xRotation = 0;

  if (dataToProcess && dataToProcess.length > 0) {
    const timePoints = Array.from(new Set(dataToProcess.map(d => d[timeKey] ? String(d[timeKey]).split('T')[0] : fallbackDate)));
    
    chartWidth = Math.max(timePoints.length * 80, 500) + 'px';
    xRotation = timePoints.length > 10 ? -45 : 0;

    const groups = Array.from(new Set(dataToProcess.map(d => d[groupBy] ? String(d[groupBy]).trim() : fallbackGroup)));

    finalData = groups.map(group => {
      const groupEntries = dataToProcess
        .filter(d => (d[groupBy] ? String(d[groupBy]).trim() : fallbackGroup) === group)
        .sort((a, b) => new Date(a[timeKey] || 0) - new Date(b[timeKey] || 0));

      return {
        id: group,
        data: groupEntries.map((d) => {
          let parsedY = parseFloat(d[valueKey]);
          return {
            x: d[timeKey] ? String(d[timeKey]).split('T')[0] : fallbackDate,
            y: isNaN(parsedY) ? 0 : parsedY
          };
        })
      };
    });
  }

  const { groupBy: _, timeKey: __, valueKey: ___, ...safeOptions } = activeOptions;

  const chartOptions = {
    margin: { top: 40, right: 100, bottom: 80, left: 80 },
    colors: { scheme: 'set2' },
    lineWidth: 3,
    activeLineWidth: 6,
    inactiveLineWidth: 3,
    inactiveOpacity: 0.15,
    pointSize: 10,
    activePointSize: 16,
    inactivePointSize: 0,
    pointBorderWidth: 3,
    activePointBorderWidth: 3,
    useMesh: true,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: xRotation,
      legend: timeKey.toUpperCase(), 
      legendPosition: 'middle',
      legendOffset: 40
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 10,
      tickRotation: 0,
      legend: valueKey.toUpperCase(), 
      legendPosition: 'middle',
      legendOffset: -60
    },
    groupBy: groupBy, 
    timeKey: timeKey,    
    valueKey: valueKey,
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
  }, [chartType, engine, dataToProcess, groupBy, timeKey, valueKey]);

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