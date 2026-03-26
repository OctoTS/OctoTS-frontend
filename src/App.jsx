import React from 'react';
import ChartCard from './components/ChartCard';
import { BeeswarmPlot } from './components/Gallery/BeeswarmPlot';
import { CalendarActivity } from './components/Gallery/CalendarActivity';
import { TimeZoomPlot } from './components/Gallery/TimeZoomPlot';
import { StreamGraph } from './components/Gallery/StreamGraph';
import { BumpChart } from './components/Gallery/BumpChart';
import { ProcessTimeline } from './components/Gallery/ProcessTimeline';
import { HourlyCycle } from './components/Gallery/HourlyCycle';

function App() {
  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ maxWidth: '1200px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <h1 style={{ color: '#1e293b', fontSize: '2.5rem' }}>Analityka Projektu w Czasie</h1>
        <p style={{ color: '#64748b' }}>Prezentacja 7 metod wizualizacji danych serii czasowych</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
        
        <ChartCard title="1. Puls Aktywności" library="Nivo" description="Wizualizacja zagęszczenia zdarzeń. Pozwala wykryć anomalie w intensywności pracy i godziny szczytu aktywności deweloperskiej.">
          <BeeswarmPlot />
        </ChartCard>

        <ChartCard title="2. Audyt Ciągłości Procesów" library="Nivo" description="Mapa aktywności rok-do-dnia. Służy do monitorowania stabilności zbierania metryk i błyskawicznego wykrywania przerw w danych.">
          <CalendarActivity />
        </ChartCard>

        <ChartCard title="3. Nawigacja po Historii" library="ECharts" description="Interaktywna linia trendu z suwakiem czasu. Pozwala na płynną analizę danych z okresu wielu miesięcy bez utraty szczegółowości.">
          <TimeZoomPlot />
        </ChartCard>

        <ChartCard title="4. Ewolucja Struktury" library="Nivo" description="Organiczna rzeka trendów. Pokazuje, jak z upływem czasu zmieniały się proporcje między różnymi modułami lub technologiami w projekcie.">
          <StreamGraph />
        </ChartCard>

        <ChartCard title="5. Dynamika Rankingów" library="Nivo" description="Wizualizacja zmian pozycji elementów. Pokazuje, który obszar projektu był najbardziej problematyczny lub aktywny w danym okresie.">
          <BumpChart />
        </ChartCard>

        <ChartCard title="6. Chronologia i Czas Trwania" library="ECharts" description="Wykres procesowy pokazujący sekwencję zdarzeń. Pozwala zidentyfikować wąskie gardła i opóźnienia w cyklu życia projektu.">
          <ProcessTimeline />
        </ChartCard>

        <ChartCard title="7. Cykl Aktywności Dobowej" library="ECharts" description="Analiza 24h/7 dni tygodnia. Umożliwia wykrycie wzorców zachowań systemu lub zespołu powtarzających się o konkretnych porach.">
          <HourlyCycle />
        </ChartCard>

      </main>
    </div>
  );
}

export default App;
