import React, { useEffect, useRef } from 'react';

const VanillaOctoChart = ({ data, mapping, engine, type, chartId, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof window.OctoTS === 'undefined' || !chartRef.current || !data) return;

    chartRef.current.id = chartId;

    const timeKey = mapping.timeKey || 'timestamp';
    const groupKey = mapping.groupKey || 'author';
    const valueKey = mapping.valueKey || 'value';

    const labels = data.map(item => item[groupKey] || item[timeKey]);
    const dataValues = data.map(item => item[valueKey]);
    
    const timestampText = data.length > 0 && data[0][timeKey] ? `Dane dla: ${data[0][timeKey]}` : '';

    const config = {
      type: type,
      title: title,
      subtitle: timestampText,
      xAxisTitle: mapping.groupKey || mapping.timeKey || 'Kategoria',
      yAxisTitle: mapping.valueKey || 'Wartość',
      labels: labels,
      data: dataValues
    };

    const chartInstance = window.OctoTS.makewykres(engine, chartId, config);

    return () => {
      if (chartInstance) {
        if (typeof chartInstance.destroy === 'function') chartInstance.destroy();
        if (typeof chartInstance.dispose === 'function') chartInstance.dispose();
      }
    };
  }, [data, mapping, engine, type, chartId, title]);

  return <div ref={chartRef} style={{ width: '100%', height: '350px' }}></div>;
};

export default VanillaOctoChart;