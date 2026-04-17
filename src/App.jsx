import React, { useState } from 'react';
import './App.css';

import { 
  ChartCard, 
  OctoDashboard,
  BeeswarmPlot, 
  CalendarActivity, 
  TimeZoomPlot, 
  BumpChart,
  VolatilityCandle,
  StatusRadar,
  RangeTrend,
  StepEvolution,
  StreamGraph,
  ProcessTimeline,
  HourlyCycle,
  ModuleTree,
  ResourcePolar,
  EfficiencyScatter,
  NetChangeBar
} from 'octots-frontend-lib';

import 'octots-frontend-lib/dist/octots-frontend-lib.css';

const translations = {
  pl: {
    title: "OctoTS",
    subtitle: "Wizualizacja Metryk w Czasie",
    btnFile: "Wybierz plik z dysku",
    urlPlaceholder: "Wklej adres URL do pliku CSV...",
    btnLoad: "Pobierz z URL",
    btnLoading: "Ładowanie...",
    orSeparator: "LUB",
    btnReset: "Wyczyść dane",
    mappingTitle: "Konfiguracja mapowania kolumn",
    labelTime: "Kolumna czasu (data/timestamp)",
    labelGroup: "Kolumna grupy (wartość tekstowa)",
    labelValue: "Kolumna wartości (liczbowa)",
    btnConfirm: "Generuj wykresy",
    successLoad: "Dane wczytane. Skonfiguruj kolumny.",
    successProcess: "Wizualizacje gotowe!",
    errorFile: "Błąd wczytywania danych.",
    errorNetwork: "Błąd sieciowy podczas pobierania.",
    initialMessage: "Wgraj plik CSV lub podaj adres URL, aby zobaczyć wizualizacje danych.",
    reqs: {
      time: "Czas (date/timestamp)",
      group: "Grupa (text)",
      value: "Wartość (number)"
    },
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
      c11: { title: "11. Kompozycja Typów", desc: "Proporcje typów danych." },
      c12: { title: "12. Analiza Korelacji", desc: "Badanie zależności między zmiennymi." },
      c13: { title: "13. Bilans Zmian", desc: "Zestawienie wartości dodanych i usuniętych." },
      c14: { title: "14. Zakres Zmienności", desc: "Wizualizacja obszarów odchyleń wartości." },
      c15: { title: "15. Ewolucja Skokowa", desc: "Zmiany stanu systemu rejestrowane w czasie." },
    }
  },
  en: {
    title: "OctoTS",
    subtitle: "Time-Series Metrics Visualization",
    btnFile: "Choose file",
    urlPlaceholder: "Paste CSV URL here...",
    btnLoad: "Load URL",
    btnLoading: "Loading...",
    orSeparator: "OR",
    btnReset: "Clear Data",
    mappingTitle: "Column Mapping Configuration",
    labelTime: "Time Column (date/timestamp)",
    labelGroup: "Group Column (text)",
    labelValue: "Value Column (number)",
    btnConfirm: "Confirm and Generate",
    successLoad: "Data loaded. Please map columns.",
    successProcess: "Visualizations ready!",
    errorFile: "Error loading data.",
    errorNetwork: "Network error during fetch.",
    initialMessage: "Please upload a CSV file or provide a URL to see data visualizations.",
    reqs: {
      time: "Time (date/timestamp)",
      group: "Group (text)",
      value: "Value (number)"
    },
    charts: {
      c1: { title: "1. Activity Pulse", desc: "Density of event occurrences over time." },
      c2: { title: "2. Continuity Audit", desc: "Stability of data logging throughout the year." },
      c3: { title: "3. History Navigation", desc: "Trend line with an interactive time slider." },
      c4: { title: "4. Structure Evolution", desc: "Changes in component proportions over time." },
      c5: { title: "5. Ranking Dynamics", desc: "Changes in group positions over time." },
      c6: { title: "6. Process Chronology", desc: "Sequence of events recorded over time." },
      c7: { title: "7. Daily Cycle", desc: "Behavior patterns on a 24-hour scale." },
      c8: { title: "8. Performance Volatility", desc: "Candlestick chart illustrating fluctuations." },
      c9: { title: "9. Comparative Profile", desc: "Comparison of individual group contributions." },
      c10: { title: "10. Size Hierarchy", desc: "Weight structure of individual elements." },
      c11: { title: "11. Type Composition", desc: "Proportions of file types." },
      c12: { title: "12. PR Efficiency Analysis", desc: "Examination of dependencies between variables." },
      c13: { title: "13. Change Balance", desc: "Summary of added and removed values." },
      c14: { title: "14. Variability Range", desc: "Visualization of value deviation areas." },
      c15: { title: "15. Step Evolution", desc: "System state changes recorded over time." },
    }
  }
};

