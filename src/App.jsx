import React, { useState } from 'react';
import './App.css';
import ChartCard from './components/ChartCard';
import { ChartSnippetWrapper } from './components/ChartSnippetWrapper';
import OctoPlotRenderer from './components/OctoPlotRenderer';

const DEMO_DATA = [
  { "timestamp": "2026-04-01T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-01T12:00:00Z", "miasto": "Kraków", "temperatura": 16 },
  { "timestamp": "2026-04-01T12:00:00Z", "miasto": "Wrocław", "temperatura": 17 },
  { "timestamp": "2026-04-01T12:00:00Z", "miasto": "Poznań", "temperatura": 14 },
  { "timestamp": "2026-04-01T12:00:00Z", "miasto": "Gdańsk", "temperatura": 12 },
  { "timestamp": "2026-04-02T12:00:00Z", "miasto": "Warszawa", "temperatura": 16 },
  { "timestamp": "2026-04-02T12:00:00Z", "miasto": "Kraków", "temperatura": 15 },
  { "timestamp": "2026-04-02T12:00:00Z", "miasto": "Wrocław", "temperatura": 18 },
  { "timestamp": "2026-04-02T12:00:00Z", "miasto": "Poznań", "temperatura": 15 },
  { "timestamp": "2026-04-02T12:00:00Z", "miasto": "Gdańsk", "temperatura": 11 },
  { "timestamp": "2026-04-03T12:00:00Z", "miasto": "Warszawa", "temperatura": 14 },
  { "timestamp": "2026-04-03T12:00:00Z", "miasto": "Kraków", "temperatura": 17 },
  { "timestamp": "2026-04-03T12:00:00Z", "miasto": "Wrocław", "temperatura": 16 },
  { "timestamp": "2026-04-03T12:00:00Z", "miasto": "Poznań", "temperatura": 13 },
  { "timestamp": "2026-04-03T12:00:00Z", "miasto": "Gdańsk", "temperatura": 13 },
  { "timestamp": "2026-04-04T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-04T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-04T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-04T12:00:00Z", "miasto": "Poznań", "temperatura": 14 },
  { "timestamp": "2026-04-04T12:00:00Z", "miasto": "Gdańsk", "temperatura": 14 },
  { "timestamp": "2026-04-05T12:00:00Z", "miasto": "Warszawa", "temperatura": 17 },
  { "timestamp": "2026-04-05T12:00:00Z", "miasto": "Kraków", "temperatura": 19 },
  { "timestamp": "2026-04-05T12:00:00Z", "miasto": "Wrocław", "temperatura": 20 },
  { "timestamp": "2026-04-05T12:00:00Z", "miasto": "Poznań", "temperatura": 16 },
  { "timestamp": "2026-04-05T12:00:00Z", "miasto": "Gdańsk", "temperatura": 15 },
  { "timestamp": "2026-04-06T12:00:00Z", "miasto": "Warszawa", "temperatura": 18 },
  { "timestamp": "2026-04-06T12:00:00Z", "miasto": "Kraków", "temperatura": 20 },
  { "timestamp": "2026-04-06T12:00:00Z", "miasto": "Wrocław", "temperatura": 21 },
  { "timestamp": "2026-04-06T12:00:00Z", "miasto": "Poznań", "temperatura": 17 },
  { "timestamp": "2026-04-06T12:00:00Z", "miasto": "Gdańsk", "temperatura": 16 },
  { "timestamp": "2026-04-07T12:00:00Z", "miasto": "Warszawa", "temperatura": 16 },
  { "timestamp": "2026-04-07T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-07T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-07T12:00:00Z", "miasto": "Poznań", "temperatura": 15 },
  { "timestamp": "2026-04-07T12:00:00Z", "miasto": "Gdańsk", "temperatura": 14 },
  { "timestamp": "2026-04-08T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-08T12:00:00Z", "miasto": "Kraków", "temperatura": 16 },
  { "timestamp": "2026-04-08T12:00:00Z", "miasto": "Wrocław", "temperatura": 17 },
  { "timestamp": "2026-04-08T12:00:00Z", "miasto": "Poznań", "temperatura": 14 },
  { "timestamp": "2026-04-08T12:00:00Z", "miasto": "Gdańsk", "temperatura": 12 },
  { "timestamp": "2026-04-09T12:00:00Z", "miasto": "Warszawa", "temperatura": 14 },
  { "timestamp": "2026-04-09T12:00:00Z", "miasto": "Kraków", "temperatura": 15 },
  { "timestamp": "2026-04-09T12:00:00Z", "miasto": "Wrocław", "temperatura": 16 },
  { "timestamp": "2026-04-09T12:00:00Z", "miasto": "Poznań", "temperatura": 13 },
  { "timestamp": "2026-04-09T12:00:00Z", "miasto": "Gdańsk", "temperatura": 11 },
  { "timestamp": "2026-04-10T12:00:00Z", "miasto": "Warszawa", "temperatura": 12 },
  { "timestamp": "2026-04-10T12:00:00Z", "miasto": "Kraków", "temperatura": 14 },
  { "timestamp": "2026-04-10T12:00:00Z", "miasto": "Wrocław", "temperatura": 15 },
  { "timestamp": "2026-04-10T12:00:00Z", "miasto": "Poznań", "temperatura": 12 },
  { "timestamp": "2026-04-10T12:00:00Z", "miasto": "Gdańsk", "temperatura": 10 },
  { "timestamp": "2026-04-11T12:00:00Z", "miasto": "Warszawa", "temperatura": 13 },
  { "timestamp": "2026-04-11T12:00:00Z", "miasto": "Kraków", "temperatura": 15 },
  { "timestamp": "2026-04-11T12:00:00Z", "miasto": "Wrocław", "temperatura": 16 },
  { "timestamp": "2026-04-11T12:00:00Z", "miasto": "Poznań", "temperatura": 13 },
  { "timestamp": "2026-04-11T12:00:00Z", "miasto": "Gdańsk", "temperatura": 11 },
  { "timestamp": "2026-04-12T12:00:00Z", "miasto": "Warszawa", "temperatura": 14 },
  { "timestamp": "2026-04-12T12:00:00Z", "miasto": "Kraków", "temperatura": 16 },
  { "timestamp": "2026-04-12T12:00:00Z", "miasto": "Wrocław", "temperatura": 17 },
  { "timestamp": "2026-04-12T12:00:00Z", "miasto": "Poznań", "temperatura": 14 },
  { "timestamp": "2026-04-12T12:00:00Z", "miasto": "Gdańsk", "temperatura": 12 },
  { "timestamp": "2026-04-13T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-13T12:00:00Z", "miasto": "Kraków", "temperatura": 17 },
  { "timestamp": "2026-04-13T12:00:00Z", "miasto": "Wrocław", "temperatura": 18 },
  { "timestamp": "2026-04-13T12:00:00Z", "miasto": "Poznań", "temperatura": 15 },
  { "timestamp": "2026-04-13T12:00:00Z", "miasto": "Gdańsk", "temperatura": 13 },
  { "timestamp": "2026-04-14T12:00:00Z", "miasto": "Warszawa", "temperatura": 16 },
  { "timestamp": "2026-04-14T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-14T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-14T12:00:00Z", "miasto": "Poznań", "temperatura": 16 },
  { "timestamp": "2026-04-14T12:00:00Z", "miasto": "Gdańsk", "temperatura": 14 },
  { "timestamp": "2026-04-15T12:00:00Z", "miasto": "Warszawa", "temperatura": 17 },
  { "timestamp": "2026-04-15T12:00:00Z", "miasto": "Kraków", "temperatura": 19 },
  { "timestamp": "2026-04-15T12:00:00Z", "miasto": "Wrocław", "temperatura": 20 },
  { "timestamp": "2026-04-15T12:00:00Z", "miasto": "Poznań", "temperatura": 17 },
  { "timestamp": "2026-04-15T12:00:00Z", "miasto": "Gdańsk", "temperatura": 15 },
  { "timestamp": "2026-04-16T12:00:00Z", "miasto": "Warszawa", "temperatura": 18 },
  { "timestamp": "2026-04-16T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-16T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-16T12:00:00Z", "miasto": "Poznań", "temperatura": 16 },
  { "timestamp": "2026-04-16T12:00:00Z", "miasto": "Gdańsk", "temperatura": 14 },
  { "timestamp": "2026-04-17T12:00:00Z", "miasto": "Warszawa", "temperatura": 19 },
  { "timestamp": "2026-04-17T12:00:00Z", "miasto": "Kraków", "temperatura": 20 },
  { "timestamp": "2026-04-17T12:00:00Z", "miasto": "Wrocław", "temperatura": 21 },
  { "timestamp": "2026-04-17T12:00:00Z", "miasto": "Poznań", "temperatura": 18 },
  { "timestamp": "2026-04-17T12:00:00Z", "miasto": "Gdańsk", "temperatura": 15 },
  { "timestamp": "2026-04-18T12:00:00Z", "miasto": "Warszawa", "temperatura": 20 },
  { "timestamp": "2026-04-18T12:00:00Z", "miasto": "Kraków", "temperatura": 21 },
  { "timestamp": "2026-04-18T12:00:00Z", "miasto": "Wrocław", "temperatura": 22 },
  { "timestamp": "2026-04-18T12:00:00Z", "miasto": "Poznań", "temperatura": 19 },
  { "timestamp": "2026-04-18T12:00:00Z", "miasto": "Gdańsk", "temperatura": 16 },
  { "timestamp": "2026-04-19T12:00:00Z", "miasto": "Warszawa", "temperatura": 18 },
  { "timestamp": "2026-04-19T12:00:00Z", "miasto": "Kraków", "temperatura": 19 },
  { "timestamp": "2026-04-19T12:00:00Z", "miasto": "Wrocław", "temperatura": 20 },
  { "timestamp": "2026-04-19T12:00:00Z", "miasto": "Poznań", "temperatura": 17 },
  { "timestamp": "2026-04-19T12:00:00Z", "miasto": "Gdańsk", "temperatura": 15 },
  { "timestamp": "2026-04-20T12:00:00Z", "miasto": "Warszawa", "temperatura": 16 },
  { "timestamp": "2026-04-20T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-20T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-20T12:00:00Z", "miasto": "Poznań", "temperatura": 16 },
  { "timestamp": "2026-04-20T12:00:00Z", "miasto": "Gdańsk", "temperatura": 13 },
  { "timestamp": "2026-04-21T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-21T12:00:00Z", "miasto": "Kraków", "temperatura": 17 },
  { "timestamp": "2026-04-21T12:00:00Z", "miasto": "Wrocław", "temperatura": 18 },
  { "timestamp": "2026-04-21T12:00:00Z", "miasto": "Poznań", "temperatura": 15 },
  { "timestamp": "2026-04-21T12:00:00Z", "miasto": "Gdańsk", "temperatura": 12 },
  { "timestamp": "2026-04-22T12:00:00Z", "miasto": "Warszawa", "temperatura": 14 },
  { "timestamp": "2026-04-22T12:00:00Z", "miasto": "Kraków", "temperatura": 16 },
  { "timestamp": "2026-04-22T12:00:00Z", "miasto": "Wrocław", "temperatura": 17 },
  { "timestamp": "2026-04-22T12:00:00Z", "miasto": "Poznań", "temperatura": 14 },
  { "timestamp": "2026-04-22T12:00:00Z", "miasto": "Gdańsk", "temperatura": 11 },
  { "timestamp": "2026-04-23T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-23T12:00:00Z", "miasto": "Kraków", "temperatura": 17 },
  { "timestamp": "2026-04-23T12:00:00Z", "miasto": "Wrocław", "temperatura": 18 },
  { "timestamp": "2026-04-23T12:00:00Z", "miasto": "Poznań", "temperatura": 15 },
  { "timestamp": "2026-04-23T12:00:00Z", "miasto": "Gdańsk", "temperatura": 12 },
  { "timestamp": "2026-04-24T12:00:00Z", "miasto": "Warszawa", "temperatura": 16 },
  { "timestamp": "2026-04-24T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-24T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-24T12:00:00Z", "miasto": "Poznań", "temperatura": 16 },
  { "timestamp": "2026-04-24T12:00:00Z", "miasto": "Gdańsk", "temperatura": 13 },
  { "timestamp": "2026-04-25T12:00:00Z", "miasto": "Warszawa", "temperatura": 17 },
  { "timestamp": "2026-04-25T12:00:00Z", "miasto": "Kraków", "temperatura": 19 },
  { "timestamp": "2026-04-25T12:00:00Z", "miasto": "Wrocław", "temperatura": 20 },
  { "timestamp": "2026-04-25T12:00:00Z", "miasto": "Poznań", "temperatura": 17 },
  { "timestamp": "2026-04-25T12:00:00Z", "miasto": "Gdańsk", "temperatura": 14 },
  { "timestamp": "2026-04-26T12:00:00Z", "miasto": "Warszawa", "temperatura": 18 },
  { "timestamp": "2026-04-26T12:00:00Z", "miasto": "Kraków", "temperatura": 20 },
  { "timestamp": "2026-04-26T12:00:00Z", "miasto": "Wrocław", "temperatura": 21 },
  { "timestamp": "2026-04-26T12:00:00Z", "miasto": "Poznań", "temperatura": 18 },
  { "timestamp": "2026-04-26T12:00:00Z", "miasto": "Gdańsk", "temperatura": 15 },
  { "timestamp": "2026-04-27T12:00:00Z", "miasto": "Warszawa", "temperatura": 19 },
  { "timestamp": "2026-04-27T12:00:00Z", "miasto": "Kraków", "temperatura": 21 },
  { "timestamp": "2026-04-27T12:00:00Z", "miasto": "Wrocław", "temperatura": 22 },
  { "timestamp": "2026-04-27T12:00:00Z", "miasto": "Poznań", "temperatura": 19 },
  { "timestamp": "2026-04-27T12:00:00Z", "miasto": "Gdańsk", "temperatura": 16 },
  { "timestamp": "2026-04-28T12:00:00Z", "miasto": "Warszawa", "temperatura": 17 },
  { "timestamp": "2026-04-28T12:00:00Z", "miasto": "Kraków", "temperatura": 19 },
  { "timestamp": "2026-04-28T12:00:00Z", "miasto": "Wrocław", "temperatura": 20 },
  { "timestamp": "2026-04-28T12:00:00Z", "miasto": "Poznań", "temperatura": 17 },
  { "timestamp": "2026-04-28T12:00:00Z", "miasto": "Gdańsk", "temperatura": 15 },
  { "timestamp": "2026-04-29T12:00:00Z", "miasto": "Warszawa", "temperatura": 16 },
  { "timestamp": "2026-04-29T12:00:00Z", "miasto": "Kraków", "temperatura": 18 },
  { "timestamp": "2026-04-29T12:00:00Z", "miasto": "Wrocław", "temperatura": 19 },
  { "timestamp": "2026-04-29T12:00:00Z", "miasto": "Poznań", "temperatura": 16 },
  { "timestamp": "2026-04-29T12:00:00Z", "miasto": "Gdańsk", "temperatura": 14 },
  { "timestamp": "2026-04-30T12:00:00Z", "miasto": "Warszawa", "temperatura": 15 },
  { "timestamp": "2026-04-30T12:00:00Z", "miasto": "Kraków", "temperatura": 17 },
  { "timestamp": "2026-04-30T12:00:00Z", "miasto": "Wrocław", "temperatura": 18 },
  { "timestamp": "2026-04-30T12:00:00Z", "miasto": "Poznań", "temperatura": 15 },
  { "timestamp": "2026-04-30T12:00:00Z", "miasto": "Gdańsk", "temperatura": 13 }
];

