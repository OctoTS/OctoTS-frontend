import React, { useState } from 'react';

export const ChartSnippetWrapper = ({ 
  isDemo, chartType, engine, data, mapping, lang = 'pl', sourceUrl, children 
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentLang = lang === 'en' ? 'en' : 'pl';
  const snippetEngine = (engine === 'apex' || engine === 'apexcharts') ? 'apexcharts' : engine;
  const activeSource = sourceUrl || "https://example.com/your-data.csv";

  const labels = {
    en: { 
      copy: 'Copy', copied: 'Copied!', close: 'Close', show: '</> Show code', badge: 'MOCK DATA',
      comment: '// I. Initialize Source\n// II. Extract Metadata\n// III. Execute Renderer'
    },
    pl: { 
      copy: 'Kopiuj', copied: 'Skopiowano!', close: 'Zamknij', show: '</> Pokaż kod', badge: 'DANE TESTOWE',
      comment: '// I. Definicja źródła\n// II. Ekstrakcja metadanych\n// III. Renderowanie'
    }
  }[currentLang];

const htmlSnippet = `<div id="chart-container" style="height: 500px; width: 100%;"></div>

<script src="https://cdn.jsdelivr.net/gh/OctoTS/OctoTS-frontend-lib@feat/full-nivo-support/dist/OctoTS-plot-lib.js"></script>

<script>
  async function renderChart() {
    try {
      ${labels.comment}
      const source = "${activeSource}";
      const { data, columns } = await window.loadData(source);
      const mapping = ${JSON.stringify(mapping, null, 2)};

      // SAFE FALLBACK: Check for the new name, then the old one
      const renderer = window.OctoPlotRenderer || window.makeplot;
      
      if (!renderer) {
        throw new Error("OctoTS Library functions not found.");
      }

      const chartEl = renderer('${snippetEngine}', '${chartType}', data, mapping);
      document.getElementById('chart-container').appendChild(chartEl);
      
    } catch (error) {
      console.error("OctoTS Visualization Error:", error);
    }
  }
  renderChart();
</script>`;

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {isDemo && (
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold', color: '#888', zIndex: 5, letterSpacing: '0.5px' }}>
          {labels.badge}
        </div>
      )}

      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', gap: '8px' }}>
        {showCode && (
          <button onClick={() => { navigator.clipboard.writeText(htmlSnippet); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
            style={{ background: copied ? '#4caf50' : '#61afef', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
            {copied ? labels.copied : labels.copy}
          </button>
        )}
        <button onClick={() => setShowCode(!showCode)} 
          style={{ background: showCode ? '#e06c75' : '#007bff', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
          {showCode ? labels.close : labels.show}
        </button>
      </div>

      <div style={{ height: '300px', width: '100%', display: showCode ? 'none' : 'block' }}>
        {children}
      </div>

      {showCode && (
        <div style={{ height: '100%', width: '100%', background: '#282c34', color: '#abb2bf', padding: '20px', paddingTop: '50px', fontSize: '12px', overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', boxSizing: 'border-box' }}>
          <div style={{ color: '#98c379', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>{labels.comment}</div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{htmlSnippet}</pre>
        </div>
      )}
    </div>
  );
};