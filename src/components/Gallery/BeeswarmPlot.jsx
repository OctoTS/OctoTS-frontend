import React from 'react';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot';
import { swarmData } from '../../data/mockData';

export const BeeswarmPlot = ({ data, lang, dataLabel }) => {
  const translations = {
    pl: { author: 'Autor', activity: 'Wartość aktywności' },
    en: { author: 'Author', activity: 'Activity Value' }
  };

  const t = translations[lang] || translations.pl;

  const finalData = data ? data.map((item, index) => ({
    id: `${item.author}-${index}`,
    group: item.author,
    value: item[dataLabel],
    volume: item[dataLabel]
  })) : swarmData;

  const allValues = finalData.map(d => d.volume);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const groups = data 
    ? Array.from(new Set(data.map(d => d.author))) 
    : ['Backend', 'Frontend', 'DevOps'];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveSwarmPlot
        data={finalData}
        groups={groups}
        value="value"
        size={{ 
          key: 'volume', 
          values: [minValue, maxValue], 
          sizes: [6, 20] 
        }}
        forceStrength={4}
        simulationIterations={100}
        margin={{ top: 40, right: 40, bottom: 80, left: 50 }}
        axisBottom={{ 
          tickSize: 10, 
          tickPadding: 5, 
          tickRotation: 0, 
          legend: data ? t.author : t.activity, 
          legendPosition: 'middle', 
          legendOffset: 32 
        }}
      />
    </div>
  );
};
