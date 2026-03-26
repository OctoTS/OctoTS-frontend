import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { bumpData } from '../../data/mockData';
export const BumpChart = () => (
  <ResponsiveBump
    data={bumpData}
    margin={{ top: 20, right: 100, bottom: 40, left: 60 }}
    lineWidth={3} activeLineWidth={6} pointSize={10}
    axisLeft={{ tickSize: 5, legend: 'Miejsce w rankingu', legendPosition: 'middle', legendOffset: -40 }}
  />
);
