import React, { useState, useEffect } from 'react';

const ChartCard = ({ title, library, children, description, source, disabled, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const translations = {
    pl: {
      mock: 'TEST',
      file: 'PLIK',
      url: 'URL',
      unsupported: 'Nieobsługiwany format',
      onlyMock: 'Tylko dane testowe',
      close: 'Zamknij (ESC)',
      lib: 'Biblioteka',
      src: 'Źródło'
    },
    en: {
      mock: 'MOCK',
      file: 'FILE',
      url: 'URL',
      unsupported: 'Unsupported format',
      onlyMock: 'Mock data only',
      close: 'Close (ESC)',
      lib: 'Library',
      src: 'Source'
    }
  };

  const t = translations[lang] || translations.pl;

  const toggleExpansion = () => {
    if (!disabled) setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
  }, [isExpanded]);

  const getSourceLabel = (src) => {
    if (src === 'URL') return t.url;
    if (src === 'PLIK') return t.file;
    return t.mock;
  };

  const getSourceStyle = (src) => {
    switch (src) {
      case 'URL': return { color: '#166534', background: '#dcfce7', border: '1px solid #bbf7d0' };
      case 'PLIK': return { color: '#1e40af', background: '#dbeafe', border: '1px solid #bfdbfe' };
      default: return { color: '#475569', background: '#f1f5f9', border: '1px solid #e2e8f0' };
    }
  };

  const MaximizeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );

  return (
    <>
      <div style={{ 
        background: '#fff', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 25px rgba(0,0,0,0.06)', 
        border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '560px', 
        boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
      }}>
        {disabled && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex',
            alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(2px)', 
          }}>
            <div style={{
              background: '#fff', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', textAlign: 'center'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#1e293b', fontWeight: 'bold' }}>{t.unsupported}</p>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>{t.onlyMock}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!disabled && (
              <button onClick={toggleExpansion} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                <MaximizeIcon />
              </button>
            )}
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem', fontWeight: '700' }}>{title}</h3>
            <span style={{ fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', ...getSourceStyle(source) }}>
              {getSourceLabel(source)}
            </span>
          </div>
          <span style={{ fontSize: '9px', fontWeight: '800', color: '#3b82f6', background: '#eff6ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #dbeafe' }}>{library}</span>
        </div>
        
        <div style={{ flex: '0 0 360px', width: '100%', position: 'relative', paddingBottom: '20px', overflowX: 'auto', overflowY: 'hidden', filter: disabled ? 'grayscale(1) contrast(0.5)' : 'none', opacity: disabled ? 0.3 : 1, height: '360px' }}>
          {children}
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>{description}</p>
        </div>
      </div>

      {isExpanded && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.98)', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '30px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
               <h2 style={{ color: '#fff', margin: 0 }}>{title}</h2>
               <span style={{ color: '#94a3b8', fontSize: '14px' }}>{t.lib}: {library} | {t.src}: {getSourceLabel(source)}</span>
            </div>
            <button onClick={toggleExpansion} style={{ background: '#334155', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t.close}
            </button>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: '20px', padding: '30px', position: 'relative', overflow: 'hidden' }}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ChartCard;
