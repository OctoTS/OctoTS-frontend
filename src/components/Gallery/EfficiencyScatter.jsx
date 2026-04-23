import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { developer: 'Zespół A', linesChanged: 120, reviewHours: 2.5 },
  { developer: 'Zespół A', linesChanged: 300, reviewHours: 5.0 },
  { developer: 'Zespół A', linesChanged: 50,  reviewHours: 1.0 },
  { developer: 'Zespół A', linesChanged: 450, reviewHours: 8.5 },
  { developer: 'Zespół B', linesChanged: 200, reviewHours: 3.0 },
  { developer: 'Zespół B', linesChanged: 150, reviewHours: 4.0 },
  { developer: 'Zespół B', linesChanged: 600, reviewHours: 10.0 },
  { developer: 'Zespół C', linesChanged: 80,  reviewHours: 1.5 },
  { developer: 'Zespół C', linesChanged: 350, reviewHours: 6.0 },
  { developer: 'Zespół C', linesChanged: 250, reviewHours: 3.5 },
];

const DEMO_OPTIONS = {
  groupBy: 'developer',
  xKey: 'linesChanged',
  yKey: 'reviewHours'
};

export const EfficiencyScatter = ({ engine = 'chartjs', chartType = 'scatter', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};

  const activeOptions = { ...baseOptions, ...cleanOptions };

  const groupBy = activeOptions.groupBy || 'group'; 
  const xKey = activeOptions.xKey || 'x';
  const yKey = activeOptions.yKey || 'y';

  const groups = Array.from(new Set(dataToProcess.map(d => d[groupBy] ? String(d[groupBy]).trim() : 'Nieznana')));

  const finalData = {
    datasets: groups.map(group => {
      const groupEntries = dataToProcess.filter(d => (d[groupBy] ? String(d[groupBy]).trim() : 'Nieznana') === group);
      
      return {
        label: group, 
        data: groupEntries.map((d) => {
          let parsedX = parseFloat(d[xKey]);
          let parsedY = parseFloat(d[yKey]);
          return {
            x: isNaN(parsedX) ? 0 : parsedX,
            y: isNaN(parsedY) ? 0 : parsedY
          };
        }),
        pointRadius: 6,
        pointHoverRadius: 9
      };
    })
  };

  const { groupBy: _, xKey: __, yKey: ___, ...safeOptions } = activeOptions;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      x: { 
        title: { display: true, text: xKey.toUpperCase(), color: '#888' }, 
        grid: { color: '#e0e0e0' } 
      },
      y: { 
        title: { display: true, text: yKey.toUpperCase(), color: '#888' }, 
        grid: { color: '#e0e0e0' } 
      }
    },
    ...safeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData.datasets.length > 0) {
      containerRef.current.innerHTML = '';
      
      const plotElement = window.makeplot(chartType, finalData, chartOptions, engine);
      
      if (plotElement) {
        containerRef.current.appendChild(plotElement);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, groupBy, xKey, yKey]);

  return (
      <ChartSnippetWrapper 
        isDemo={isDemo}
        chartType={chartType}
        engine={engine}
        data={finalData}
        options={chartOptions}
      >
        <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      </ChartSnippetWrapper>
    );
};