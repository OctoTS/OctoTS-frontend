import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { module: 'Authentication', size: 120 },
  { module: 'Dashboard', size: 85 },
  { module: 'Payment Gateway', size: 200 },
  { module: 'User Profile', size: 45 },
  { module: 'Settings', size: 30 },
  { module: 'Notifications', size: 70 },
  { module: 'Reporting', size: 150 },
];

const DEMO_OPTIONS = {
  labelKey: 'module',
  valueKey: 'size'
};

export const ModuleTree = ({ engine = 'apex', chartType = 'treemap', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};

  const activeOptions = { ...baseOptions, ...cleanOptions };

  const labelKey = activeOptions.labelKey || 'label';
  const valueKey = activeOptions.valueKey || 'value';

  const finalData = [
    {
      data: dataToProcess.map(d => {
        const parsedY = parseFloat(d[valueKey]);
        return {
          x: d[labelKey] ? String(d[labelKey]).trim() : 'Nieznany',
          y: isNaN(parsedY) ? 0 : parsedY
        };
      })
    }
  ];

  const { labelKey: _, valueKey: __, ...safeOptions } = activeOptions;

  const chartOptions = {
    chart: { 
      type: chartType, 
      background: 'transparent', 
      toolbar: { show: false } 
    },
    theme: { mode: 'dark' },
    colors: ['#646cff'],
    series: finalData, 
    ...safeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData[0].data.length > 0) {
      containerRef.current.innerHTML = '';
      
      const plotElement = window.makeplot(chartType, finalData, chartOptions, engine);
      
      if (plotElement) {
        containerRef.current.appendChild(plotElement);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, labelKey, valueKey]);

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