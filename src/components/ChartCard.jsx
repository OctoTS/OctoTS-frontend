import React from 'react';

const ChartCard = ({ title, library, children, description }) => (
  <div style={{ 
    background: '#fff', 
    padding: '24px', 
    borderRadius: '20px', 
    boxShadow: '0 4px 25px rgba(0,0,0,0.06)', 
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    height: '560px', 
    boxSizing: 'border-box'
  }}>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
      <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.15rem', fontWeight: '700' }}>{title}</h3>
      <span style={{ 
        fontSize: '9px', fontWeight: '800', color: '#3b82f6', background: '#eff6ff', 
        padding: '4px 10px', borderRadius: '6px', border: '1px solid #dbeafe'
      }}>{library}</span>
    </div>
    

    <div style={{ 
      flex: '0 0 360px', 
      width: '100%',
      position: 'relative',
      paddingBottom: '20px' 
    }}>
      {children}
    </div>
    
    {/* Opis */}
    <div style={{ 
      marginTop: 'auto', 
      paddingTop: '15px',
      borderTop: '1px solid #f1f5f9'
    }}>
      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
        {description}
      </p>
    </div>
  </div>
);

export default ChartCard;
