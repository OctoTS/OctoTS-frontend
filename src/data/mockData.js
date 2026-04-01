// src/data/mockData.js

export const swarmData = Array.from({ length: 40 }, (_, i) => ({
  id: `id-${i}`,
  group: i % 3 === 0 ? "Backend" : i % 3 === 1 ? "Frontend" : "DevOps",
  value: Math.floor(Math.random() * 100),
  volume: Math.floor(Math.random() * 20 + 5),
}));

export const calendarData = Array.from({ length: 100 }, (_, i) => ({
  day: `2025-05-${((i % 50) + 2).toString().padStart(2, '0')}`,
  value: Math.floor(Math.random() * 400)
}));

export const longTermData = Array.from({ length: 400 }, (_, i) => ({
  date: new Date(2023, 0, i).toISOString().split('T')[0],
  value: Math.floor(500 + Math.random() * 1000)
}));

export const streamData = Array.from({ length: 20 }, () => ({
  "Moduł A": Math.random() * 10,
  "Moduł B": Math.random() * 20,
  "Moduł C": Math.random() * 15
}));

export const bumpData = [
  { id: 'Zadania A', data: [{ x: 'T1', y: 1 }, { x: 'T2', y: 2 }, { x: 'T3', y: 1 }] },
  { id: 'Zadania B', data: [{ x: 'T1', y: 2 }, { x: 'T2', y: 1 }, { x: 'T3', y: 3 }] },
  { id: 'Zadania C', data: [{ x: 'T1', y: 3 }, { x: 'T2', y: 3 }, { x: 'T3', y: 2 }] }
];

export const timelineData = [
  { name: 'Analiza', start: 0, end: 10 },
  { name: 'Budowanie', start: 10, end: 35 },
  { name: 'Testowanie', start: 35, end: 80 },
  { name: 'Wdrażanie', start: 80, end: 100 }
];

export const hourlyData = [];
for (let day = 0; day < 7; day++) {
  for (let hour = 0; hour < 24; hour++) {
    hourlyData.push([hour, day, Math.floor(Math.random() * 10)]);
  }
}

export const candleVolatilityData = [
  { x: new Date('2025-01-01').getTime(), y: [120, 150, 100, 140] },
  { x: new Date('2025-01-02').getTime(), y: [140, 180, 130, 170] },
  { x: new Date('2025-01-03').getTime(), y: [170, 210, 150, 190] },
  { x: new Date('2025-01-04').getTime(), y: [190, 200, 180, 185] },
  { x: new Date('2025-01-05').getTime(), y: [185, 250, 180, 230] },
];


export const statusRadarData = {
  labels: ['Build Speed', 'Code Coverage', 'Code Size', 'Documentation', 'Test Pass Rate'],
  datasets: [
    {
      label: 'January Metrics',
      data: [85, 40, 90, 50, 95],
      backgroundColor: 'rgba(100, 108, 255, 0.2)',
      borderColor: '#646cff',
      pointBackgroundColor: '#646cff',
    },
    {
      label: 'February Metrics',
      data: [95, 60, 85, 80, 98],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: '#ff6384',
      pointBackgroundColor: '#ff6384',
    }
  ],
};

export const moduleTreeData = [{
  data: [
    { x: 'Frontend', y: 450 }, { x: 'Backend', y: 320 },
    { x: 'Infrastructure', y: 150 }, { x: 'Docs', y: 80 },
    { x: 'Tests', y: 240 }, { x: 'Shared', y: 110 }
  ]
}];

export const resourcePolarData = {
  labels: ['JS/TS', 'Styles', 'Assets', 'Config', 'Library'],
  datasets: [{
    data: [70, 15, 10, 5, 20],
    backgroundColor: ['#646cff88', '#ff638488', '#ffcd5688', '#4bc1c288', '#9966ff88']
  }]
};


export const efficiencyScatterData = {
  datasets: [{
    label: 'PR Analysis',
    data: [
      { x: 100, y: 2 }, { x: 500, y: 10 }, { x: 1000, y: 25 },
      { x: 200, y: 5 }, { x: 800, y: 18 }, { x: 1200, y: 40 }
    ],
    backgroundColor: '#646cff'
  }]
};

export const netChangeData = [
  { name: 'Added', data: [40, 55, 60, 90, 45, 30, 80] },
  { name: 'Removed', data: [-20, -10, -35, -50, -15, -40, -20] }
];

export const rangeMetricsData = [
  { x: '2025-01-01', y: [1100, 1300] },
  { x: '2025-01-02', y: [1200, 1450] },
  { x: '2025-01-03', y: [1250, 1600] },
  { x: '2025-01-04', y: [1300, 1550] },
  { x: '2025-01-05', y: [1400, 1800] },
  { x: '2025-01-06', y: [1450, 1700] },
  { x: '2025-01-07', y: [1500, 1900] }
];

export const stepDependencyData = {
  labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6'],
  datasets: [{
    label: 'External Dependencies',
    data: [12, 12, 15, 18, 18, 24],
    borderColor: '#646cff',
    backgroundColor: 'rgba(100, 108, 255, 0.1)',
    stepped: true,
    fill: true,
  }]
};
