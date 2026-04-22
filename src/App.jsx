import React, { useState } from 'react';
import './App.css';

import ChartCard from './components/ChartCard';

import { BeeswarmPlot } from './components/Gallery/BeeswarmPlot';
import { CalendarActivity } from './components/Gallery/CalendarActivity';
import { TimeZoomPlot } from './components/Gallery/TimeZoomPlot';
import { StreamGraph } from './components/Gallery/StreamGraph';
import { BumpChart } from './components/Gallery/BumpChart';
import { ProcessTimeline } from './components/Gallery/ProcessTimeline';
import { HourlyCycle } from './components/Gallery/HourlyCycle';
import { VolatilityCandle } from './components/Gallery/VolatilityCandle';
import { StatusRadar } from './components/Gallery/StatusRadar';
import { ModuleTree } from './components/Gallery/ModuleTree';
import { ResourcePolar } from './components/Gallery/ResourcePolar';
import { EfficiencyScatter } from './components/Gallery/EfficiencyScatter';
import { NetChangeBar } from './components/Gallery/NetChangeBar';
import { RangeTrend } from './components/Gallery/RangeTrend';
import { StepEvolution } from './components/Gallery/StepEvolution';

const translations = {
  pl: {
    title: "OctoTS",
    subtitle: "Wizualizacja Metryk Projektowych",
    urlPlaceholder: "Wklej adres URL do pliku CSV...",
    btnLoad: "Pobierz z URL",
    btnLoading: "Ładowanie...",
    orSeparator: "LUB",
    btnFile: "Wybierz plik z dysku",
    btnReset: "Przywróć testowe",
    errorUrl: "Błąd ładowania URL",
    charts: {
      c1: { title: "1. Puls Aktywności", desc: "Zagęszczenie zdarzeń deweloperskich w czasie." },
      c2: { title: "2. Audyt Ciągłości", desc: "Stabilność zbierania metryk w skali roku." },
      c3: { title: "3. Nawigacja po Historii", desc: "Interaktywna linia trendu z suwakiem czasu." },
      c4: { title: "4. Ewolucja Struktury", desc: "Zmiany proporcji modułów w czasie." },
      c5: { title: "5. Dynamika Rankingów", desc: "Zmiany aktywności autorów w czasie." },
      c6: { title: "6. Chronologia Procesów", desc: "Sekwencja zdarzeń w projekcie." },
      c7: { title: "7. Cykl Dobowy", desc: "Wzorce zachowań systemu w skali 24h." },
      c8: { title: "8. Zmienność Wydajności", desc: "Wykres świecowy zmian (min/max)." },
      c9: { title: "9. Profil Zdrowia Projektu", desc: "Radarowe porównanie wkładu autorów." },
      c10: { title: "10. Hierarchia Rozmiaru Modułów", desc: "Mapa drzewa pokazująca wagę katalogów." },
      c11: { title: "11. Kompozycja Technologiczna", desc: "Proporcje typów plików." },
      c12: { title: "12. Analiza Efektywności PR", desc: "Korelacja zmian i czasu review." },
      c13: { title: "13. Dzienny Bilans", desc: "Zestawienie linii dodanych i usuniętych." },
      c14: { title: "14. Zakres Zmienności Metryk", desc: "Wykres obszarowy pokazujący przedziały wartości." },
      c15: { title: "15. Skokowa Ewolucja Systemu", desc: "Wykres schodkowy zmian w czasie." },
    }
  },
  en: {
    title: "OctoTS",
    subtitle: "Project Metrics Visualization",
    urlPlaceholder: "Paste CSV URL here...",
    btnLoad: "Load from URL",
    btnLoading: "Loading...",
    orSeparator: "OR",
    btnFile: "Choose file from disk",
    btnReset: "Restore Mock Data",
    errorUrl: "Error loading URL",
    charts: {
      c1: { title: "1. Activity Pulse", desc: "Density of development events over time." },
      c2: { title: "2. Continuity Audit", desc: "Stability of metrics collection throughout the year." },
      c3: { title: "3. History Navigation", desc: "Interactive trend line with a time slider." },
      c4: { title: "4. Structure Evolution", desc: "Changes in module proportions over time." },
      c5: { title: "5. Ranking Dynamics", desc: "Changes in author activity over time." },
      c6: { title: "6. Process Chronology", desc: "Sequence of events in the project." },
      c7: { title: "7. Daily Cycle", desc: "System behavior patterns on a 24h scale." },
      c8: { title: "8. Performance Volatility", desc: "Candlestick chart of changes (min/max)." },
      c9: { title: "9. Project Health Profile", desc: "Radar comparison of author contributions." },
      c10: { title: "10. Module Size Hierarchy", desc: "Tree map showing the weight of directories." },
      c11: { title: "11. Tech Composition", desc: "Proportions of file types." },
      c12: { title: "12. PR Efficiency Analysis", desc: "Correlation between change size and review time." },
      c13: { title: "13. Daily Balance", desc: "Summary of added and removed lines." },
      c14: { title: "14. Metric Variability Range", desc: "Area chart showing value ranges." },
      c15: { title: "15. Stepwise System Evolution", desc: "Step chart of changes over time." },
    }
  }
};

