import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { label: 'JavaScript', val: 45 },
  { label: 'TypeScript', val: 75 },
  { label: 'Python', val: 60 },
  { label: 'HTML/CSS', val: 30 },
  { label: 'Go', val: 20 },
];

const DEMO_OPTIONS = {
  categoryKey: 'label',
  valueKey: 'val'
};

export const ResourcePolar = ({ engine = 'chartjs', chartType = 'doughnut', rawData, options = {} }) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const isDemo = !rawData || rawData.length === 0;

  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const categoryKey = activeOptions.categoryKey || activeOptions.groupKey || 'category';
  const valueKey = activeOptions.valueKey || activeOptions.yKey || 'value';

  const labels = dataToProcess.map(d => d[categoryKey] ? String(d[categoryKey]).trim() : 'Unknown');
  const dataValues = dataToProcess.map(d => {
    const parsedY = parseFloat(d[valueKey]);
    return isNaN(parsedY) ? 0 : parsedY;
  });

  const finalData = {
    labels: labels,
    datasets: [
      {
        label: 'Size',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }
    ]
  };

  const { categoryKey: _, valueKey: __, ...safeOptions } = activeOptions;

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
          setErrorMsg('Library did not return an HTML element.');
        }
      } catch (err) {
        console.error("Error in ResourcePolar:", err);
        setErrorMsg(err.message || 'Unknown library error');
      }
    }
  }, [chartType, engine, dataToProcess, categoryKey, valueKey]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={finalData} options={chartOptions}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>Error:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};