import React from 'react';
import { ResponsiveBump } from '@nivo/bump';

export const BumpChart = ({ data, config, lang }) => {
  if (!data || !config || !config.valueKey || !config.groupKey || !config.timeKey) return null;

  const { valueKey, groupKey, timeKey } = config;
  const translations = {
    pl: { label: 'Wartość' },
    en: { label: 'Value' }
  };
  const t = translations[lang] || translations.pl;

  const validData = data.filter(item => 
    item && item[timeKey] && item[groupKey] && item[valueKey] !== undefined
  );

  if (validData.length === 0) return null;

  const uniqueGroups = Array.from(new Set(validData.map(d => d[groupKey])));
  const chartData = uniqueGroups.map(group => ({
    id: group,
    data: validData.filter(d => d[groupKey] === group)
              .sort((a, b) => new Date(a[timeKey]) - new Date(b[timeKey]))
              .map(d => ({ 
                x: d[timeKey].toString().includes('T') ? d[timeKey].split('T')[0] : d[timeKey], 
                y: parseFloat(d[valueKey]) || 0 
              }))
  }));

  const timePointsCount = chartData[0]?.data.length || 0;
  const dynamicWidth = Math.max(timePointsCount * 80, 500);

  return (
    <div style={{ height: '100%', width: dynamicWidth + 'px' }}>
      <ResponsiveBump
        data={chartData}
        margin={{ top: 20, right: 100, bottom: 80, left: 80 }}
        lineWidth={3}
        activeLineWidth={6}
        pointSize={10}
        activePointSize={16}
        colors={{ scheme: 'nivo' }}
        useMesh={true}
        enableGridX={false}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: t.label,
          legendPosition: 'middle',
          legendOffset: -60,
          tickValues: 8
        }}
      />
    </div>
  );
};
