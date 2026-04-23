import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { czas: '10:00', wartosc: 1 },
    { czas: '11:00', wartosc: 3 },
    { czas: '12:00', wartosc: 3 },
    { czas: '13:00', wartosc: 5 },
    { czas: '14:00', wartosc: 2 },
    { czas: '15:00', wartosc: 6 },
  ],
  en: [
    { time: '10:00', value: 1 },
    { time: '11:00', value: 3 },
    { time: '12:00', value: 3 },
    { time: '13:00', value: 5 },
    { time: '14:00', value: 2 },
    { time: '15:00', value: 6 },
  ]
};

const DEMO_OPTIONS = {
  pl: { timeKey: 'czas', valueKey: 'wartosc' },
  en: { timeKey: 'time', valueKey: 'value' }
};

export const StepEvolution = ({ 
  engine = 'chartjs', 
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

  const timeKey = activeOptions.timeKey || activeOptions.xKey || 'time';
  const valueKey = activeOptions.valueKey || activeOptions.yKey || 'value';

  const fallbackText = currentLang === 'en' ? 'Unknown' : 'Nieznany';
  const datasetLabel = currentLang === 'en' ? 'Step Evolution' : 'Ewolucja krokowa';
  const errorPrefix = currentLang === 'en' ? 'Error' : 'Błąd';
  const errorNoElement = currentLang === 'en' ? 'Library did not return an HTML element.' : 'Biblioteka nie zwróciła elementu HTML.';
  const errorUnknown = currentLang === 'en' ? 'Unknown library error' : 'Nieznany błąd biblioteki';

  const labels = dataToProcess.map(d => d[timeKey] ? String(d[timeKey]).trim() : fallbackText);
  const dataValues = dataToProcess.map(d => {
    const parsedY = parseFloat(d[valueKey]);
    return isNaN(parsedY) ? 0 : parsedY;
  });

  const finalData = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: dataValues,
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        stepped: true,
        fill: true,
        borderWidth: 2
      }
    ]
  };

  const { timeKey: _, valueKey: __, ...safeOptions } = activeOptions;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    ...safeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData.labels.length > 0) {
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
        console.error("Error in StepEvolution:", err);
        setErrorMsg(err.message || errorUnknown);
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, valueKey, currentLang]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={finalData} options={chartOptions} lang={currentLang}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>{errorPrefix}:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};