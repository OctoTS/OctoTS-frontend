import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { t: '10:00', v: 1 },
  { t: '11:00', v: 3 },
  { t: '12:00', v: 3 },
  { t: '13:00', v: 5 },
  { t: '14:00', v: 2 },
  { t: '15:00', v: 6 },
];

const DEMO_OPTIONS = {
  timeKey: 't',
  valueKey: 'v'
};

export const StepEvolution = ({ engine = 'chartjs', chartType = 'line', rawData, options = {} }) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const isDemo = !rawData || rawData.length === 0;

  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const timeKey = activeOptions.timeKey || activeOptions.xKey || 'time';
  const valueKey = activeOptions.valueKey || activeOptions.yKey || 'value';

  const labels = dataToProcess.map(d => d[timeKey] ? String(d[timeKey]).trim() : 'Unknown');
  const dataValues = dataToProcess.map(d => {
    const parsedY = parseFloat(d[valueKey]);
    return isNaN(parsedY) ? 0 : parsedY;
  });

  const finalData = {
    labels: labels,
    datasets: [
      {
        label: 'Step Evolution',
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
          setErrorMsg('Library did not return an HTML element.');
        }
      } catch (err) {
        console.error("Error in StepEvolution:", err);
        setErrorMsg(err.message || 'Unknown library error');
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, valueKey]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={finalData} options={chartOptions}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>Error:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};