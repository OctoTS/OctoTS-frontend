import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { zadanie: 'Analiza wymagań', start: 0, koniec: 30 },
    { zadanie: 'Projektowanie architektury', start: 30, koniec: 90 },
    { zadanie: 'Konfiguracja repozytorium', start: 40, koniec: 60 },
    { zadanie: 'Implementacja Core', start: 90, koniec: 240 },
    { zadanie: 'Review kodu', start: 200, koniec: 260 },
    { zadanie: 'Testy integracyjne', start: 240, koniec: 300 },
    { zadanie: 'Wdrożenie na Stage', start: 300, koniec: 340 },
  ],
  en: [
    { task: 'Requirements analysis', start: 0, end: 30 },
    { task: 'Architecture design', start: 30, end: 90 },
    { task: 'Repository setup', start: 40, end: 60 },
    { task: 'Core implementation', start: 90, end: 240 },
    { task: 'Code review', start: 200, end: 260 },
    { task: 'Integration tests', start: 240, end: 300 },
    { task: 'Stage deployment', start: 300, end: 340 },
  ]
};

const DEMO_OPTIONS = {
  pl: { nameKey: 'zadanie', startKey: 'start', endKey: 'koniec' },
  en: { nameKey: 'task', startKey: 'start', endKey: 'end' }
};

export const ProcessTimeline = ({ 
  engine = 'echarts', 
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

  const nameKey = activeOptions.nameKey || 'name';
  const startKey = activeOptions.startKey || 'start';
  const endKey = activeOptions.endKey || 'end';

  const fallbackName = currentLang === 'en' ? 'Unknown' : 'Nieznane';

  const processedData = dataToProcess.map(d => {
    const startVal = parseFloat(d[startKey]);
    const endVal = parseFloat(d[endKey]);
    const safeStart = isNaN(startVal) ? 0 : startVal;
    const safeEnd = isNaN(endVal) ? 0 : endVal;

    return {
      name: d[nameKey] ? String(d[nameKey]).trim() : fallbackName,
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
        const durationText = currentLang === 'en' ? 'Duration' : 'Czas trwania';
        return `${tar.name}<br/>${durationText}: <strong>${tar.value} min</strong>`;
      }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: { 
      type: 'value', 
      name: currentLang === 'en' ? 'Minutes' : 'Minuty' 
    },
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
        name: currentLang === 'en' ? 'Duration' : 'Czas trwania',
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
  }, [chartType, engine, dataToProcess, nameKey, startKey, endKey, currentLang]);

  return (
    <ChartSnippetWrapper 
      isDemo={isDemo}
      chartType={chartType}
      engine={engine}
      data={processedData} 
      options={chartOptions}
      lang={currentLang}
    >
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </ChartSnippetWrapper>
  );
};