const DEMO_MAPPING = { 
  time: "timestamp", 
  label: "miasto",
  value: "temperatura"
};

const translations = {
  pl: {
    title: "OctoTS",
    subtitle: "Wizualizacja Metryk Projektowych",
    urlPlaceholder: "Wklej adres URL do pliku CSV...",
    btnLoad: "Pobierz z URL",
    btnLoading: "Ładowanie...",
    orSeparator: "LUB",
    btnFile: "Wybierz plik z dysku",
    btnReset: "Wyczyść dane",
    mappingTitle: "Konfiguracja mapowania kolumn",
    labelTime: "Kolumna czasu (date/timestamp)",
    labelGroup: "Kolumna grupy (text)",
    labelValue: "Kolumna wartości (number)",
    btnConfirm: "Generuj wykresy",
    successLoad: "Dane wczytane. Skonfiguruj kolumny.",
    successProcess: "Wizualizacje gotowe!",
    errorFile: "Błąd wczytywania danych.",
    initialMessage: "Wgraj plik lub podaj URL, aby zobaczyć wykresy.",
    charts: {
      c1: { title: "1. Puls Aktywności", desc: "Zagęszczenie wystąpień zdarzeń w czasie." },
      c2: { title: "2. Audyt Ciągłości", desc: "Stabilność rejestrowania danych w skali roku." },
      c3: { title: "3. Nawigacja po Historii", desc: "Linia trendu z interaktywnym suwakiem czasu." },
      c4: { title: "4. Ewolucja Struktury", desc: "Zmiany proporcji składowych w czasie." },
      c5: { title: "5. Dynamika Rankingów", desc: "Zmiany pozycji grup w czasie." },
      c6: { title: "6. Chronologia Procesów", desc: "Sekwencja zdarzeń w projekcie." },
      c7: { title: "7. Cykl Dobowy", desc: "Wzorce zachowań systemu w skali 24h." },
      c8: { title: "8. Zmienność Wydajności", desc: "Wykres świecowy ilustrujący fluktuacje." },
      c9: { title: "9. Profil Porównawczy", desc: "Zestawienie wkładu poszczególnych grup." },
      c10: { title: "10. Hierarchia Rozmiaru", desc: "Mapa drzewa pokazująca wagę elementów." },
      c11: { title: "11. Kompozycja Technologiczna", desc: "Proporcje typów danych." },
      c12: { title: "12. Analiza Efektywności", desc: "Korelacja między zmiennymi." },
      c13: { title: "13. Dzienny Bilans", desc: "Zestawienie wartości dodanych i usuniętych." },
      c14: { title: "14. Zakres Zmienności Metryk", desc: "Wizualizacja obszarów odchyleń." },
      c15: { title: "15. Ewolucja Skokowa", desc: "Wykres schodkowy zmian w czasie." }
    }
  },
  en: {
    title: "OctoTS",
    subtitle: "Project Metrics Visualization",
    urlPlaceholder: "Paste CSV URL here...",
    btnLoad: "Load URL",
    btnLoading: "Loading...",
    orSeparator: "OR",
    btnFile: "Choose file",
    btnReset: "Clear data",
    mappingTitle: "Mapping Configuration",
    labelTime: "Time column",
    labelGroup: "Group column",
    labelValue: "Value column",
    btnConfirm: "Generate",
    successLoad: "Loaded. Map columns.",
    successProcess: "Ready!",
    errorFile: "File error.",
    initialMessage: "Upload data to start.",
    charts: {
      c1: { title: "1. Activity Pulse", desc: "Event density over time." },
      c2: { title: "2. Continuity Audit", desc: "Stability of data logging." },
      c3: { title: "3. History Navigation", desc: "Interactive trend line." },
      c4: { title: "4. Structure Evolution", desc: "Changes in proportions." },
      c5: { title: "5. Ranking Dynamics", desc: "Position changes over time." },
      c6: { title: "6. Process Chronology", desc: "Sequence of events." },
      c7: { title: "7. Daily Cycle", desc: "Behavior patterns on 24h scale." },
      c8: { title: "8. Performance Volatility", desc: "Candlestick chart of fluctuations." },
      c9: { title: "9. Comparative Profile", desc: "Radar comparison of contributions." },
      c10: { title: "10. Size Hierarchy", desc: "Tree map of weights." },
      c11: { title: "11. Tech Composition", desc: "Proportions of types." },
      c12: { title: "12. Efficiency Analysis", desc: "Correlation analysis." },
      c13: { title: "13. Daily Balance", desc: "Added vs Removed values." },
      c14: { title: "14. Metric Variability", desc: "Value range visualization." },
      c15: { title: "15. Step Evolution", desc: "Step chart of changes." }
    }
  }
};

