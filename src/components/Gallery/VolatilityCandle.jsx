import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { czas: '2024-01-01', wartosc: 20 }, { czas: '2024-01-01', wartosc: 10 }, { czas: '2024-01-01', wartosc: 38 }, { czas: '2024-01-01', wartosc: 34 },
    { czas: '2024-01-02', wartosc: 34 }, { czas: '2024-01-02', wartosc: 50 }, { czas: '2024-01-02', wartosc: 30 }, { czas: '2024-01-02', wartosc: 35 },
    { czas: '2024-01-03', wartosc: 35 }, { czas: '2024-01-03', wartosc: 44 }, { czas: '2024-01-03', wartosc: 28 }, { czas: '2024-01-03', wartosc: 38 },
    { czas: '2024-01-04', wartosc: 38 }, { czas: '2024-01-04', wartosc: 42 }, { czas: '2024-01-04', wartosc: 30 }, { czas: '2024-01-04', wartosc: 33 },
  ],
  en: [
    { time: '2024-01-01', value: 20 }, { time: '2024-01-01', value: 10 }, { time: '2024-01-01', value: 38 }, { time: '2024-01-01', value: 34 },
    { time: '2024-01-02', value: 34 }, { time: '2024-01-02', value: 50 }, { time: '2024-01-02', value: 30 }, { time: '2024-01-02', value: 35 },
    { time: '2024-01-03', value: 35 }, { time: '2024-01-03', value: 44 }, { time: '2024-01-03', value: 28 }, { time: '2024-01-03', value: 38 },
    { time: '2024-01-04', value: 38 }, { time: '2024-01-04', value: 42 }, { time: '2024-01-04', value: 30 }, { time: '2024-01-04', value: 33 },
  ]
};

const DEMO_OPTIONS = {
  pl: { timeKey: 'czas', valueKey: 'wartosc' },
  en: { timeKey: 'time', valueKey: 'value' }
};

export const VolatilityCandle = ({ 
  engine = 'echarts', 
  chartType = 'candlestick', 
  rawData, 
  options = {},
  lang = 'pl'
}) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const currentLang = lang === 'en' ? 'en' : 'pl';
  const isDemo = !rawData || rawData.length === 0;
  const dataToProcess = isDemo ? DEMO_DATA[currentLang] : rawData;

  // Usuwamy puste stringi i nieważne wartości z wejściowego obiektu options
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS[currentLang] : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const timeKey = activeOptions.timeKey || activeOptions.xKey || (currentLang === 'en' ? 'time' : 'czas');
  const valueKey = activeOptions.valueKey || activeOptions.yKey || (currentLang === 'en' ? 'value' : 'wartosc');

  const fallbackUnknown = currentLang === 'en' ? 'Unknown' : 'Nieznany';
  const seriesName = currentLang === 'en' ? 'Volatility' : 'Zmienność';
  const errorPrefix = currentLang === 'en' ? 'Error' : 'Błąd';
  const errorNoElement = currentLang === 'en' ? 'Library did not return an HTML element.' : 'Biblioteka nie zwróciła elementu HTML.';
  const errorUnknown = currentLang === 'en' ? 'Unknown library error' : 'Nieznany błąd biblioteki';

  const grouped = {};
  dataToProcess.forEach(d => {
    const t = d[timeKey] ? String(d[timeKey]).trim() : fallbackUnknown;
    const v = parseFloat(d[valueKey]);
    if (!isNaN(v)) {
      if (!grouped[t]) grouped[t] = [];
      grouped[t].push(v);
    }
  });

  const categories = Object.keys(grouped);
  const seriesData = categories.map(t => {
    const vals = grouped[t];
    return [vals[0], vals[vals.length - 1], Math.min(...vals), Math.max(...vals)];
  });

  const chartOptions = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    xAxis: { type: 'category', data: categories },
    yAxis: { scale: true },
    series: [{
      name: seriesName,
      type: 'candlestick',
      data: seriesData,
      itemStyle: { color: '#ef5350', color0: '#26a69a', borderColor: '#ef5350', borderColor0: '#26a69a' }
    }],
    ...activeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && categories.length > 0) {
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
        console.error("Error in VolatilityCandle:", err);
        setErrorMsg(err.message || errorUnknown);
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, valueKey, currentLang]);

  return (
    <ChartSnippetWrapper 
      isDemo={isDemo} 
      chartType={chartType} 
      engine={engine} 
      data={dataToProcess} 
      options={chartOptions} 
      lang={currentLang}
    >
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>{errorPrefix}:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};