import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
const data = Array.from({ length: 15 }, () => ({ JS: Math.random()*10, TS: Math.random()*20, Py: Math.random()*5 }));
export const StreamGraph = () => (
  <ResponsiveStream
    data={data}
    keys={['JS', 'TS', 'Py']}
    margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
    axisBottom={null}
    offsetType="silhouette"
    colors={{ scheme: 'nivo' }}
    fillOpacity={0.8}
  />
);
