import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { t: '2024-01-01', g: 'Alpha', v: 10 }, { t: '2024-01-01', g: 'Beta', v: 20 },
  { t: '2024-01-02', g: 'Alpha', v: 15 }, { t: '2024-01-02', g: 'Beta', v: 25 },
  { t: '2024-01-03', g: 'Alpha', v: 30 }, { t: '2024-01-03', g: 'Beta', v: 10 },
  { t: '2024-01-04', g: 'Alpha', v: 20 }, { t: '2024-01-04', g: 'Beta', v: 40 },
];

const DEMO_OPTIONS = {
  timeKey: 't',
  groupKey: 'g',
  valueKey: 'v'
};

export const StreamGraph = ({ engine = 'nivo', chartType = 'stream', rawData, options = {} }) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const isDemo = !rawData || rawData.length === 0;
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const timeKey = activeOptions.timeKey || 'time';
  const groupKey = activeOptions.groupKey || 'group';
  const valueKey = activeOptions.valueKey || 'value';

  const timePoints = Array.from(new Set(dataToProcess.map(d => String(d[timeKey] || ''))));
  const groups = Array.from(new Set(dataToProcess.map(d => String(d[groupKey] || ''))));

  const finalData = timePoints.map(t => {
    const row = { time: t };
    groups.forEach(g => {
      const match = dataToProcess.find(d => String(d[timeKey]) === t && String(d[groupKey]) === g);
      row[g] = match ? parseFloat(match[valueKey]) || 0 : 0;
    });
    return row;
  });

  const chartOptions = {
    keys: groups,
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: timeKey,
      legendOffset: 36
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: valueKey,
      legendOffset: -40
    },
    offsetType: 'silhouette',
    colors: { scheme: 'nivo' },
    ...activeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData.length > 0) {
      containerRef.current.innerHTML = '';
      setErrorMsg(null);
      try {
        const plotElement = window.makeplot(chartType, finalData, chartOptions, engine);
        if (plotElement) {
          containerRef.current.appendChild(plotElement);
          setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
        } else {
          setErrorMsg('Library did not return an HTML element.');
        }
      } catch (err) {
        console.error("Error in StreamGraph:", err);
        setErrorMsg(err.message || 'Unknown library error');
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, groupKey, valueKey]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={finalData} options={chartOptions}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>Error:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};