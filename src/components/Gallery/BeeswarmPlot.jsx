import React from 'react';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot';

export const BeeswarmPlot = ({ data, config, lang }) => {
  if (!data || !config || !config.valueKey || !config.groupKey) return null;

  const { valueKey, groupKey } = config;
  const translations = {
    pl: { author: 'Grupa', activity: 'Wartość' },
    en: { author: 'Group', activity: 'Value' }
  };
  const t = translations[lang] || translations.pl;

  const validData = data.filter(item => 
    item && item[groupKey] !== undefined && item[valueKey] !== undefined
  );

  if (validData.length === 0) return null;

  const chartData = validData.map((item, index) => ({
    id: `${item[groupKey]}-${index}`,
    group: item[groupKey],
    value: parseFloat(item[valueKey]) || 0,
    volume: parseFloat(item[valueKey]) || 0
  }));

  const groups = Array.from(new Set(chartData.map(d => d.group)));
  const metricValues = chartData.map(d => d.value);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveSwarmPlot
        data={chartData}
        groups={groups}
        value="value"
        size={{ 
          key: 'volume', 
          values: [Math.min(...metricValues), Math.max(...metricValues)], 
          sizes: [6, 20] 
        }}
        forceStrength={4}
        simulationIterations={100}
        margin={{ top: 40, right: 40, bottom: 80, left: 50 }}
        axisBottom={{ 
          tickSize: 10, 
          tickPadding: 5, 
          tickRotation: 0, 
          legend: t.author, 
          legendPosition: 'middle', 
          legendOffset: 32 
        }}
      />
    </div>
  );
};
