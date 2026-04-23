import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { czas: '2024-01-01', grupa: 'Alfa', wartosc: 10 }, { czas: '2024-01-01', grupa: 'Beta', wartosc: 20 },
    { czas: '2024-01-02', grupa: 'Alfa', wartosc: 15 }, { czas: '2024-01-02', grupa: 'Beta', wartosc: 25 },
    { czas: '2024-01-03', grupa: 'Alfa', wartosc: 30 }, { czas: '2024-01-03', grupa: 'Beta', wartosc: 10 },
    { czas: '2024-01-04', grupa: 'Alfa', wartosc: 20 }, { czas: '2024-01-04', grupa: 'Beta', wartosc: 40 },
  ],
  en: [
    { time: '2024-01-01', group: 'Alpha', value: 10 }, { time: '2024-01-01', group: 'Beta', value: 20 },
    { time: '2024-01-02', group: 'Alpha', value: 15 }, { time: '2024-01-02', group: 'Beta', value: 25 },
    { time: '2024-01-03', group: 'Alpha', value: 30 }, { time: '2024-01-03', group: 'Beta', value: 10 },
    { time: '2024-01-04', group: 'Alpha', value: 20 }, { time: '2024-01-04', group: 'Beta', value: 40 },
  ]
};

const DEMO_OPTIONS = {
  pl: { timeKey: 'czas', groupKey: 'grupa', valueKey: 'wartosc' },
  en: { timeKey: 'time', groupKey: 'group', valueKey: 'value' }
};

export const StreamGraph = ({ 
  engine = 'nivo', 
  chartType = 'stream', 
  rawData, 
  options = {},
  lang = 'pl'
}) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const currentLang = lang === 'en' ? 'en' : 'pl';
  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA[currentLang] : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS[currentLang] : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const timeKey = activeOptions.timeKey || (currentLang === 'en' ? 'time' : 'czas');
  const groupKey = activeOptions.groupKey || (currentLang === 'en' ? 'group' : 'grupa');
  const valueKey = activeOptions.valueKey || (currentLang === 'en' ? 'value' : 'wartosc');

  const errorPrefix = currentLang === 'en' ? 'Error' : 'Błąd';
  const errorNoElement = currentLang === 'en' ? 'Library did not return an HTML element.' : 'Biblioteka nie zwróciła elementu HTML.';
  const errorUnknown = currentLang === 'en' ? 'Unknown library error' : 'Nieznany błąd biblioteki';

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
          setErrorMsg(errorNoElement);
        }
      } catch (err) {
        console.error("Error in StreamGraph:", err);
        setErrorMsg(err.message || errorUnknown);
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, groupKey, valueKey, currentLang]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={finalData} options={chartOptions} lang={currentLang}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>{errorPrefix}:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};