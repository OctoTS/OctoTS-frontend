import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const daysPL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
const daysEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DEMO_DATA = { pl: [], en: [] };

daysPL.forEach((day, dayIndex) => {
  for (let hour = 0; hour < 24; hour++) {
    const activity = Math.round(((Math.sin(hour / 3) + 1) * 3) + (dayIndex % 2 === 0 ? 2 : 0));
    
    DEMO_DATA.pl.push({ 
      dzien: day, 
      godzina: `${hour}h`, 
      aktywnosc: activity 
    });
    
    DEMO_DATA.en.push({ 
      day: daysEN[dayIndex], 
      hour: `${hour}h`, 
      activity: activity 
    });
  }
});

const DEMO_OPTIONS = {
  pl: { yKey: 'dzien', xKey: 'godzina', valueKey: 'aktywnosc' },
  en: { yKey: 'day', xKey: 'hour', valueKey: 'activity' }
};

export const HourlyCycle = ({ 
  engine = 'echarts', 
  chartType = 'heatmap', 
  rawData, 
  options = {}, 
  lang = 'pl' 
}) => {
  const containerRef = useRef(null);

  const currentLang = lang === 'en' ? 'en' : 'pl';
  const isDemo = !rawData || rawData.length === 0;
  
  const dataToProcess = isDemo ? DEMO_DATA[currentLang] : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS[currentLang] : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const yKey = activeOptions.yKey || 'day';
  const xKey = activeOptions.xKey || 'hour';
  const valueKey = activeOptions.valueKey || 'value';

  const xCategories = Array.from({length: 24}, (_, i) => i + 'h');
  
  const baseDays = currentLang === 'en' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
    : ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
    
  const yCategories = [...baseDays].reverse();

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
      name: currentLang === 'en' ? 'Activity' : 'Aktywność',
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
  }, [chartType, engine, dataToProcess, yKey, xKey, valueKey, currentLang]);

  return (
    <ChartSnippetWrapper 
      isDemo={isDemo}
      chartType={chartType}
      engine={engine}
      data={finalData}
      options={chartOptions}
      lang={currentLang}
    >
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </ChartSnippetWrapper>
  );
};