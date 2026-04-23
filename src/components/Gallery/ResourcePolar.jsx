import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = {
  pl: [
    { etykieta: 'JavaScript', wartosc: 45 },
    { etykieta: 'TypeScript', wartosc: 75 },
    { etykieta: 'Python', wartosc: 60 },
    { etykieta: 'HTML/CSS', wartosc: 30 },
    { etykieta: 'Go', wartosc: 20 },
  ],
  en: [
    { label: 'JavaScript', val: 45 },
    { label: 'TypeScript', val: 75 },
    { label: 'Python', val: 60 },
    { label: 'HTML/CSS', val: 30 },
    { label: 'Go', val: 20 },
  ]
};

const DEMO_OPTIONS = {
  pl: { categoryKey: 'etykieta', valueKey: 'wartosc' },
  en: { categoryKey: 'label', valueKey: 'val' }
};

export const ResourcePolar = ({ 
  engine = 'chartjs', 
  chartType = 'doughnut', 
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

  const categoryKey = activeOptions.categoryKey || activeOptions.groupKey || 'category';
  const valueKey = activeOptions.valueKey || activeOptions.yKey || 'value';

  const fallbackCategory = currentLang === 'en' ? 'Unknown' : 'Nieznane';
  const datasetLabel = currentLang === 'en' ? 'Value' : 'Wartość';
  const errorPrefix = currentLang === 'en' ? 'Error' : 'Błąd';
  const errorNoElement = currentLang === 'en' ? 'Library did not return an HTML element.' : 'Biblioteka nie zwróciła elementu HTML.';
  const errorUnknown = currentLang === 'en' ? 'Unknown library error' : 'Nieznany błąd biblioteki';

  const groupedData = dataToProcess.reduce((acc, currentItem) => {
    const category = currentItem[categoryKey] ? String(currentItem[categoryKey]).trim() : fallbackCategory;
    let value = parseFloat(currentItem[valueKey]);
    
    if (isNaN(value)) value = 0;

    if (!acc[category]) {
      acc[category] = { sum: 0, count: 0 };
    }
    
    acc[category].sum += value;
    acc[category].count += 1;
    
    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const dataValues = labels.map(label => {
    const group = groupedData[label];
    return Number((group.sum / group.count).toFixed(2)); 
  });

  const finalData = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)'
        ]
      }
    ]
  };

  const { categoryKey: _, valueKey: __, ...safeOptions } = activeOptions;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
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
        console.error("Error in ResourcePolar:", err);
        setErrorMsg(err.message || errorUnknown);
      }
    }
  }, [chartType, engine, dataToProcess, categoryKey, valueKey, currentLang]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={finalData} options={chartOptions} lang={currentLang}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>{errorPrefix}:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%'}} />
    </ChartSnippetWrapper>
  );
};