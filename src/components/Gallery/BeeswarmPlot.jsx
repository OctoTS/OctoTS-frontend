import React from 'react';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot';
import { swarmData } from '../../data/mockData';

export const BeeswarmPlot = () => (
    <ResponsiveSwarmPlot
      data={swarmData}
      groups={['Backend', 'Frontend', 'DevOps']}
      value="value"
      size={{ key: 'volume', values: [4, 20], sizes: [6, 20] }}
      forceStrength={4}
      simulationIterations={100}
      margin={{ top: 40, right: 40, bottom: 80, left: 50 }}
      axisBottom={{ tickSize: 10, tickPadding: 5, tickRotation: 0, legend: 'Activity Value', legendPosition: 'middle', legendOffset: 32 }}
    />
);
