import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import ChartCard from './components/ChartCard';

// ------------------------------------------------------------------
// ZAKTUALIZOWANY WRAPPER DLA TWOJEJ BIBLIOTEKI VANILLA JS
// ------------------------------------------------------------------
const VanillaOctoChart = ({ data, engine, type, chartId, title, yLabel, xLabel }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Sprawdzamy, czy biblioteka jest dostępna i czy mamy dane
    if (typeof window.OctoTS === 'undefined' || !chartRef.current || !data) return;

    chartRef.current.id = chartId;

    // Etykiety słupków (np. nazwy miast) i ich wartości
    const labels = data.map(item => item.label);
    const dataValues = data.map(item => item.value);

    // Wyciągamy czas z pierwszego elementu, by wrzucić go do podtytułu
    // (Zakładamy, że sprawdzasz zrzut danych dla konkretnego timestampa)
    const timestamp = data.length > 0 && data[0].time ? `Czas pomiaru: ${data[0].time}` : '';

    // Tworzymy obiekt konfiguracyjny zgodny z Twoim nowym kodem
    const config = {
      type: type,
      title: title,
      subtitle: timestamp,       // Czas ląduje ładnie nad wykresem
      xAxisTitle: xLabel || '',  // np. "Miasto"
      yAxisTitle: yLabel || '',  // np. "Wartość"
      labels: labels,            // Podpisy pod słupkami
      data: dataValues           // Wysokość słupków
    };
    console.log(config)
    // Wywołanie Twojej zaktualizowanej funkcji
    const chartInstance = window.OctoTS.makewykres(engine, chartId, config);

    return () => {
      if (chartInstance) {
        if (typeof chartInstance.destroy === 'function') chartInstance.destroy();
        if (typeof chartInstance.dispose === 'function') chartInstance.dispose();
      }
    };
  }, [data, engine, type, chartId, title, yLabel, xLabel]);

  return <div ref={chartRef} style={{ width: '100%', height: '350px' }}></div>;
};

// ------------------------------------------------------------------
// TŁUMACZENIA I GŁÓWNA APLIKACJA
// ------------------------------------------------------------------
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
    errorUrl: "Błąd ładowania URL. Upewnij się, że link prowadzi bezpośrednio do pliku w formacie raw.",
    errorData: "Błąd parsowania danych. Sprawdź format CSV.",
    charts: {
      c1: { title: "1. Porównanie Wartości", desc: "Zestawienie dla konkretnego czasu." },
      c2: { title: "2. Audyt Ciągłości", desc: "ECharts Wykres Liniowy." },
      c3: { title: "3. Nawigacja po Historii", desc: "ECharts Wykres Słupkowy." },
    }
  },
  en: {
    // ... skrócone dla czytelności ...
  }
};