const initialChartDefinitions = [
  { id: 'c1', type: 'swarmplot', engine: 'nivo', mapping: {}, options: {
    aggregate: false,
    size: 8, 
    layout: 'vertical',
    margin: { top: 60, right: 60, bottom: 80, left: 60 },
    colors: { scheme: 'set2' },
    axisBottom: { tickSize: 10, tickPadding: 5, tickRotation: 0, legendPosition: 'middle', legendOffset: 40 },
    axisLeft: { tickSize: 10, tickPadding: 5, tickRotation: 0, legendPosition: 'middle', legendOffset: -40 }
  } },
  { id: 'c2', type: 'calendar', engine: 'nivo', mapping: {}, options: {
    aggregate: false,
    from: `2026-01-01`,
    to: `2026-12-31`,
    emptyColor: "#f1f2f6",
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    cellSize: 30,
    margin: { top: 40, right: 10, bottom: 10, left: 40 },
    yearSpacing: 40,
    monthBorderColor: "#ffffff",
    dayBorderWidth: 3,
    dayBorderColor: "#ffffff",
    yearLegendPosition: "none",
    monthLegendOffset: 15,
    dayLegendOffset: 10,
  }, disabled: false },
  { id: 'c3', type: 'line', engine: 'echarts', mapping: {}, options: {
    tooltip: { trigger: 'axis' },
    grid: { bottom: 80 },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    dataZoom: [
      { type: 'slider', start: 0, end: 100 },
      { type: 'inside', start: 0, end: 100 }
    ],
    seriesTemplate: { type: 'line', smooth: true, areaStyle: { opacity: 0.1 } } 
  } },
  { id: 'c4', type: 'stream', engine: 'nivo', mapping: {}, options: {
    aggregate: false,
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 0, legendOffset: 36 },
    axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0, legendOffset: -40 },
    offsetType: 'silhouette',
    colors: { scheme: 'nivo' },
  } },
  { id: 'c5', type: 'bump', engine: 'nivo', mapping: {}, options: {
    aggregate: false,
    margin: { top: 40, right: 100, bottom: 80, left: 80 },
    colors: { scheme: 'set2' },
    lineWidth: 3, activeLineWidth: 6, inactiveLineWidth: 3, inactiveOpacity: 0.15,
    pointSize: 10, activePointSize: 16, inactivePointSize: 0,
    pointBorderWidth: 3, activePointBorderWidth: 3,
    useMesh: true,
    axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 45, legendPosition: 'middle', legendOffset: 40 },
    axisLeft: { tickSize: 5, tickPadding: 10, tickRotation: 0, legendPosition: 'middle', legendOffset: -60 },
  } },
  { id: 'c6', type: 'network', engine: 'echarts', mapping: {}, options: {}, disabled: true },
  { id: 'c7', type: 'heatmap', engine: 'echarts', mapping: {}, options: {
    aggregate: false,
    tooltip: { position: 'top' },
    grid: { height: '65%', top: '5%', bottom: '25%', containLabel: true },
    visualMap: {
      min: 0, max: 10, calculable: true, orient: 'horizontal',
      left: 'center', bottom: '5%', inRange: { color: ['#ebf5fb', '#3498db'] }
    },
    seriesTemplate: { 
      type: 'heatmap', 
      label: { show: false }, 
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } } 
    }
  }, disabled: true },
  { id: 'c8', type: 'candlestick', engine: 'apexcharts', mapping: {}, options: {
    aggregate: false,
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    yAxis: { scale: true },
    seriesTemplate: { itemStyle: { color: '#ef5350', color0: '#26a69a', borderColor: '#ef5350', borderColor0: '#26a69a' } }
  }, disabled: true },
  { id: 'c9', type: 'radar', engine: 'chartjs', mapping: {}, options: {
    aggregate: false,
    responsive: true, maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#888' },
        ticks: { display: false }
      }
    },
    plugins: { legend: { display: false } }
  }, disabled: true },
  { id: 'c10', type: 'treemap', engine: 'apexcharts', mapping: {}, options: {
    aggregate: false,
    chart: { background: 'transparent', toolbar: { show: false } },
    theme: { mode: 'dark' },
    colors: ['#646cff']
  } },
  { id: 'c11', type: 'polararea', engine: 'chartjs', mapping: {}, options: {} },
  { id: 'c12', type: 'scatter', engine: 'chartjs', mapping: {}, options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true }, tooltip: { enabled: true } },
    scales: {
      x: { grid: { color: '#e0e0e0' } },
      y: { grid: { color: '#e0e0e0' } }
    }
  }, disabled: false },
  { id: 'c13', type: 'bar', engine: 'apexcharts', mapping: {}, options: {
    aggregate: false,
    chart: { stacked: true, background: 'transparent', toolbar: { show: false } },
    colors: ['#646cff', '#ff6384'], 
    plotOptions: { bar: { borderRadius: 5 } },
    theme: { mode: 'dark' },
    legend: {
      show: true, position: 'top', horizontalAlign: 'center',
      labels: { colors: '#64748b', useSeriesColors: false },
      markers: { width: 12, height: 12, radius: 12 },
      itemMargin: { horizontal: 20, vertical: 5 }
    },
    grid: { borderColor: '#333', strokeDasharray: 4 },
    tooltip: { theme: 'dark' }
  } },
  { id: 'c14', type: 'area', engine: 'apexcharts', mapping: {}, options: {} },
  { id: 'c15', type: 'line', engine: 'chartjs', mapping: {}, options: {
    aggregate: false,
    responsive: true, maintainAspectRatio: false,
  } }
];

