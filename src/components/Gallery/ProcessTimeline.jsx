import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { task: 'Analiza wymagań', start: 0, end: 30 },
  { task: 'Projektowanie architektury', start: 30, end: 90 },
  { task: 'Konfiguracja repozytorium', start: 40, end: 60 },
  { task: 'Implementacja Core', start: 90, end: 240 },
  { task: 'Review kodu', start: 200, end: 260 },
  { task: 'Testy integracyjne', start: 240, end: 300 },
  { task: 'Wdrożenie na Stage', start: 300, end: 340 },
];

const DEMO_OPTIONS = {
  nameKey: 'task',
  startKey: 'start',
  endKey: 'end'
};

export const ProcessTimeline = ({ engine = 'echarts', chartType = 'bar', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;

  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};

  const activeOptions = { ...baseOptions, ...cleanOptions };

  const nameKey = activeOptions.nameKey || 'name';
  const startKey = activeOptions.startKey || 'start';
  const endKey = activeOptions.endKey || 'end';

  const processedData = dataToProcess.map(d => {
    const startVal = parseFloat(d[startKey]);
    const endVal = parseFloat(d[endKey]);
    const safeStart = isNaN(startVal) ? 0 : startVal;
    const safeEnd = isNaN(endVal) ? 0 : endVal;

    return {
      name: d[nameKey] ? String(d[nameKey]).trim() : 'Nieznane',
      start: safeStart,
      duration: Math.max(0, safeEnd - safeStart) 
    };
  }).reverse(); 

  const categories = processedData.map(d => d.name);
  const startData = processedData.map(d => d.start);
  const durationData = processedData.map(d => d.duration);

  const { nameKey: _, startKey: __, endKey: ___, ...safeOptions } = activeOptions;

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        const tar = params[1];
        if (!tar) return '';
        return `${tar.name}<br/>Czas trwania: <strong>${tar.value} min</strong>`;
      }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: { type: 'value', name: 'Minuty' },
    yAxis: { type: 'category', data: categories },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: { borderColor: 'transparent', color: 'transparent' },
        emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
        data: startData 
      },
      {
        name: 'Czas trwania',
        type: 'bar',
        stack: 'Total',
        label: { show: true, position: 'inside' },
        itemStyle: { color: '#3498db', borderRadius: 5 },
        data: durationData
      }
    ],
    ...safeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && processedData.length > 0) {
      containerRef.current.innerHTML = '';
      
      const plotElement = window.makeplot(chartType, processedData, chartOptions, engine);
      
      if (plotElement) {
        containerRef.current.appendChild(plotElement);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, nameKey, startKey, endKey]);

  return (
    <ChartSnippetWrapper 
      isDemo={isDemo}
      chartType={chartType}
      engine={engine}
      data={processedData} 
      options={chartOptions}
    >
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </ChartSnippetWrapper>
  );
};