function App() {
  const [lang, setLang] = useState('pl');
  const [processedData, setProcessedData] = useState(null);
  const [dataLabel, setDataLabel] = useState('Wartość');
  const [sourceType, setSourceType] = useState('TESTOWE');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [rawCsvLines, setRawCsvLines] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [mappingConfig, setMappingConfig] = useState({ timeAxis: '', labelAxis: '', valueAxis: '' });
  const [showMappingMenu, setShowMappingMenu] = useState(false);

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], translations[lang]) || key;
  };

  const processRawText = (text, sourceName) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      alert(t('errorData'));
      return;
    }
    const headers = lines[0].split(',').map(h => h.trim());
    setCsvHeaders(headers);
    setRawCsvLines(lines);
    setSourceType(sourceName);
    setMappingConfig({ 
      timeAxis: headers[0] || '', 
      labelAxis: headers[1] || headers[0] || '', 
      valueAxis: headers[2] || headers[1] || '' 
    });
    setShowMappingMenu(true);
  };

  const handleUrlLoad = async () => { /* ... (zostaje bez zmian) ... */ 
    if (!url) return;
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const text = await response.text();
      processRawText(text, 'URL');
    } catch (error) {
      alert(t('errorUrl'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => { /* ... (zostaje bez zmian) ... */
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      processRawText(event.target.result, 'PLIK');
    };
    reader.readAsText(file);
  };

  const applyMapping = () => {
    const { timeAxis, labelAxis, valueAxis } = mappingConfig;
    const timeIdx = csvHeaders.indexOf(timeAxis);
    const labelIdx = csvHeaders.indexOf(labelAxis);
    const valueIdx = csvHeaders.indexOf(valueAxis);

    if (timeIdx === -1 || labelIdx === -1 || valueIdx === -1) return;

    const result = rawCsvLines.slice(1).map((line, index) => {
      const parts = line.split(',');
      if (parts.length <= Math.max(timeIdx, labelIdx, valueIdx)) return null;
      
      return {
        id: index,
        time: parts[timeIdx].trim(),
        label: parts[labelIdx].trim(),
        value: parseFloat(parts[valueIdx].trim()) || 0
      };
    }).filter(Boolean);

    result.sort((a, b) => new Date(a.time) - new Date(b.time));

    setDataLabel(valueAxis);
    setProcessedData(result);
    setShowMappingMenu(false);
  };

  const resetData = () => {
    setProcessedData(null);
    setDataLabel('Wartość');
    setSourceType('TESTOWE');
    setUrl('');
    setShowMappingMenu(false);
  };

  return (
    <div className="app-root">
      {/* ... Header i Kontrolki (zostają bez zmian z poprzedniego kodu) ... */}
      <header className="main-header">
        <h1>{t('title')}</h1>
        
        <div className="control-panel">
          <div className="input-group">
            <input type="text" placeholder={t('urlPlaceholder')} value={url} onChange={(e) => setUrl(e.target.value)} className="url-input" />
            <button onClick={handleUrlLoad} className="action-button" disabled={isLoading}>{isLoading ? t('btnLoading') : t('btnLoad')}</button>
          </div>
          <div className="divider">{t('orSeparator')}</div>
          <div className="input-group">
            <label className="file-label action-button">
              {t('btnFile')}
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
          {processedData && <button onClick={resetData} className="reset-button">{t('btnReset')}</button>}
        </div>

        {/* Formularz Mapowania */}
        {showMappingMenu && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'var(--bg-color, rgba(255, 255, 255, 0.05))', borderRadius: '8px', border: '1px solid var(--border-color, #444)', maxWidth: '800px', margin: '20px auto' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Dopasuj kolumny z pliku CSV</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', opacity: 0.8 }}>Czas / Sortowanie:</label>
                <select value={mappingConfig.timeAxis} onChange={(e) => setMappingConfig({...mappingConfig, timeAxis: e.target.value})} style={{ padding: '8px', borderRadius: '4px', minWidth: '150px' }}>
                  {csvHeaders.map(h => <option key={`time-${h}`} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', opacity: 0.8 }}>Etykieta (Oś X):</label>
                <select value={mappingConfig.labelAxis} onChange={(e) => setMappingConfig({...mappingConfig, labelAxis: e.target.value})} style={{ padding: '8px', borderRadius: '4px', minWidth: '150px' }}>
                  {csvHeaders.map(h => <option key={`label-${h}`} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', opacity: 0.8 }}>Wartość (Oś Y):</label>
                <select value={mappingConfig.valueAxis} onChange={(e) => setMappingConfig({...mappingConfig, valueAxis: e.target.value})} style={{ padding: '8px', borderRadius: '4px', minWidth: '150px' }}>
                  {csvHeaders.map(h => <option key={`val-${h}`} value={h}>{h}</option>)}
                </select>
              </div>
              <button className="action-button" onClick={applyMapping} style={{ padding: '9px 20px', height: 'auto' }}>Zastosuj i rysuj</button>
            </div>
          </div>
        )}
      </header>

      <main className="dashboard-grid">
        <ChartCard title={t('charts.c1.title')} library="OctoTS (Chart.js)" source={sourceType} description={t('charts.c1.desc')} lang={lang} dataLabel={dataLabel}>
          <VanillaOctoChart 
            engine="chartjs" 
            type="bar" 
            chartId="octo-chart-1" 
            title="Wykres Aktywności" 
            yLabel={dataLabel} 
            xLabel={mappingConfig.labelAxis} // Przekazujemy nazwę kolumny wybranej do etykiet X
            data={processedData} 
          />
        </ChartCard>

        <ChartCard title={t('charts.c2.title')} library="OctoTS (ECharts)" source={sourceType} description={t('charts.c2.desc')} lang={lang} dataLabel={dataLabel}>
          <VanillaOctoChart 
            engine="echarts" 
            type="line" 
            chartId="octo-chart-2" 
            title="Wykres Ciągłości" 
            yLabel={dataLabel} 
            xLabel={mappingConfig.labelAxis}
            data={processedData} 
          />
        </ChartCard>

        <ChartCard title={t('charts.c3.title')} library="OctoTS (ECharts)" source={sourceType} description={t('charts.c3.desc')} lang={lang} dataLabel={dataLabel}>
          <VanillaOctoChart 
            engine="echarts" 
            type="bar" 
            chartId="octo-chart-3" 
            title="Nawigacja" 
            yLabel={dataLabel} 
            xLabel={mappingConfig.labelAxis}
            data={processedData} 
          />
        </ChartCard>
      </main>
    </div>
  );
}

export default App;