import React, { useEffect, useRef } from 'react';

const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
const DEMO_DATA = [];
days.forEach((day, dayIndex) => {
  for (let hour = 0; hour < 24; hour++) {
    DEMO_DATA.push({
      day: day,
      hour: `${hour}h`,
      activity: Math.round(((Math.sin(hour / 3) + 1) * 3) + (dayIndex % 2 === 0 ? 2 : 0))
    });
  }
});

const DEMO_OPTIONS = {
  yKey: 'day',
  xKey: 'hour',
  valueKey: 'activity'
};

export const HourlyCycle = ({ engine = 'echarts', chartType = 'heatmap', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const activeOptions = isDemo && Object.keys(options).length === 0 ? DEMO_OPTIONS : { ...DEMO_OPTIONS, ...options };

  const yKey = activeOptions.yKey || 'day';
  const xKey = activeOptions.xKey || 'hour';
  const valueKey = activeOptions.valueKey || 'value';

  const xCategories = Array.from({length: 24}, (_, i) => i + 'h');
  const yCategories = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].reverse();

  const finalData = dataToProcess.map(d => {
    const xIdx = xCategories.indexOf(String(d[xKey]));
    const yIdx = yCategories.indexOf(String(d[yKey]));
    const val = parseFloat(d[valueKey]);

    return [
      xIdx !== -1 ? xIdx : 0, 
      yIdx !== -1 ? yIdx : 0, 
      isNaN(val) ? 0 : val
    ];
  });

  const { yKey: _, xKey: __, valueKey: ___, ...safeOptions } = activeOptions;

  const chartOptions = {
    tooltip: { position: 'top' },
    grid: { height: '65%', top: '5%', bottom: '25%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: xCategories, 
      splitArea: { show: true }
    },
    yAxis: { 
      type: 'category', 
      data: yCategories, 
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%', 
      inRange: { color: ['#ebf5fb', '#3498db'] }
    },
    series: [{
      name: 'Aktywność',
      type: 'heatmap',
      data: finalData, 
      label: { show: false },
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }],
    ...safeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData.length > 0) {
      containerRef.current.innerHTML = '';
      
      const plotElement = window.makeplot(chartType, finalData, chartOptions, engine);
      
      if (plotElement) {
        containerRef.current.appendChild(plotElement);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, yKey, xKey, valueKey]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isDemo && (
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          background: 'rgba(0,0,0,0.05)', color: '#666',
          padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
        }}>
          Tryb Demo
        </div>
      )}
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};