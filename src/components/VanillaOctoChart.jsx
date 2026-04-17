import React, { useEffect, useRef, useId } from 'react';

const VanillaOctoChart = ({ data, mapping, engine, type, chartId, title }) => {
  const chartRef = useRef(null);
  
  const reactId = useId().replace(/:/g, ""); 
  const uniqueChartId = `${chartId}-${reactId}`;

  useEffect(() => {
    if (typeof window.OctoTS === 'undefined' || !chartRef.current || !data) return;

    chartRef.current.id = uniqueChartId;

    const timeKey = mapping?.timeKey || 'timestamp';
    const groupKey = mapping?.groupKey || 'author';
    const valueKey = mapping?.valueKey || 'value';

    const labels = data.map(item => item[groupKey] || item[timeKey]);
    const dataValues = data.map(item => item[valueKey]);
    const timestampText = data.length > 0 && data[0][timeKey] ? `Dane dla: ${data[0][timeKey]}` : '';

    const config = {
      type: type,
      title: title,
      subtitle: timestampText,
      xAxisTitle: mapping?.groupKey || mapping?.timeKey || 'Kategoria',
      yAxisTitle: mapping?.valueKey || 'Wartość',
      labels: labels,
      data: dataValues
    };

    const chartInstance = window.OctoTS.makewykres(engine, uniqueChartId, config);

    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance && typeof chartInstance.resize === 'function') {
        chartInstance.resize();
      }
    });
    
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (chartInstance) {
        if (typeof chartInstance.destroy === 'function') chartInstance.destroy();
        if (typeof chartInstance.dispose === 'function') chartInstance.dispose();
      }
    };
  }, [data, mapping, engine, type, uniqueChartId, title]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '100%', minHeight: '350px' }}
    ></div>
  );
};

export default VanillaOctoChart;