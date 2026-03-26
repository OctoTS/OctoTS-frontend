import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
const data = [
  { subject: 'Performance', A: 120 }, { subject: 'Security', A: 98 },
  { subject: 'Coverage', A: 86 }, { subject: 'Stability', A: 99 }, { subject: 'Quality', A: 80 }
];
export const ProjectRadar = () => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar name="Project" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  </ResponsiveContainer>
);
