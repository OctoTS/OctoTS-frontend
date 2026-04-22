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
    btnReset: "Wyczyść dane",
    mappingTitle: "Konfiguracja mapowania kolumn",
    labelTime: "Kolumna czasu (data/timestamp)",
    labelGroup: "Kolumna grupy (tekstowa)",
    labelValue: "Kolumna wartości (liczbowa)",
    btnConfirm: "Generuj wykresy",
    successLoad: "Dane wczytane. Skonfiguruj kolumny.",
    successProcess: "Wizualizacje gotowe!",
    errorFile: "Błąd wczytywania danych.",
    errorNetwork: "Błąd sieciowy podczas pobierania.",
    initialMessage: "Wgraj plik CSV lub podaj adres URL, aby zobaczyć wizualizacje danych.",
    charts: {
      c1: { title: "1. Puls Aktywności", desc: "Zagęszczenie wystąpień zdarzeń w czasie." },
      c2: { title: "2. Audyt Ciągłości", desc: "Stabilność rejestrowania danych w skali roku." },
      c3: { title: "3. Nawigacja po Historii", desc: "Linia trendu z interaktywnym suwakiem czasu." },
      c4: { title: "4. Ewolucja Struktury", desc: "Zmiany proporcji składowych w czasie." },
      c5: { title: "5. Dynamika Rankingów", desc: "Zmiany pozycji grup w czasie." },
      c6: { title: "6. Chronologia Procesów", desc: "Sekwencja zdarzeń zarejestrowana w czasie." },
      c7: { title: "7. Cykl Dobowy", desc: "Wzorce zachowań w skali 24-godzinnej." },
      c8: { title: "8. Zmienność Wydajności", desc: "Wykres świecowy ilustrujący fluktuacje." },
      c9: { title: "9. Profil Porównawczy", desc: "Zestawienie wkładu poszczególnych grup." },
      c10: { title: "10. Hierarchia Rozmiaru", desc: "Struktura wag poszczególnych elementów." },
      c11: { title: "11. Kompozycja Typów", desc: "Proporcje między kategoriami danych." },
      c12: { title: "12. Analiza Korelacji", desc: "Badanie zależności między zmiennymi." },
      c13: { title: "13. Bilans Zmian", desc: "Zestawienie wartości dodanych i usuniętych." },
      c14: { title: "14. Zakres Zmienności", desc: "Wizualizacja obszarów odchyleń wartości." },
      c15: { title: "15. Ewolucja Skokowa", desc: "Zmiany stanu systemu rejestrowane w czasie." },
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
    btnReset: "Clear data",
    mappingTitle: "Column Mapping Configuration",
    labelTime: "Time column (date/timestamp)",
    labelGroup: "Group column (text)",
    labelValue: "Value column (number)",
    btnConfirm: "Generate charts",
    successLoad: "Data loaded. Configure columns.",
    successProcess: "Visualizations ready!",
    errorFile: "Error loading data.",
    errorNetwork: "Network error during fetch.",
    initialMessage: "Upload a CSV file or provide a URL to see data visualizations.",
    charts: {
      c1: { title: "1. Activity Pulse", desc: "Density of event occurrences over time." },
      c2: { title: "2. Continuity Audit", desc: "Stability of data logging throughout the year." },
      c3: { title: "3. History Navigation", desc: "Interactive trend line with a time slider." },
      c4: { title: "4. Structure Evolution", desc: "Changes in module proportions over time." },
      c5: { title: "5. Ranking Dynamics", desc: "Changes in group positions over time." },
      c6: { title: "6. Process Chronology", desc: "Sequence of events recorded in time." },
      c7: { title: "7. Daily Cycle", desc: "System behavior patterns on a 24h scale." },
      c8: { title: "8. Performance Volatility", desc: "Candlestick chart of changes (min/max)." },
      c9: { title: "9. Project Health Profile", desc: "Radar comparison of author contributions." },
      c10: { title: "10. Module Size Hierarchy", desc: "Tree map showing directory weights." },
      c11: { title: "11. Tech Composition", desc: "Proportions of file types." },
      c12: { title: "12. PR Efficiency Analysis", desc: "Correlation between changes and review time." },
      c13: { title: "13. Daily Balance", desc: "Summary of added and removed lines." },
      c14: { title: "14. Metric Variability Range", desc: "Area chart showing value ranges." },
      c15: { title: "15. Stepwise System Evolution", desc: "Step chart of changes over time." },
    }
  }
};