function App() {
  const [lang, setLang] = useState('pl');
  const [processedData, setProcessedData] = useState(null);
  const [dataLabel, setDataLabel] = useState('lines_of_code');
  const [sourceType, setSourceType] = useState('TESTOWE');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], translations[lang]) || key;
  };

  const parseCSV = (text) => {
    try {
      const lines = text.trim().split('\n');
      if (lines.length < 2) return null;
      
      const headers = lines[0].split(',').map(h => h.trim());
      const headersLower = headers.map(h => h.toLowerCase());
      
      const timeIdx = headersLower.findIndex(h => h.includes('time') || h.includes('date'));
      const authorIdx = headersLower.findIndex(h => h.includes('author') || h.includes('user') || h.includes('who'));
      const locIdx = headersLower.findIndex(h => h.includes('loc') || h.includes('lines') || h.includes('code') || h.includes('value') || h.includes('val') || h.includes('count') || h.includes('amount'));

      if (timeIdx === -1 || authorIdx === -1 || locIdx === -1) return null;

      const metricName = headers[locIdx];
      setDataLabel(metricName);

      const result = lines.slice(1).map((line, index) => {
        const parts = line.split(',');
        if (parts.length <= Math.max(timeIdx, authorIdx, locIdx)) return null;
        return {
          id: index,
          timestamp: parts[timeIdx].trim(),
          author: parts[authorIdx].trim(),
          [metricName]: parseInt(parts[locIdx].trim(), 10) || 0
        };
      }).filter(Boolean);
      return result.length > 0 ? result : null;
    } catch (err) {
      return null;
    }
  };

  const handleUrlLoad = async () => {
    if (!url) return;
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parsed = parseCSV(text);
      if (parsed) {
        setProcessedData(parsed);
        setSourceType('URL');
      }
    } catch (error) {
      alert(t('errorUrl'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const parsed = parseCSV(event.target.result);
      if (parsed) {
        setProcessedData(parsed);
        setSourceType('PLIK');
      }
    };
    reader.readAsText(file);
  };

  const resetData = () => {
    setProcessedData(null);
    setDataLabel('lines_of_code');
    setSourceType('TEST');
    setUrl('');
  };

  const isSupported = (id) => [1, 2, 3, 5, 8, 9, 14, 15].includes(id);

  const GitHubIcon = () => (
    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );

  return (
    <div className="app-root">
      <a href="https://github.com/OctoTS" target="_blank" rel="noopener noreferrer" className="github-org-link">
        <GitHubIcon />
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
            <input type="text" placeholder={t('urlPlaceholder')} value={url} onChange={(e) => setUrl(e.target.value)} className="url-input" />
            <button onClick={handleUrlLoad} className="action-button" disabled={isLoading}>
              {isLoading ? t('btnLoading') : t('btnLoad')}
            </button>
          </div>
          <div className="divider">{t('orSeparator')}</div>
          <div className="input-group">
            <label className="file-label">
              {t('btnFile')}
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
          {processedData && <button onClick={resetData} className="reset-button">{t('btnReset')}</button>}
        </div>
      </header>

      <main className="dashboard-grid">
        <ChartCard title={t('charts.c1.title')} library="Nivo" source={sourceType} description={t('charts.c1.desc')} disabled={processedData !== null && !isSupported(1)} lang={lang} dataLabel={dataLabel}>
          <BeeswarmPlot />
        </ChartCard>
        <ChartCard title={t('charts.c2.title')} library="Nivo" source={sourceType} description={t('charts.c2.desc')} disabled={processedData !== null && !isSupported(2)} lang={lang} dataLabel={dataLabel}>
          <CalendarActivity data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c3.title')} library="ECharts" source={sourceType} description={t('charts.c3.desc')} disabled={processedData !== null && !isSupported(3)} lang={lang} dataLabel={dataLabel}>
          <TimeZoomPlot data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c4.title')} library="Nivo" source={sourceType} description={t('charts.c4.desc')} disabled={processedData !== null && !isSupported(4)} lang={lang} dataLabel={dataLabel}>
          <StreamGraph data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c5.title')} library="Nivo" source={sourceType} description={t('charts.c5.desc')} disabled={processedData !== null && !isSupported(5)} lang={lang} dataLabel={dataLabel}>
          <BumpChart data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c6.title')} library="ECharts" source={sourceType} description={t('charts.c6.desc')} disabled={processedData !== null && !isSupported(6)} lang={lang} dataLabel={dataLabel}>
          <ProcessTimeline data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c7.title')} library="ECharts" source={sourceType} description={t('charts.c7.desc')} disabled={processedData !== null && !isSupported(7)} lang={lang} dataLabel={dataLabel}>
          <HourlyCycle data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c8.title')} library="ApexCharts" source={sourceType} description={t('charts.c8.desc')} disabled={processedData !== null && !isSupported(8)} lang={lang} dataLabel={dataLabel}>
          <VolatilityCandle data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c9.title')} library="Chart.js" source={sourceType} description={t('charts.c9.desc')} disabled={processedData !== null && !isSupported(9)} lang={lang} dataLabel={dataLabel}>
          <StatusRadar data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c10.title')} library="ApexCharts" source={sourceType} description={t('charts.c10.desc')} disabled={processedData !== null && !isSupported(10)} lang={lang} dataLabel={dataLabel}>
          <ModuleTree data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c11.title')} library="Chart.js" source={sourceType} description={t('charts.c11.desc')} disabled={processedData !== null && !isSupported(11)} lang={lang} dataLabel={dataLabel}>
          <ResourcePolar data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c12.title')} library="Chart.js" source={sourceType} description={t('charts.c12.desc')} disabled={processedData !== null && !isSupported(12)} lang={lang} dataLabel={dataLabel}>
          <EfficiencyScatter data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c13.title')} library="ApexCharts" source={sourceType} description={t('charts.c13.desc')} disabled={processedData !== null && !isSupported(13)} lang={lang} dataLabel={dataLabel}>
          <NetChangeBar data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c14.title')} library="ApexCharts" source={sourceType} description={t('charts.c14.desc')} disabled={processedData !== null && !isSupported(14)} lang={lang} dataLabel={dataLabel}>
          <RangeTrend data={processedData} dataLabel={dataLabel} />
        </ChartCard>
        <ChartCard title={t('charts.c15.title')} library="Chart.js" source={sourceType} description={t('charts.c15.desc')} disabled={processedData !== null && !isSupported(15)} lang={lang} dataLabel={dataLabel}>
          <StepEvolution data={processedData} dataLabel={dataLabel} />
        </ChartCard>
      </main>
    </div>
  );
}

export default App;
