import React, { useEffect, useRef } from 'react';

const DEMO_DATA = [
  { id: '1', category: 'Zespół A', score: 45 },
  { id: '2', category: 'Zespół A', score: 52 },
  { id: '3', category: 'Zespół A', score: 48 },
  { id: '4', category: 'Zespół A', score: 55 },
  { id: '5', category: 'Zespół A', score: 42 },
  { id: '6', category: 'Zespół B', score: 70 },
  { id: '7', category: 'Zespół B', score: 75 },
  { id: '8', category: 'Zespół B', score: 68 },
  { id: '9', category: 'Zespół B', score: 72 },
  { id: '10', category: 'Zespół B', score: 78 },
  { id: '11', category: 'Zespół C', score: 90 },
  { id: '12', category: 'Zespół C', score: 85 },
  { id: '13', category: 'Zespół C', score: 88 },
  { id: '14', category: 'Zespół C', score: 92 },
  { id: '15', category: 'Zespół C', score: 82 },
];

const DEMO_OPTIONS = {
  groupBy: 'category',
  valueKey: 'score'
};

export const BeeswarmPlot = ({ engine = 'nivo', chartType = 'swarmplot', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};

  const activeOptions = { ...baseOptions, ...cleanOptions };

  const sourceGroupKey = activeOptions.groupBy || 'group'; 
  const sourceValueKey = activeOptions.valueKey || 'value'; 

  const finalData = dataToProcess.map((item, index) => {
    let finalVal = parseFloat(item[sourceValueKey]);
    if (isNaN(finalVal)) finalVal = 0;
    
    const groupVal = item[sourceGroupKey] ? String(item[sourceGroupKey]).trim() : 'Nieznana';

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
        // Nasz hack na renderowanie
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, sourceGroupKey, sourceValueKey]);

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