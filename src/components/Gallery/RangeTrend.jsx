import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { data: '2024-01-01', wartosc: 10 }, { data: '2024-01-02', wartosc: 25 },
    { data: '2024-01-03', wartosc: 15 }, { data: '2024-01-04', wartosc: 30 },
    { data: '2024-01-05', wartosc: 22 },
  ],
  en: [
    { date: '2024-01-01', value: 10 }, { date: '2024-01-02', value: 25 },
    { date: '2024-01-03', value: 15 }, { date: '2024-01-04', value: 30 },
    { date: '2024-01-05', value: 22 },
  ]
};

const DEMO_OPTIONS = {
  pl: { xKey: 'data', yKey: 'wartosc' },
  en: { xKey: 'date', yKey: 'value' }
};

export const RangeTrend = ({ 
  engine = 'apex', 
  chartType = 'area', 
  rawData, 
  options = {}, 
  lang = 'pl' 
}) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const currentLang = lang === 'en' ? 'en' : 'pl';
  const hasData = Array.isArray(rawData) && rawData.length > 0;
  const isDemo = !hasData;
  
  const dataToProcess = isDemo ? DEMO_DATA[currentLang] : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS[currentLang] : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const fallbackXKey = hasData && Object.keys(rawData[0]).length > 0 ? Object.keys(rawData[0])[0] : 'date';
  const fallbackYKey = hasData && Object.keys(rawData[0]).length > 1 ? Object.keys(rawData[0])[1] : 'value';

  const xKey = activeOptions.timeKey || activeOptions.xKey || (isDemo ? DEMO_OPTIONS[currentLang].xKey : fallbackXKey);
  const yKey = activeOptions.valueKey || activeOptions.yKey || (isDemo ? DEMO_OPTIONS[currentLang].yKey : fallbackYKey);

  const fallbackNa = currentLang === 'en' ? 'N/A' : 'Brak';
  const seriesName = currentLang === 'en' ? 'Value' : 'Wartość';
  const errorPrefix = currentLang === 'en' ? 'Error' : 'Błąd';

  useEffect(() => {
    if (window.makeplot && containerRef.current) {
      containerRef.current.innerHTML = '';
      setErrorMsg(null);
      try {
        const finalData = [{
          name: seriesName,
          data: dataToProcess.map(d => ({
            x: d[xKey] ? String(d[xKey]).trim() : fallbackNa,
            y: isNaN(parseFloat(d[yKey])) ? 0 : parseFloat(d[yKey])
          }))
        }];

        const plot = window.makeplot(chartType, finalData, { ...activeOptions, series: finalData }, engine);
        if (plot) containerRef.current.appendChild(plot);
      } catch (err) {
        setErrorMsg(err.message);
      }
    }
  }, [chartType, engine, dataToProcess, xKey, yKey, activeOptions, seriesName, fallbackNa]);

  return (
    <ChartSnippetWrapper 
      isDemo={isDemo} 
      chartType={chartType} 
      engine={engine} 
      data={dataToProcess} 
      options={activeOptions}
      lang={currentLang}
    >
      {errorMsg && <div style={{ color: 'red', textAlign: 'center' }}>{errorPrefix}: {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};