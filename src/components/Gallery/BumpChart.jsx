import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { bumpData } from '../../data/mockData';

export const BumpChart = ({ data, lang, dataLabel }) => {
  let finalData = bumpData;
  let chartWidth = '100%';
  let xRotation = 0;

  const translations = {
    pl: { ranking: 'Ranking' },
    en: { ranking: 'Ranking' }
  };
  const t = translations[lang] || translations.pl;

  if (data) {
    const authors = Array.from(new Set(data.map(d => d.author)));
    const timePoints = Array.from(new Set(data.map(d => d.timestamp.split('T')[0])));
    
    chartWidth = Math.max(timePoints.length * 80, 500) + 'px';
    xRotation = timePoints.length > 10 ? -45 : 0;

    finalData = authors.map(author => {
      const authorEntries = data
        .filter(d => d.author === author)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      return {
        id: author,
        data: authorEntries.map((d) => ({
          x: d.timestamp.split('T')[0],
          y: d[dataLabel]
        }))
      };
    });
  }

  return (
    <div style={{ height: '100%', width: chartWidth }}>
      <ResponsiveBump
        data={finalData}
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
          tickRotation: xRotation,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: data ? dataLabel : t.ranking,
          legendPosition: 'middle',
          legendOffset: -60,
          tickValues: data ? 8 : undefined,
          format: d => Math.abs(d) >= 1000 ? `${(d / 1000).toFixed(1)}k` : d
        }}
      />
    </div>
  );
};
