import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { date: '2024-01-01', value: 10 }, { date: '2024-01-02', value: 25 },
  { date: '2024-01-03', value: 15 }, { date: '2024-01-04', value: 30 },
  { date: '2024-01-05', value: 22 },
];

export const RangeTrend = ({ engine = 'apex', chartType = 'area', rawData, options = {} }) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const hasData = Array.isArray(rawData) && rawData.length > 0;
  const isDemo = !hasData;
  const dataToProcess = isDemo ? DEMO_DATA : rawData;

  const firstKey = hasData ? Object.keys(rawData[0])[1] : 'date';
  const secondKey = hasData ? Object.keys(rawData[0])[2] : 'value';

  const xKey = options.timeKey || options.xKey || (isDemo ? 'date' : firstKey);
  const yKey = options.valueKey || options.yKey || (isDemo ? 'value' : secondKey);

  useEffect(() => {
    if (window.makeplot && containerRef.current) {
      containerRef.current.innerHTML = '';
      setErrorMsg(null);
      try {
        const finalData = [{
          name: 'Value',
          data: dataToProcess.map(d => ({
            x: d[xKey] ? String(d[xKey]).trim() : 'N/A',
            y: isNaN(parseFloat(d[yKey])) ? 0 : parseFloat(d[yKey])
          }))
        }];

        const plot = window.makeplot(chartType, finalData, { ...options, series: finalData }, engine);
        if (plot) containerRef.current.appendChild(plot);
      } catch (err) {
        setErrorMsg(err.message);
      }
    }
  }, [rawData, xKey, yKey]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={dataToProcess} options={options}>
      {errorMsg && <div style={{ color: 'red', textAlign: 'center' }}>Error: {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};