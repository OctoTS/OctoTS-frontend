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

function App() {
  const [processedData, setProcessedData] = useState(null);
  const [sourceType, setSourceType] = useState('TESTOWE');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const parseCSV = (text) => {
    try {
      const lines = text.trim().split('\n');
      if (lines.length < 2) return null;
      const result = lines.slice(1).map((line, index) => {
        const parts = line.split(',');
        if (parts.length < 3) return null;
        return {
          id: index,
          timestamp: parts[0].trim(),
          author: parts[1].trim(),
          lines_of_code: parseInt(parts[2].trim(), 10) || 0
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
      alert("Error loading URL");
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
    setSourceType('TESTOWE');
    setUrl('');
  };

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <header style={{ maxWidth: '1200px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <h1 style={{ color: '#1e293b', fontSize: '2.5rem', marginBottom: '10px' }}>OctoTS Demo</h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '30px' }}>Wizualizacja Metryk Projektowych</p>

        <div className="control-panel">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Wklej adres URL do pliku CSV..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="url-input"
            />
            <button onClick={handleUrlLoad} className="action-button" disabled={isLoading}>
              {isLoading ? 'Ładowanie...' : 'Pobierz z URL'}
            </button>
          </div>
          <div className="divider">LUB</div>
          <div className="input-group">
            <label className="file-label">
              Wybierz plik z dysku
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
          {processedData && <button onClick={resetData} className="reset-button">Przywróć testowe</button>}
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
        
        <ChartCard title="1. Puls Aktywności" library="Nivo" source={sourceType} description="Zagęszczenie zdarzeń deweloperskich w czasie.">
          <BeeswarmPlot data={processedData} />
        </ChartCard>

        <ChartCard title="2. Audyt Ciągłości" library="Nivo" source={sourceType} description="Stabilność zbierania metryk w skali roku.">
          <CalendarActivity data={processedData} />
        </ChartCard>

        <ChartCard title="3. Nawigacja po Historii" library="ECharts" source={sourceType} description="Interaktywna linia trendu z suwakiem czasu.">
          <TimeZoomPlot data={processedData} />
        </ChartCard>

        {!processedData && (
          <ChartCard title="4. Ewolucja Struktury" library="Nivo" source={sourceType} description="Zmiany proporcji modułów w czasie (Mock).">
            <StreamGraph data={processedData} />
          </ChartCard>
        )}

        <ChartCard title="5. Dynamika Rankingów" library="Nivo" source={sourceType} description="Zmiany aktywności autorów w czasie.">
          <BumpChart data={processedData} />
        </ChartCard>

        {!processedData && (
          <ChartCard title="6. Chronologia Procesów" library="ECharts" source={sourceType} description="Sekwencja zdarzeń w projekcie (Mock).">
            <ProcessTimeline data={processedData} />
          </ChartCard>
        )}

        {!processedData && (
          <ChartCard title="7. Cykl Dobowy" library="ECharts" source={sourceType} description="Wzorce zachowań systemu w skali 24h (Mock).">
            <HourlyCycle data={processedData} />
          </ChartCard>
        )}

        <ChartCard title="8. Zmienność Wydajności" library="ApexCharts" source={sourceType} description="Wykres świecowy zmian (min/max).">
          <VolatilityCandle data={processedData} />
        </ChartCard>

        <ChartCard title="9. Profil Zdrowia Projektu" library="Chart.js" source={sourceType} description="Radarowe porównanie wkładu autorów.">
          <StatusRadar data={processedData} />
        </ChartCard>

        {!processedData && (
          <ChartCard title="10. Hierarchia Rozmiaru Modułów" library="ApexCharts" source={sourceType} description="Mapa drzewa pokazująca wagę katalogów (Mock).">
            <ModuleTree data={processedData} />
          </ChartCard>
        )}

        {!processedData && (
          <ChartCard title="11. Kompozycja Technologiczna" library="Chart.js" source={sourceType} description="Proporcje typów plików (Mock).">
            <ResourcePolar data={processedData} />
          </ChartCard>
        )}

        {!processedData && (
          <ChartCard title="12. Analiza Efektywności PR" library="Chart.js" source={sourceType} description="Korelacja zmian i czasu review (Mock).">
            <EfficiencyScatter data={processedData} />
          </ChartCard>
        )}

        {!processedData && (
          <ChartCard title="13. Dzienny Bilans" library="ApexCharts" source={sourceType} description="Zestawienie linii dodanych i usuniętych (Mock).">
            <NetChangeBar data={processedData} />
          </ChartCard>
        )}

        <ChartCard title="14. Zakres Zmienności Metryk" library="ApexCharts" source={sourceType} description="Wykres obszarowy pokazujący przedziały wartości.">
          <RangeTrend data={processedData} />
        </ChartCard>

        <ChartCard title="15. Skokowa Ewolucja Systemu" library="Chart.js" source={sourceType} description="Wykres schodkowy zmian w czasie.">
          <StepEvolution data={processedData} />
        </ChartCard>

      </main>
    </div>
  );
}

export default App;
