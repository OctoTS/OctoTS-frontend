import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { czas: '2023-01-01', wartosc: 10 }, { czas: '2023-01-02', wartosc: 22 }, { czas: '2023-01-03', wartosc: 15 },
    { czas: '2023-01-04', wartosc: 34 }, { czas: '2023-01-05', wartosc: 12 }, { czas: '2023-01-06', wartosc: 45 },
    { czas: '2023-01-07', wartosc: 30 }, { czas: '2023-01-08', wartosc: 55 }, { czas: '2023-01-09', wartosc: 40 },
    { czas: '2023-01-10', wartosc: 48 }, { czas: '2023-01-11', wartosc: 32 }, { czas: '2023-01-12', wartosc: 60 }
  ],
  en: [
    { time: '2023-01-01', value: 10 }, { time: '2023-01-02', value: 22 }, { time: '2023-01-03', value: 15 },
    { time: '2023-01-04', value: 34 }, { time: '2023-01-05', value: 12 }, { time: '2023-01-06', value: 45 },
    { time: '2023-01-07', value: 30 }, { time: '2023-01-08', value: 55 }, { time: '2023-01-09', value: 40 },
    { time: '2023-01-10', value: 48 }, { time: '2023-01-11', value: 32 }, { time: '2023-01-12', value: 60 }
  ]
};

const DEMO_OPTIONS = {
  pl: { timeKey: 'czas', valueKey: 'wartosc' },
  en: { timeKey: 'time', valueKey: 'value' }
};

export const TimeZoomPlot = ({ 
  engine = 'echarts', 
  chartType = 'line', 
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

  const timeKey = activeOptions.timeKey || activeOptions.xKey || (currentLang === 'en' ? 'time' : 'czas');
  const valueKey = activeOptions.valueKey || activeOptions.yKey || (currentLang === 'en' ? 'value' : 'wartosc');

  const errorPrefix = currentLang === 'en' ? 'Error' : 'Błąd';
  const errorNoElement = currentLang === 'en' ? 'Library did not return an HTML element.' : 'Biblioteka nie zwróciła elementu HTML.';
  const errorUnknown = currentLang === 'en' ? 'Unknown library error' : 'Nieznany błąd biblioteki';

  const xData = dataToProcess.map(d => String(d[timeKey] || ''));
  const yData = dataToProcess.map(d => parseFloat(d[valueKey]) || 0);

  const chartOptions = {
    tooltip: { trigger: 'axis' },
    grid: { bottom: 80 },
    xAxis: { type: 'category', data: xData },
    yAxis: { type: 'value' },
    dataZoom: [
      { type: 'slider', start: 0, end: 100 },
      { type: 'inside', start: 0, end: 100 }
    ],
    series: [
      {
        data: yData,
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.1 }
      }
    ],
    ...activeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && xData.length > 0) {
      containerRef.current.innerHTML = '';
      setErrorMsg(null);
      try {
        const plotElement = window.makeplot(chartType, dataToProcess, chartOptions, engine);
        if (plotElement) {
          containerRef.current.appendChild(plotElement);
          setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
        } else {
          setErrorMsg(errorNoElement);
        }
      } catch (err) {
        console.error("Error in TimeZoomPlot:", err);
        setErrorMsg(err.message || errorUnknown);
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, valueKey, currentLang]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={dataToProcess} options={chartOptions} lang={currentLang}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>{errorPrefix}:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};