function App() {
  const [lang, setLang] = useState('pl');
  const [processedData, setProcessedData] = useState(null);
  const [rawHeaders, setRawHeaders] = useState([]);
  const [rawRows, setRawRows] = useState([]);
  const [mapping, setMapping] = useState({ time: '', group: '', value: '' });
  const [draftMapping, setDraftMapping] = useState({ time: "", group: "", value: "" });
  const [feedback, setFeedback] = useState({ type: 'info', key: 'initialMessage' });
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], translations[lang]) || key;
  };

  const processRawData = (text) => {
    const lines = text.trim().split('\n').map(row => row.split(','));
    if (lines.length < 2) {
      setFeedback({ type: 'error', key: 'errorFile' });
      return;
    }
    setRawHeaders(lines[0].map(h => h.trim()));
    setRawRows(lines.slice(1));
    setProcessedData(null);
    setFeedback({ type: 'success', key: 'successLoad' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFeedback(null);
    const reader = new FileReader();
    reader.onload = (event) => processRawData(event.target.result);
    reader.readAsText(file);
  };

  const handleUrlLoad = async () => {
    if (!url) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      const response = await fetch(url);
      const text = await response.text();
      processRawData(text);
    } catch (error) {
      setFeedback({ type: 'error', key: 'errorNetwork' });
    } finally {
      setIsLoading(false);
    }
  };

  const applyMapping = () => {
    const result = rawRows.map((row, index) => {
      const obj = { id: index };
      rawHeaders.forEach((header, i) => {
        obj[header] = row[i]?.trim();
      });
      return obj;
    });
    setMapping(draftMapping);
    setProcessedData(result);
    setFeedback({ type: 'success', key: 'successProcess' });
  };

  const resetData = () => {
    setProcessedData(null); setRawHeaders([]); setRawRows([]);
    setMapping({ time: '', group: '', value: '' }); setFeedback({ type: 'info', key: 'initialMessage' }); setUrl('');
  };

  const GitHubIcon = () => (
    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );

  return (
    <div className="app-root">
      <a href="https://github.com/OctoTS" target="_blank" rel="noopener noreferrer" className="github-org-link">
        <GitHubIcon />
        <span style={{ marginLeft: '8px' }}>GitHub OctoTS</span>
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
            <button onClick={handleUrlLoad} className="action-button" disabled={isLoading}>{isLoading ? t('btnLoading') : t('btnLoad')}</button>
          </div>
          <div className="divider">{t('orSeparator')}</div>
          <div className="input-group">
            <label className="file-label">
              {t('btnFile')}
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
          {(processedData || rawRows.length > 0) && <button onClick={resetData} className="reset-button">{t('btnReset')}</button>}
        </div>

        {feedback && (
          <div className={`feedback-message feedback-${feedback.type}`}>
            {t(feedback.key)}
          </div>
        )}

        {rawRows.length > 0 && !processedData && (
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

      {
        <main className="dashboard-grid">
          <ChartCard title={t('charts.c1.title')} library="Nivo" description={t('charts.c1.desc')} lang={lang}>
            <BeeswarmPlot lang={lang} rawData={processedData} options={{groupBy: mapping.group, valueKey: mapping.value}} />
          </ChartCard>
          <ChartCard title={t('charts.c2.title')} library="Nivo" description={t('charts.c2.desc')} lang={lang}>
            <CalendarActivity rawData={processedData} options={{timeKey: mapping.time, valueKey: mapping.value}} />
          </ChartCard>
          <ChartCard title={t('charts.c3.title')} library="ECharts" description={t('charts.c3.desc')} lang={lang}>
            <TimeZoomPlot rawData={processedData} config={{ valueKey: mapping.value, timeKey: mapping.time }} lang={lang} />
          </ChartCard>
          <ChartCard title={t('charts.c4.title')} library="Nivo" description={t('charts.c4.desc')} lang={lang}>
            <StreamGraph rawData={processedData} config={{ valueKey: mapping.value, groupKey: mapping.group, timeKey: mapping.time }} />
          </ChartCard>
          <ChartCard title={t('charts.c5.title')} library="Nivo" description={t('charts.c5.desc')} lang={lang}>
            <BumpChart lang={lang} rawData={processedData} options={{timeKey: mapping.time, valueKey: mapping.value, groupBy: mapping.group}} />
          </ChartCard>
          <ChartCard title={t('charts.c6.title')} library="ECharts" description={t('charts.c6.desc')} lang={lang}>
            <ProcessTimeline />
          </ChartCard>
          <ChartCard title={t('charts.c7.title')} library="ECharts" description={t('charts.c7.desc')} lang={lang}>
            <HourlyCycle lang={lang} />
          </ChartCard>
          <ChartCard title={t('charts.c8.title')} library="ECharts" description={t('charts.c8.desc')} lang={lang}>
            <VolatilityCandle rawData={processedData} config={{ valueKey: mapping.value, timeKey: mapping.time }} />
          </ChartCard>
          <ChartCard title={t('charts.c9.title')} library="Chart.js" description={t('charts.c9.desc')} lang={lang}>
            <StatusRadar rawData={processedData} config={{ valueKey: mapping.value, groupKey: mapping.group }} lang={lang} />
          </ChartCard>
          <ChartCard title={t('charts.c10.title')} library="ApexCharts" description={t('charts.c10.desc')} lang={lang}>
            <ModuleTree rawData={processedData} options={{labelKey: mapping.group, valueKey: mapping.value}} />
          </ChartCard>
          <ChartCard title={t('charts.c11.title')} library="Chart.js" description={t('charts.c11.desc')} lang={lang}>
            <ResourcePolar rawData={processedData} config={{ valueKey: mapping.value, groupKey: mapping.group }} />
          </ChartCard>
          <ChartCard title={t('charts.c12.title')} library="Chart.js" description={t('charts.c12.desc')} lang={lang}>
            <EfficiencyScatter rawData={processedData} options={{xKey: mapping.time, yKey: mapping.value, groupBy: mapping.group}} />
          </ChartCard>
          <ChartCard title={t('charts.c13.title')} library="ApexCharts" description={t('charts.c13.desc')} lang={lang}>
            <NetChangeBar rawData={processedData} options={{xKey: mapping.time, valueKey: mapping.value, groupBy: mapping.group}} />
          </ChartCard>
          <ChartCard title={t('charts.c14.title')} library="ApexCharts" description={t('charts.c14.desc')} lang={lang}>
            <RangeTrend rawData={processedData} config={{ valueKey: mapping.value, timeKey: mapping.time }} />
          </ChartCard>
          <ChartCard title={t('charts.c15.title')} library="Chart.js" description={t('charts.c15.desc')} lang={lang}>
            <StepEvolution rawData={processedData} config={{ valueKey: mapping.value, timeKey: mapping.time }} />
          </ChartCard>
        </main>
      }
    </div>
  );
}

export default App;
