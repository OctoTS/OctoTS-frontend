import React, { useEffect, useRef, useState } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { t: '2024-01-01', v: 20 }, { t: '2024-01-01', v: 10 }, { t: '2024-01-01', v: 38 }, { t: '2024-01-01', v: 34 },
  { t: '2024-01-02', v: 34 }, { t: '2024-01-02', v: 50 }, { t: '2024-01-02', v: 30 }, { t: '2024-01-02', v: 35 },
  { t: '2024-01-03', v: 35 }, { t: '2024-01-03', v: 44 }, { t: '2024-01-03', v: 28 }, { t: '2024-01-03', v: 38 },
  { t: '2024-01-04', v: 38 }, { t: '2024-01-04', v: 42 }, { t: '2024-01-04', v: 30 }, { t: '2024-01-04', v: 33 },
];

export const VolatilityCandle = ({ engine = 'echarts', chartType = 'candlestick', rawData, options = {} }) => {
  const containerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const hasData = Array.isArray(rawData) && rawData.length > 0;
  const isDemo = !hasData;
  const dataToProcess = isDemo ? DEMO_DATA : rawData;

  const timeKey = options.xKey || options.timeKey || (isDemo ? 't' : '');
  const valueKey = options.valueKey || options.yKey || (isDemo ? 'v' : '');

  useEffect(() => {
    if (window.makeplot && containerRef.current) {
      if (!isDemo && (!timeKey || !valueKey)) return;

      containerRef.current.innerHTML = '';
      setErrorMsg(null);

      try {
        const grouped = {};
        dataToProcess.forEach(d => {
          const t = d[timeKey] ? String(d[timeKey]).trim() : 'Unknown';
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
            name: 'Volatility',
            type: 'candlestick',
            data: seriesData,
            itemStyle: { color: '#ef5350', color0: '#26a69a', borderColor: '#ef5350', borderColor0: '#26a69a' }
          }]
        };

        const plot = window.makeplot(chartType, dataToProcess, chartOptions, engine);
        if (plot) {
          containerRef.current.appendChild(plot);
          setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message);
      }
    }
  }, [rawData, timeKey, valueKey, chartType, engine]);

  return (
    <ChartSnippetWrapper isDemo={isDemo} chartType={chartType} engine={engine} data={dataToProcess} options={options}>
      {errorMsg && <div style={{ color: '#ff4444', padding: '1rem', textAlign: 'center' }}><strong>Error:</strong> {errorMsg}</div>}
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};