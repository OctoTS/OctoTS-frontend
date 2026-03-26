// src/data/mockData.js

export const swarmData = Array.from({ length: 40 }, (_, i) => ({
  id: `id-${i}`,
  group: i % 3 === 0 ? "Backend" : i % 3 === 1 ? "Frontend" : "DevOps",
  value: Math.floor(Math.random() * 100),
  volume: Math.floor(Math.random() * 20 + 5),
}));

export const calendarData = Array.from({ length: 100 }, (_, i) => ({
  day: `2023-05-${((i % 25) + 1).toString().padStart(2, '0')}`,
  value: Math.floor(Math.random() * 400)
}));

export const longTermData = Array.from({ length: 100 }, (_, i) => ({
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
