import React, { useEffect, useRef } from 'react';

const OctoPlotRenderer = ({ engine, type, data, mapping, options }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Sprawdzamy czy biblioteka window.makeplot jest dostępna
    if (containerRef.current && window.makeplot && data) {
      containerRef.current.innerHTML = '';
      try {
        const plotElement = window.makeplot(engine, type, data, mapping, options);
        if (plotElement) {
          containerRef.current.appendChild(plotElement);
        }
      } catch (e) {
        containerRef.current.innerHTML = '<div style="color:red; padding:20px;">Błąd renderowania wykresu</div>';
      }
    }
  }, [engine, type, data, mapping, options]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '300px' }} />;
};

export default OctoPlotRenderer;
