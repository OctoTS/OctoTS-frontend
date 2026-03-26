import React, {useState} from 'react';
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
  const [fileContent, setFileContent] = useState(null)
  const loadFile = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/OctoTS/OctoTS-demo/main/metrics.csv"
      )
      const text = await response.text()
      setFileContent(text)
    } catch (error) {
      console.error("Błąd ładowania pliku:", error)
    }

  }

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ maxWidth: '1200px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <h1 style={{ color: '#1e293b', fontSize: '2.5rem' }}>Wizualizacja Metryk Projektowych w Czasie</h1>
        <p style={{ color: '#64748b' }}>Prezentacja 15 metod wizualizacji danych serii czasowych</p>
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
	
	<ChartCard title="8. Zmienność Wydajności" library="ApexCharts" description="Szczegółowy wgląd we fluktuacje zmian w kodzie. Wykres świecowy pokazuje rozpiętość między minimalną a maksymalną liczbą zmodyfikowanych linii kodu.">
          <VolatilityCandle />
        </ChartCard>

	<ChartCard title="9. Profil Zdrowia Projektu" library="Chart.js" description="Porównanie wielu kluczowych wskaźników KPI (radar) między dwoma okresami. Pozwala ocenić, czy projekt rozwija się w sposób zrównoważony.">
          <StatusRadar />
        </ChartCard>

	<ChartCard title="10. Hierarchia Rozmiaru Modułów" library="ApexCharts" description="Mapa drzewa pokazująca wagę poszczególnych katalogów w projekcie. Pozwala szybko zidentyfikować najbardziej rozbudowane części systemu.">
          <ModuleTree />
        </ChartCard>

        <ChartCard title="11. Kompozycja Technologiczna" library="Chart.js" description="Wykres polarny ilustrujący proporcje między typami plików.">
          <ResourcePolar />
        </ChartCard>

        <ChartCard title="12. Analiza Efektywności PR" library="Chart.js" description="Wykres punktowy badający korelację między wielkością zmiany a czasem recenzji. Pomaga optymalizować proces Code Review.">
          <EfficiencyScatter />
        </ChartCard>

        <ChartCard title="13. Dzienny Bilans Linii Kodu" library="ApexCharts" description="Zestawienie linii dodanych i usuniętych. Pokazuje czy projekt rośnie, czy jest aktywnie czyszczony.">
          <NetChangeBar />
        </ChartCard>

	<ChartCard title="14. Zakres Zmienności Metryk" library="ApexCharts" description="Wykres obszarowy pokazujący przedziały wartości (min/max). Pozwala na ocenę stabilności parametrów w danym oknie czasowym.">
          <RangeTrend />
        </ChartCard>

	<ChartCard title="15. Skokowa Ewolucja Systemu" library="Chart.js" description="Wykres schodkowy idealny do wizualizacji zmian binarnych lub skokowych, takich jak liczba zależności czy wersje oprogramowania.">
          <StepEvolution />
        </ChartCard>

      <center>
         <button
          className="counter"
          onClick={loadFile}
        >
          Load data
        </button>
        <div>
          {fileContent !== null && (
            <>
              <h3>File content:</h3>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#111",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                {fileContent}
              </pre>
            </>
          )}
        </div>
      </center>
      </main>
    </div>
  );
}

export default App;