const setMappingToPlot = (globalMapping, currentDefinitions) => {
  return currentDefinitions.map((chart) => {
    let specificMapping = {};

    switch (chart.type) {
      case 'line':
      case 'area':
      case 'bar':
      case 'scatter':
      case 'stream':
      case 'bump':
        specificMapping = {
          x: globalMapping.time,       
          y: globalMapping.value,     
          series: globalMapping.label, 
          group: globalMapping.label   
        };
        break;

      case 'heatmap':
        specificMapping = {
          x: globalMapping.time,
          y: globalMapping.label,
          value: globalMapping.value
        };
        break;

      case 'treemap':
      case 'polararea':
      case 'radar':
      case 'swarmplot':
        specificMapping = {
          id: globalMapping.label,     
          x: globalMapping.label,     
          y: globalMapping.value,
          value: globalMapping.value,
          label: globalMapping.label   
        };
        break;

      case 'calendar':
        specificMapping = {
          date: globalMapping.time,
          value: globalMapping.value
        };
        break;

      case 'network':
        specificMapping = {
          source: globalMapping.time,
          target: globalMapping.label,
          value: globalMapping.value
        };
        break;

      case 'candlestick':
        specificMapping = {
          x: globalMapping.time,
          y: globalMapping.value 
        };
        break;

      default:
        specificMapping = {
          x: globalMapping.time || globalMapping.label,
          y: globalMapping.value
        };
    }

    return {
      ...chart,
      mapping: specificMapping
    };
  });
};