function App() {
  const [lang, setLang] = useState('pl');
  const [sourceType, setSourceType] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [rawHeaders, setRawHeaders] = useState([]);
  const [rawRows, setRawRows] = useState([]);
  const [mapping, setMapping] = useState({ time: '', group: '', value: '' });
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], translations[lang]) || key;
  };

  const processRawData = (text) => {
    const lines = text.trim().split('\n').map(row => row.split(','));
    if (lines.length < 2) {
      setFeedback({ type: 'error', messageKey: 'errorFile' });
      return;
    }
    setRawHeaders(lines[0].map(h => h.trim()));
    setRawRows(lines.slice(1));
    setProcessedData(null);
    setFeedback({ type: 'success', messageKey: 'successLoad' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      if (!response.ok) throw new Error();
      const text = await response.text();
      processRawData(text);
    } catch (err) {
      setFeedback({ type: 'error', messageKey: 'errorNetwork' });
    } finally {
      setIsLoading(false);
    }
  };

  const applyMapping = () => {
    const timeIdx = rawHeaders.indexOf(mapping.time);
    const groupIdx = rawHeaders.indexOf(mapping.group);
    const valueIdx = rawHeaders.indexOf(mapping.value);

    const result = rawRows.map((row, index) => ({
      id: index,
      [mapping.time || 'timestamp']: timeIdx !== -1 ? row[timeIdx]?.trim() : null,
      [mapping.group || 'author']: groupIdx !== -1 ? row[groupIdx]?.trim() : 'Default',
      [mapping.value || 'value']: valueIdx !== -1 ? parseInt(row[valueIdx]?.trim(), 10) || 0 : 0
    }));

    setProcessedData(result);
    setSourceType('PLIK');
    setFeedback({ type: 'success', messageKey: 'successProcess' });
  };

  const resetData = () => {
    setProcessedData(null); setRawHeaders([]); setRawRows([]); setSourceType(null);
    setMapping({ time: '', group: '', value: '' }); setFeedback(null); setUrl('');
  };

  const dashboardLayout = [
    { type: 'beeswarm', title: t('charts.c1.title'), description: t('charts.c1.desc'), mapping: { groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'calendar', title: t('charts.c2.title'), description: t('charts.c2.desc'), mapping: { timeKey: mapping.time, valueKey: mapping.value } },
    { type: 'timeZoom', title: t('charts.c3.title'), description: t('charts.c3.desc'), mapping: { timeKey: mapping.time, valueKey: mapping.value } },
    { type: 'stream', title: t('charts.c4.title'), description: t('charts.c4.desc'), mapping: { timeKey: mapping.time, groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'bump', title: t('charts.c5.title'), description: t('charts.c5.desc'), mapping: { timeKey: mapping.time, groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'timeline', title: t('charts.c6.title'), description: t('charts.c6.desc'), mapping: { timeKey: mapping.time, groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'hourly', title: t('charts.c7.title'), description: t('charts.c7.desc'), mapping: { timeKey: mapping.time, valueKey: mapping.value } },
    { type: 'volatility', title: t('charts.c8.title'), description: t('charts.c8.desc'), mapping: { timeKey: mapping.time, valueKey: mapping.value } },
    { type: 'radar', title: t('charts.c9.title'), description: t('charts.c9.desc'), mapping: { groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'tree', title: t('charts.c10.title'), description: t('charts.c10.desc'), mapping: { groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'polar', title: t('charts.c11.title'), description: t('charts.c11.desc'), mapping: { groupKey: mapping.group, valueKey: mapping.value } },
    { type: 'scatter', title: t('charts.c12.title'), description: t('charts.c12.desc'), mapping: { valueKey: mapping.value } },
    { type: 'netChange', title: t('charts.c13.title'), description: t('charts.c13.desc'), mapping: { valueKey: mapping.value } },
    { type: 'range', title: t('charts.c14.title'), description: t('charts.c14.desc'), mapping: { timeKey: mapping.time, valueKey: mapping.value } },
    { type: 'step', title: t('charts.c15.title'), description: t('charts.c15.desc'), mapping: { timeKey: mapping.time, valueKey: mapping.value } }
  ];

  return (
    <div className="app-root">
      <a href="https://github.com/OctoTS" target="_blank" rel="noopener noreferrer" className="github-org-link">
        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
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
            <button onClick={handleUrlLoad} className="action-button" disabled={isLoading}>{isLoading ? t('btnLoading') : t('btnLoad')}</button>
          </div>
          <div className="divider">{t('orSeparator')}</div>
          <label className="file-label">{t('btnFile')}<input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} /></label>
          {(processedData || rawRows.length > 0) && <button onClick={resetData} className="reset-button">{t('btnReset')}</button>}
        </div>

        {feedback ? (
          <div className={`feedback-message feedback-${feedback.type}`}>{t(feedback.messageKey)}</div>
        ) : (
          !processedData && rawRows.length === 0 && (
            <div className="feedback-message feedback-info">{t('initialMessage')}</div>
          )
        )}

        {rawRows.length > 0 && !processedData && (
          <div className="mapping-container">
            <h3>{t('mappingTitle')}</h3>
            <div className="mapping-controls">
              <div className="mapping-field"><label>{t('labelTime')}</label><select value={mapping.time} onChange={e => setMapping({...mapping, time: e.target.value})}><option value="">--</option>{rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
              <div className="mapping-field"><label>{t('labelGroup')}</label><select value={mapping.group} onChange={e => setMapping({...mapping, group: e.target.value})}><option value="">--</option>{rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
              <div className="mapping-field"><label>{t('labelValue')}</label><select value={mapping.value} onChange={e => setMapping({...mapping, value: e.target.value})}><option value="">--</option>{rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
            </div>
            <button className="confirm-button" onClick={applyMapping} disabled={!mapping.value}>{t('btnConfirm')}</button>
          </div>
        )}
      </header>

      {processedData && (
        <OctoDashboard 
          data={processedData} 
          layout={dashboardLayout} 
          lang={lang} 
        />
      )}
    </div>
  );
}

export default App;
