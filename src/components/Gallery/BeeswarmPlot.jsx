import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { id: '1', kategoria: 'Zespół A', wynik: 45 },
    { id: '2', kategoria: 'Zespół A', wynik: 52 },
    { id: '3', kategoria: 'Zespół A', wynik: 48 },
    { id: '4', kategoria: 'Zespół A', wynik: 55 },
    { id: '5', kategoria: 'Zespół A', wynik: 42 },
    { id: '6', kategoria: 'Zespół B', wynik: 70 },
    { id: '7', kategoria: 'Zespół B', wynik: 75 },
    { id: '8', kategoria: 'Zespół B', wynik: 68 },
    { id: '9', kategoria: 'Zespół B', wynik: 72 },
    { id: '10', kategoria: 'Zespół B', wynik: 78 },
    { id: '11', kategoria: 'Zespół C', wynik: 90 },
    { id: '12', kategoria: 'Zespół C', wynik: 85 },
    { id: '13', kategoria: 'Zespół C', wynik: 88 },
    { id: '14', kategoria: 'Zespół C', wynik: 92 },
    { id: '15', kategoria: 'Zespół C', wynik: 82 },
  ],
  en: [
    { id: '1', category: 'Team A', score: 45 },
    { id: '2', category: 'Team A', score: 52 },
    { id: '3', category: 'Team A', score: 48 },
    { id: '4', category: 'Team A', score: 55 },
    { id: '5', category: 'Team A', score: 42 },
    { id: '6', category: 'Team B', score: 70 },
    { id: '7', category: 'Team B', score: 75 },
    { id: '8', category: 'Team B', score: 68 },
    { id: '9', category: 'Team B', score: 72 },
    { id: '10', category: 'Team B', score: 78 },
    { id: '11', category: 'Team C', score: 90 },
    { id: '12', category: 'Team C', score: 85 },
    { id: '13', category: 'Team C', score: 88 },
    { id: '14', category: 'Team C', score: 92 },
    { id: '15', category: 'Team C', score: 82 },
  ]
};

const DEMO_OPTIONS = {
  pl: { groupBy: 'kategoria', valueKey: 'wynik' },
  en: { groupBy: 'category', valueKey: 'score' }
};

export const BeeswarmPlot = ({ 
  engine = 'nivo', 
  chartType = 'swarmplot', 
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

  const sourceGroupKey = activeOptions.groupBy || 'group'; 
  const sourceValueKey = activeOptions.valueKey || 'value'; 

  const finalData = dataToProcess.map((item, index) => {
    let finalVal = parseFloat(item[sourceValueKey]);
    if (isNaN(finalVal)) finalVal = 0;
    
    const fallbackGroupVal = currentLang === 'en' ? 'Unknown' : 'Nieznana';
    const groupVal = item[sourceGroupKey] ? String(item[sourceGroupKey]).trim() : fallbackGroupVal;

    return {
      id: `${groupVal}-${item.id !== undefined ? item.id : index}`,
      nivo_group: groupVal,  
      nivo_value: finalVal   
    };
  });

  const groups = Array.from(new Set(finalData.map(d => d.nivo_group)));
  const { groupBy, valueKey, ...safeOptions } = activeOptions;

  const chartOptions = {
    groups: groups,
    groupBy: "nivo_group", 
    value: "nivo_value",  
    identity: "id",
    
    size: 8, 
    layout: 'vertical',
    margin: { top: 60, right: 60, bottom: 80, left: 60 },
    colors: { scheme: 'set2' },
    
    axisBottom: { 
      tickSize: 10, 
      tickPadding: 5, 
      tickRotation: 0, 
      legend: sourceGroupKey.toUpperCase(),
      legendPosition: 'middle', 
      legendOffset: 40 
    },
    axisLeft: {
      tickSize: 10, 
      tickPadding: 5, 
      tickRotation: 0, 
      legend: sourceValueKey.toUpperCase(),
      legendPosition: 'middle', 
      legendOffset: -40 
    },
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
  }, [chartType, engine, dataToProcess, sourceGroupKey, sourceValueKey]);

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