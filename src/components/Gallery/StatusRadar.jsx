import React, { useEffect, useRef } from 'react';
import { ChartSnippetWrapper } from '../ChartSnippetWrapper';

const DEMO_DATA = [
  { category: 'Development', score: 80 },
  { category: 'Testing', score: 65 },
  { category: 'Design', score: 90 },
  { category: 'DevOps', score: 75 },
  { category: 'Management', score: 85 },
];

const DEMO_OPTIONS = {
  categoryKey: 'category',
  valueKey: 'score'
};

export const StatusRadar = ({ engine = 'chartjs', chartType = 'radar', rawData, options = {} }) => {
  const containerRef = useRef(null);

  const isDemo = !rawData || rawData.length === 0;

  const dataToProcess = isDemo ? DEMO_DATA : rawData;
  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );

  const baseOptions = isDemo ? DEMO_OPTIONS : {};
  const activeOptions = { ...baseOptions, ...cleanOptions };

  const categoryKey = activeOptions.categoryKey || activeOptions.groupKey || 'category';
  const valueKey = activeOptions.valueKey || 'value';

  // Chart.js dla Radaru oczekuje { labels: [...], datasets: [...] }
  const labels = dataToProcess.map(d => d[categoryKey] ? String(d[categoryKey]).trim() : 'Brak');
  const dataValues = dataToProcess.map(d => {
    const parsedY = parseFloat(d[valueKey]);
    return isNaN(parsedY) ? 0 : parsedY;
  });

  const finalData = {
    labels: labels,
    datasets: [
      {
        label: 'Status',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#3498db',
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3498db'
      }
    ]
  };

  const { categoryKey: _, valueKey: __, ...safeOptions } = activeOptions;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#888' },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    },
    ...safeOptions
  };

  useEffect(() => {
    if (window.makeplot && containerRef.current && finalData.labels.length > 0) {
      containerRef.current.innerHTML = '';

      const plotElement = window.makeplot(chartType, finalData, chartOptions, engine);

      if (plotElement) {
        containerRef.current.appendChild(plotElement);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      }
    }
  }, [chartType, engine, dataToProcess, categoryKey, valueKey]);

  return (
    <ChartSnippetWrapper
      isDemo={isDemo}
      chartType={chartType}
      engine={engine}
      data={finalData}
      options={chartOptions}
    >
      <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '300px' }} />
    </ChartSnippetWrapper>
  );
};