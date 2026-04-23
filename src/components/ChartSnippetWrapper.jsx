import React, { useState, useEffect } from 'react';

export const ChartSnippetWrapper = ({ 
  isDemo, 
  chartType, 
  engine, 
  data, 
  options, 
  children 
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const htmlSnippet = `<div id="chart-container" style="height: 500px; width: 100%;"></div>

<script>
  const data = ${JSON.stringify(data, null, 2)};

  const options = ${JSON.stringify(options, null, 2)};

  const chartEl = window.makeplot('${chartType}', data, options, '${engine}');
  document.getElementById('chart-container').appendChild(chartEl);
</script>`;

  useEffect(() => {
    if (!showCode) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
    }
  }, [showCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      
      {isDemo && (
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          display: 'flex', gap: '8px', alignItems: 'center'
        }}>
          {showCode && (
            <button 
              onClick={handleCopyCode}
              style={{
                background: copied ? '#4caf50' : '#61afef', 
                color: copied ? '#fff' : '#282c34', 
                border: 'none', padding: '6px 12px', borderRadius: '4px', 
                cursor: 'pointer', fontWeight: 'bold', fontSize: '12px',
                transition: 'background 0.3s'
              }}
            >
              {copied ? 'Skopiowano!' : 'Kopiuj kod'}
            </button>
          )}

          <button 
            onClick={() => setShowCode(!showCode)}
            style={{
              background: showCode ? '#e06c75' : '#007bff', 
              color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px',
              fontSize: '12px', cursor: 'pointer', fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
          >
            {showCode ? 'Zamknij kod' : '</> Pokaż kod'}
          </button>
        </div>
      )}

      <div style={{ height: '100%', width: '100%', display: showCode ? 'none' : 'block' }}>
        {children}
      </div>

      {showCode && (
        <div style={{
          height: '100%', width: '100%',
          background: '#282c34', color: '#abb2bf',
          padding: '20px', paddingTop: '50px',
          fontSize: '12px', overflowY: 'auto',
          textAlign: 'left', fontFamily: 'monospace', boxSizing: 'border-box'
        }}>
          <div style={{ color: '#98c379', marginBottom: '16px' }}>
            // Poniższy kod jest gotowy do wklejenia do pliku .html<br />
            // Zawiera dokładne dane i pełną konfigurację z wykresu powyżej.
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {htmlSnippet}
          </pre>
        </div>
      )}
    </div>
  );
};