import React, { useState } from 'react';
import OctoPlotRenderer from './OctoPlotRenderer';

export const ChartSnippetWrapper = ({ 
  isDemo, 
  chartType, 
  engine, 
  data, 
  mapping,
  options, 
  lang = 'pl'
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentLang = lang === 'en' ? 'en' : 'pl';

  const htmlSnippet = `<div id="chart-container" style="height: 500px; width: 100%;"></div>
<script src="https://cdn.jsdelivr.net/gh/OctoTS/OctoTS-frontend-lib@main/dist/OctoTS-plot-lib.js"></script>
<script>
  const data = ${JSON.stringify(data, null, 2)};
  const mapping = ${JSON.stringify(mapping, null, 2)};
  const options = ${JSON.stringify(options, null, 2)};
  const chartEl = window.makeplot('${engine}', '${chartType}', data, mapping, options);
  document.getElementById('chart-container').appendChild(chartEl);
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    copied: currentLang === 'en' ? 'Copied!' : 'Skopiowano!',
    copy: currentLang === 'en' ? 'Copy code' : 'Kopiuj kod',
    close: currentLang === 'en' ? 'Close code' : 'Zamknij kod',
    show: currentLang === 'en' ? '</> Show code' : '</> Pokaż kod'
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {isDemo && (
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10, display: 'flex', gap: '8px' }}>
          {showCode && (
            <button onClick={handleCopyCode} style={{ background: copied ? '#4caf50' : '#61afef', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>
              {copied ? t.copied : t.copy}
            </button>
          )}
          <button onClick={() => setShowCode(!showCode)} style={{ background: showCode ? '#e06c75' : '#f1f5f9', color: showCode ? '#fff' : '#64748b', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>
            {showCode ? t.close : t.show}
          </button>
        </div>
      )}
      <div style={{ height: '100%', width: '100%', display: showCode ? 'none' : 'block' }}>
        <OctoPlotRenderer engine={engine} type={chartType} data={data} mapping={mapping} options={options} />
      </div>
      {showCode && (
        <div style={{ height: '100%', width: '100%', background: '#282c34', color: '#abb2bf', padding: '20px', paddingTop: '50px', fontSize: '11px', overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', boxSizing: 'border-box' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{htmlSnippet}</pre>
        </div>
      )}
    </div>
  );
};