const initialDemoCharts = setMappingToPlot(DEMO_MAPPING, initialChartDefinitions);

function App() {
  const [lang, setLang] = useState('pl');
  const [processedData, setProcessedData] = useState(null);
  const [rawHeaders, setRawHeaders] = useState([]);
  const [sourceType, setSourceType] = useState('TESTOWE');
  const [mapping, setMapping] = useState({});
  const [draftMapping, setDraftMapping] = useState({ time: '', group: '', value: '' });
  const [feedback, setFeedback] = useState({ type: 'info', key: 'initialMessage' });
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  
  const [charts, setCharts] = useState(initialDemoCharts);

  const t = React.useCallback((key) => {
    const keys = key.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], translations[lang]) || key;
  }, [lang]);

  const loadSource = async (source) => {
    if (!window.loadData) return;
    setIsLoading(true); setFeedback(null);
    try {
      const { data, columns } = await window.loadData(source);
      if (!data || data.length === 0) throw new Error();
      setRawHeaders(columns);
      setProcessedData(data);
      setSourceType('PLIK');
      setFeedback({ type: 'success', key: 'successLoad' });
    } catch (e) {
      setFeedback({ type: 'error', key: 'errorFile' });
    } finally { setIsLoading(false); }
  };

  const getEnrichedOptions = React.useCallback((chart, dataToUse) => {
    // Klonowanie wykonujemy tylko wtedy, gdy funkcja zostanie wywołana
    const opts = JSON.parse(JSON.stringify(chart.options));
    const m = chart.mapping; 

    switch (chart.type) {
      case 'swarmplot':
        if (opts.axisBottom) opts.axisBottom.legend = m.group ? m.group.toUpperCase() : '';
        if (opts.axisLeft) opts.axisLeft.legend = m.value ? m.value.toUpperCase() : '';
        opts.groupBy = m.group;
        opts.value = m.value;
        break;

      case 'stream':
        if (opts.axisBottom) opts.axisBottom.legend = m.x || '';
        if (opts.axisLeft) opts.axisLeft.legend = m.y || '';

        if (m.series && dataToUse) {
          const uniqueKeys = [...new Set(dataToUse.map(item => item[m.series]).filter(Boolean))];
          opts.keys = uniqueKeys;
          opts.series = m.series;  
          opts.timeKey = m.x;       
          opts.valueKey = m.y;      
        }
        opts.colors = { scheme: 'set2' };
        break;

      case 'bump':
        if (opts.axisBottom) opts.axisBottom.legend = m.x ? m.x.toUpperCase() : '';
        if (opts.axisLeft) opts.axisLeft.legend = m.y ? m.y.toUpperCase() : '';
        opts.groupBy = m.series;
        opts.timeKey = m.x;
        opts.valueKey = m.y;
        break;

      case 'heatmap':
        if (opts.seriesTemplate) {
          opts.seriesTemplate.name = lang === 'en' ? 'Activity' : 'Aktywność';
        }
        break;

      case 'scatter':
        if (opts.scales && opts.scales.x) {
          opts.scales.x.title = opts.scales.x.title || { display: true };
          opts.scales.x.title.text = m.x ? m.x.toUpperCase() : '';
          opts.scales.x.title.color = '#888'; 
        }
        if (opts.scales && opts.scales.y) {
          opts.scales.y.title = opts.scales.y.title || { display: true };
          opts.scales.y.title.text = m.y ? m.y.toUpperCase() : '';
          opts.scales.y.title.color = '#888';
        }
        break;

      case 'candlestick':
        if (opts.seriesTemplate) {
          opts.seriesTemplate.name = m.y || 'Series';
        }
        break;
    }

    return opts;
  }, [lang]);

  const applyMapping = () => {
    const newMapping = { 
      time: draftMapping.time, 
      label: draftMapping.group, 
      value: draftMapping.value 
    };

    setMapping(newMapping);
    const updatedCharts = setMappingToPlot(newMapping, charts);
    setCharts(updatedCharts);
    setFeedback({ type: 'success', key: 'successProcess' });
  };

  const resetData = () => {
    setProcessedData(null); 
    setRawHeaders([]); 
    setMapping({}); 
    setUrl('');
    setCharts(initialDemoCharts); 
    setFeedback({ type: 'info', key: 'initialMessage' });
  };

  // --- KLUCZOWA OPTYMALIZACJA ---
  // Określamy dane wejściowe
  const isDemo = !processedData || !mapping.value;
  const currentData = React.useMemo(() => isDemo ? DEMO_DATA : processedData, [isDemo, processedData]);

  // Mapujemy i przygotowujemy drogie w obliczeniach opcje TYLKO GDY zmienią się faktyczne parametry, 
  // całkowicie izolując to od zmian w polu wpisywania "url"
  const renderedCharts = React.useMemo(() => {
    return charts.map(chart => {
      const finalOptions = getEnrichedOptions(chart, currentData);
      return { chart, finalOptions };
    });
  }, [charts, currentData, getEnrichedOptions]);
  // -----------------------------

  return (
    <div className="app-root">
      <a href="https://github.com/OctoTS" target="_blank" rel="noopener noreferrer" className="github-org-link">
        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
        <span>GitHub OctoTS</span>
      </a>

      <div className="language-bar">
        <button onClick={() => setLang('pl')} className={`lang-btn ${lang === 'pl' ? 'active' : ''}`}>PL</button>
        <button onClick={() => setLang('en')} className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>EN</button>
      </div>

      <header className="main-header">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <div className="control-panel">
          <div className="input-group">
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="url-input" placeholder={t('urlPlaceholder')} />
            <button onClick={() => loadSource(url)} className="action-button">{isLoading ? t('btnLoading') : t('btnLoad')}</button>
          </div>
          <div className="divider">{t('orSeparator')}</div>
          <label className="file-label">{t('btnFile')}<input type="file" onChange={(e) => loadSource(e.target.files[0])} style={{ display: 'none' }} /></label>
          {(processedData || rawHeaders.length > 0) && <button onClick={resetData} className="reset-button">{t('btnReset')}</button>}
        </div>
        {feedback && <div className={`feedback-message feedback-${feedback.type}`}>{t(feedback.key)}</div>}
        
        {rawHeaders.length > 0 && !mapping.value && (
          <div className="mapping-container">
            <h3>{t('mappingTitle')}</h3>
            <div className="mapping-controls">
              <div className="mapping-field"><label>{t('labelTime')}</label><select value={draftMapping.time} onChange={e => setDraftMapping({...draftMapping, time: e.target.value})}><option value="">--</option>{rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
              <div className="mapping-field"><label>{t('labelGroup')}</label><select value={draftMapping.group} onChange={e => setDraftMapping({...draftMapping, group: e.target.value})}><option value="">--</option>{rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
              <div className="mapping-field"><label>{t('labelValue')}</label><select value={draftMapping.value} onChange={e => setDraftMapping({...draftMapping, value: e.target.value})}><option value="">--</option>{rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
            </div>
            <button className="confirm-button" onClick={applyMapping} disabled={!draftMapping.value}>{t('btnConfirm')}</button>
          </div>
        )}
      </header>

      <main className="dashboard-grid">
        {renderedCharts.map(({ chart, finalOptions }) => (
          <ChartCard 
            key={chart.id} 
            title={t(`charts.${chart.id}.title`)} 
            library={chart.engine} 
            description={t(`charts.${chart.id}.desc`)} 
            lang={lang} 
            source={sourceType}
            disabled={chart.disabled}
          >
            <ChartSnippetWrapper 
              isDemo={isDemo || sourceType === 'MOCK'} 
              chartType={chart.type} 
              engine={chart.engine} 
              data={currentData} 
              mapping={chart.mapping}
              sourceUrl={url} 
              lang={lang} 
            >
              <OctoPlotRenderer 
                engine={chart.engine}
                type={chart.type}
                data={currentData}
                mapping={chart.mapping}
                options={finalOptions} 
              />
            </ChartSnippetWrapper>
          </ChartCard>
        ))}
      </main>
    </div>
  );
}

export default App;