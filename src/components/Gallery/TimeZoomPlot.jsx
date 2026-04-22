import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { t: '2023-01-01', v: 10 }, { t: '2023-01-02', v: 22 }, { t: '2023-01-03', v: 15 },
  { t: '2023-01-04', v: 34 }, { t: '2023-01-05', v: 12 }, { t: '2023-01-06', v: 45 },
  { t: '2023-01-07', v: 30 }, { t: '2023-01-08', v: 55 }, { t: '2023-01-09', v: 40 },
  { t: '2023-01-10', v: 48 }, { t: '2023-01-11', v: 32 }, { t: '2023-01-12', v: 60 }
];

const DEMO_OPTIONS = {
  timeKey: 't',
  valueKey: 'v'
};

export const TimeZoomPlot = ({ engine = 'echarts', chartType = 'line', rawData, options = {} }) => {
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
          setErrorMsg('Library did not return an HTML element.');
        }
      } catch (err) {
        console.error("Error in TimeZoomPlot:", err);
        setErrorMsg(err.message || 'Unknown library error');
      }
    }
  }, [chartType, engine, dataToProcess, timeKey, valueKey]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={dataToProcess} options={chartOptions}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>Error:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};