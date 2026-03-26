import React, { Suspense, lazy } from 'react';
import { violinData } from '../../data/mockData';

const Plot = lazy(() => 
  import('react-plotly.js').then(module => {
    const Component = module.default || module;
    return { default: Component };
  })
);

export const ViolinPlot = () => (
  <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px', minHeight: '450px' }}>
    <h3>2. Violin Plot - Performance Distribution</h3>
    <Suspense fallback={<div style={{ padding: '20px' }}>Inicjalizacja silnika Plotly...</div>}>
      <Plot
        data={[
          { 
            type: 'violin', 
            y: violinData.linux, 
            name: 'Linux', 
            box: { visible: true }, 
            meanline: { visible: true },
            line: { color: '#2ecc71' } 
          },
          { 
            type: 'violin', 
            y: violinData.windows, 
            name: 'Windows', 
            box: { visible: true }, 
            meanline: { visible: true },
            line: { color: '#3498db' } 
          }
        ]}
        layout={{ 
          autosize: true, 
          title: 'CI Stability Analysis',
          margin: { l: 40, r: 40, b: 40, t: 80 }
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "400px" }}
      />
    </Suspense>
    <p style={{ fontSize: '14px', color: '#666' }}>
      <i>Użyteczność: Wykres skrzypcowy pokazuje pełny rozkład statystyczny. Brzuch skrzypiec to najczęstsze wyniki, a cienkie linie to anomalie ( outliers ).</i>
    </p>
  </div>
);
