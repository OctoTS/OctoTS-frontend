import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { bumpData } from '../../data/mockData';

export const BumpChart = ({ data }) => {
  let finalData = bumpData;

  if (data) {
    const authors = Array.from(new Set(data.map(d => d.author)));
    
    finalData = authors.map(author => {
      const authorEntries = data
        .filter(d => d.author === author)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      return {
        id: author,
        data: authorEntries.map((d, index) => ({
          x: d.timestamp.split('T')[0], 
          y: d.lines_of_code
        }))
      };
    });
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveBump
        data={finalData}
        margin={{ top: 20, right: 100, bottom: 40, left: 60 }}
        lineWidth={3}
        activeLineWidth={6}
        pointSize={10}
        axisLeft={{ 
          tickSize: 5, 
          legend: data ? 'Liczba linii (LOC)' : 'Miejsce w rankingu', 
          legendPosition: 'middle', 
          legendOffset: -40 
        }}
        colors={{ scheme: 'nivo' }}
        useMesh={true}
        enableGridX={false}
      />
    </div>
  );
};
